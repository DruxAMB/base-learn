import { Schema, model, models, Document, Model } from 'mongoose';

// Define the interface for the StripeCustomer document
export interface IStripeCustomer extends Document {
  userId: string;
  stripeCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema with TypeScript support
const stripeCustomerSchema = new Schema<IStripeCustomer>({
  userId: { type: String, required: true, unique: true },
  stripeCustomerId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define and export the StripeCustomer model with the interface
export const StripeCustomer: Model<IStripeCustomer> = models.StripeCustomer || model<IStripeCustomer>('StripeCustomer', stripeCustomerSchema);
