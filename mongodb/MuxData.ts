import { Schema, model, models, Document, Model, Types } from 'mongoose';

// Define the interface for the MuxData document
export interface IMuxData extends Document {
  assetId: string;
  playbackId?: string | null;
  chapterId: Types.ObjectId; // Reference to Chapter as ObjectId
}

// Define the Mongoose schema with TypeScript support
const muxDataSchema = new Schema<IMuxData>({
  assetId: { type: String, required: true },
  playbackId: { type: String, default: null },
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', unique: true, required: true }, // Unique reference to Chapter
});

// Define and export the MuxData model with the interface
export const MuxData: Model<IMuxData> = models.MuxData || model<IMuxData>('MuxData', muxDataSchema);
