import Patient from "../models/Patient.js";

// Create patient
export const createPatient = async (req, res) => {
  try {
    const Patient = await Patient.create(req.body);
    res.status(201).json(Patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const Patients = await Patient.find();
    res.json(Patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const Patient = await Patient.findById(req.params.id);
    if (!Patient) return res.status(404).json({ message: "Patient not found" });
    res.json(Patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const Patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Patient) return res.status(404).json({ message: "Patient not found" });
    res.json(Patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete patient
export const deletePatient = async (req, res) => {
  try {
    const Patient = await Patient.findByIdAndDelete(req.params.id);
    if (!Patient) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
