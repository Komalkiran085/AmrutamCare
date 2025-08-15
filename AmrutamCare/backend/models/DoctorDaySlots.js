// models/DoctorDaySlots.js
import mongoose from "mongoose";

const DoctorDaySlotsSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    // Store as YYYY-MM-DD (UTC) to avoid TZ ambiguity
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/, // basic guard
      index: true,
    },
    // Array of integers 0–23 representing hours
    slots: {
      type: [Number],
      default: [],
      validate: {
        validator: (arr) => arr.every((h) => Number.isInteger(h) && h >= 0 && h <= 23),
        message: "Each slot must be an integer between 0 and 23.",
      },
    },
  },
  { timestamps: true }
);

// Ensure uniqueness per doctor per day
DoctorDaySlotsSchema.index({ doctorId: 1, date: 1 }, { unique: true });

const DoctorDaySlots = mongoose.model("DoctorDaySlots", DoctorDaySlotsSchema);
export default DoctorDaySlots;
