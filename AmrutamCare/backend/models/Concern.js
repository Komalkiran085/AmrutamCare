import mongoose from "mongoose";

const concernSchema = new mongoose.Schema(
  {
    concernId: { type: Number, required: true, unique: true },
    concern: { type: String, required: true }
  },
);

const Concern = mongoose.model("Concern", concernSchema);
export default Concern;
