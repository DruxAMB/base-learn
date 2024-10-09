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
 
},  { timestamps: true });

// Define and export the StripeCustomer model with the interface
export const StripeCustomer: Model<IStripeCustomer> = models.StripeCustomer || model<IStripeCustomer>('StripeCustomer', stripeCustomerSchema);
