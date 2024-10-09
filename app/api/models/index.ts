import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Date, default: null },
  image: { type: String },
  hashedPassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
});

const AccountSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  session_state: { type: String },
});

const SessionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  sessionToken: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  expires: { type: Date, required: true },
});

const VerificationTokenSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  isPublished: { type: Boolean, default: false },
  categoryId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const AttachmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  courseId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ChapterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String },
  position: { type: Number, required: true },
  isPublished: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  courseId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MuxDataSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  assetId: { type: String, required: true },
  playbackId: { type: String },
  chapterId: { type: String, required: true },
});

const UserProgressSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  chapterId: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PurchaseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const StripeCustomerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  stripeCustomerId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', UserSchema);
export const Account = mongoose.model('Account', AccountSchema);
export const Session = mongoose.model('Session', SessionSchema);
export const VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);
export const Course = mongoose.model('Course', CourseSchema);
export const Category = mongoose.model('Category', CategorySchema);
export const Attachment = mongoose.model('Attachment', AttachmentSchema);
export const Chapter = mongoose.model('Chapter', ChapterSchema);
export const MuxData = mongoose.model('MuxData', MuxDataSchema);
export const UserProgress = mongoose.model('UserProgress', UserProgressSchema);
export const Purchase = mongoose.model('Purchase', PurchaseSchema);
export const StripeCustomer = mongoose.model('StripeCustomer', StripeCustomerSchema);