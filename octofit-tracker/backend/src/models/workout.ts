import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: Number,
  focus: String,
  description: String,
}, { timestamps: true });

export const Workout = model('Workout', workoutSchema);
