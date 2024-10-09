import mongoose from 'mongoose';

const stripeCustomerSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => new mongoose.Types.ObjectId() },
    userId: { type: String, required: true, unique: true },
    stripeCustomerId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const StripeCustomer = mongoose.models.StripeCustomer || mongoose.model('StripeCustomer', stripeCustomerSchema);
  