import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true
    },
    doctorId: {
      type: String,
      required: true
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true
    },
    hour: {
      type: Number, // 0..23
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
