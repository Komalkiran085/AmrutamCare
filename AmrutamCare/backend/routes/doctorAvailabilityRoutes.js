import express from "express";
import DoctorAvailability from "../models/DoctorAvailability.js";

const router = express.Router();

// Save or update doctor's available dates
router.post("/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  const { availableDates } = req.body;

  if (!Array.isArray(availableDates)) {
    return res.status(400).json({ message: "availableDates must be an array" });
  }

  try {
    const updated = await DoctorAvailability.findOneAndUpdate(
      { doctorId },
      { availableDates },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Get doctor's available dates
router.get("/:doctorId", async (req, res) => {
  try {
    const data = await DoctorAvailability.findOne({ doctorId: req.params.doctorId });
    res.json(data || { doctorId: req.params.doctorId, availableDates: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
