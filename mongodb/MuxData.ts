import mongoose from 'mongoose';

const muxDataSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => new mongoose.Types.ObjectId() },
    assetId: { type: String, required: true },
    playbackId: { type: String, default: null },
    chapterId: { type: String, ref: 'Chapter', unique: true, required: true }, // Unique reference to Chapter
  });
  
  export const MuxData = mongoose.models.MuxData || mongoose.model('MuxData', muxDataSchema);
  