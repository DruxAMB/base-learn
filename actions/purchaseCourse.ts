import { Purchase, IPurchase } from '../mongodb/Purchase';
import { Course, ICourse } from '../mongodb/Course';
import { Types } from 'mongoose';

export async function purchaseCourse(courseId: string, userId: string): Promise<IPurchase> {
  try {
    // Create a new purchase
    const purchase = await Purchase.create({
      userId,
      courseId: new Types.ObjectId(courseId),
    });

    // Update the course with the new purchase ID
    await Course.findByIdAndUpdate(courseId, {
      $push: { purchases: purchase._id },
    });

    return purchase;
  } catch (error) {
    // Check if the error is due to a duplicate purchase
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      throw new Error('User has already purchased this course');
    }
    // Re-throw other errors
    throw error;
  }
}
