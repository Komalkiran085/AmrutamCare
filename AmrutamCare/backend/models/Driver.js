import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    currentShiftHours: { type: Number, default: 0 }, // hours scheduled today
    // array of numbers representing last 7 days work hours (most recent last)
    pastWeekHours: {
      type: [Number],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 7,
        message: "pastWeekHours can have at most 7 entries",
      },
    },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
