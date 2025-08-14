import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    username: { type: String, required: true }
  },
);

const Patient = mongoose.model("patient", patientSchema);
export default Patient;
