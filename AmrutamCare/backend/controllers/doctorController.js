import Doctor from "../models/Doctor.js";

// Create Doctor
export const createDoctor = async (req, res) => {
  try {
    const Doctor = await Doctor.create(req.body);
    res.status(201).json(Doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Doctors
export const getDoctors = async (req, res) => {
  try {
    const Doctors = await Doctor.find();
    res.json(Doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single Doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const Doctor = await Doctor.findById(req.params.id);
    if (!Doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(Doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Doctor
export const updateDoctor = async (req, res) => {
  try {
    const Doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(Doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const Doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!Doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
