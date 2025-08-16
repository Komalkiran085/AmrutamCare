import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  username: { type: String, required: true }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
