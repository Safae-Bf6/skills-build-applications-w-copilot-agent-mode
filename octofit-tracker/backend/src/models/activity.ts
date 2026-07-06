import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Activity = model('Activity', activitySchema);
