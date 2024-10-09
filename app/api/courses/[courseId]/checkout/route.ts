import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { Course } from "@/mongodb/Course"; // Mongoose Course model
import { Purchase } from "@/mongodb/Purchase"; // Mongoose Purchase model
import { StripeCustomer } from "@/mongodb/StripeCustomer"; // Mongoose StripeCustomer model
import { stripe } from "@/lib/stripe"; // Stripe integration

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the course by its ID and check if it's published
    const course = await Course.findOne({
      _id: params.courseId,
      isPublished: true,
    }).lean(); // Use lean for better performance

    // Check if the user has already purchased the course
    const purchase = await Purchase.findOne({
      userId: user.id,
      courseId: params.courseId,
    }).lean();

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description || "",
          },
          unit_amount: Math.round(course.price * 100), // Convert price to cents
        },
      },
    ];

    // Check if the user already has a Stripe customer account
    let stripeCustomer = await StripeCustomer.findOne({
      userId: user.id,
    }).lean();

    if (!stripeCustomer) {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      // Save the Stripe customer ID to your database
      stripeCustomer = await StripeCustomer.create({
        userId: user.id,
        stripeCustomerId: customer.id,
      });
    }

    // Create a new Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}?canceled=1`,
      metadata: {
        courseId: course._id.toString(),
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
