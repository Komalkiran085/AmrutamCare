import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    concernId: { type: Number, required: true },
  },
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
