import mongoose from "mongoose";

const DoctorConcernMapSchema = new mongoose.Schema({
  concernId: {
    type: Number,
    required: true
  },
  concern: {
    type: String,
    required: true
  },
  doctors: [
    {
      doctorId: { type: String, required: true },
      username: { type: String, required: true }
    }
  ]
});

export default mongoose.model("DoctorConcernMap", DoctorConcernMapSchema);
