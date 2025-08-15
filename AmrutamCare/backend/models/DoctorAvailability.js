import mongoose from "mongoose";

const DoctorAvailabilitySchema = new mongoose.Schema({
  doctorId: { type: String, required: true, unique: true },
  availableDates: { type: [String], default: [] } // store as YYYY-MM-DD
});

export default mongoose.model("DoctorAvailability", DoctorAvailabilitySchema);
