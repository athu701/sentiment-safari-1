import mongoose from 'mongoose';
const scoreSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 32 },
  points: { type: Number, required: true, min: 0 },
  game: { type: String, enum: ['word-sort','emoji-toss','quiz','chapter-quiz'], required: true }
}, { timestamps: true });
export const Score = mongoose.model('Score', scoreSchema);
