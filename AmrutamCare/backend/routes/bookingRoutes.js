import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/**
 * Book a slot
 * POST /api/bookings
 * body: { patientId, doctorId, date, hour }
 */
router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, date, hour } = req.body;
    if (!patientId || !doctorId || !date || hour === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if already booked
    const existing = await Booking.findOne({ doctorId, date, hour });
    if (existing) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const booking = await Booking.create({ patientId, doctorId, date, hour });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * Get all bookings for a patient
 * GET /api/bookings/:patientId
 */
router.get("/:patientId", async (req, res) => {
  try {
    const bookings = await Booking.find({ patientId: req.params.patientId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
