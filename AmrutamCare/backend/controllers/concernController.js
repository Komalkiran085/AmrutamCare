import Concern from "../models/Concern.js";

// Create Concern
export const createConcern = async (req, res) => {
  try {
    const Concern = await Concern.create(req.body);
    res.status(201).json(Concern);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Concerns
export const getConcerns = async (req, res) => {
  try {
    const Concerns = await Concern.find();
    res.json(Concerns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single Concern by ID
export const getConcernById = async (req, res) => {
  try {
    const Concern = await Concern.findById(req.params.id);
    if (!Concern) return res.status(404).json({ message: "Concern not found" });
    res.json(Concern);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Concern
export const updateConcern = async (req, res) => {
  try {
    const Concern = await Concern.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Concern) return res.status(404).json({ message: "Concern not found" });
    res.json(Concern);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Concern
export const deleteConcern = async (req, res) => {
  try {
    const Concern = await Concern.findByIdAndDelete(req.params.id);
    if (!Concern) return res.status(404).json({ message: "Concern not found" });
    res.json({ message: "Concern deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
