import Admin from "../models/Admin.js";

// Create Admin
export const createAdmin = async (req, res) => {
  try {
    const Admin = await Admin.create(req.body);
    res.status(201).json(Admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Admins
export const getAdmins = async (req, res) => {
  try {
    const Admins = await Admin.find();
    res.json(Admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single Admin by ID
export const getAdminById = async (req, res) => {
  try {
    const Admin = await Admin.findById(req.params.id);
    if (!Admin) return res.status(404).json({ message: "Admin not found" });
    res.json(Admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const Admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Admin) return res.status(404).json({ message: "Admin not found" });
    res.json(Admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    const Admin = await Admin.findByIdAndDelete(req.params.id);
    if (!Admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
