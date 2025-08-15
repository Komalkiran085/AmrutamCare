import express from "express";
import DoctorDaySlots from "../models/DoctorDaySlots.js";
import DoctorAvailability from "../models/DoctorAvailability.js";

const router = express.Router();

/**
 * Normalize a date string or Date to YYYY-MM-DD (UTC)
 */
function toYMD(input) {
  const d = input instanceof Date ? input : new Date(input);
  if (isNaN(d.getTime())) return null;
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * SET/REPLACE slots for a date (idempotent)
 * POST /api/day-slots/:doctorId/:date
 * body: { slots: number[] }  // 0..23
 */
router.post("/:doctorId/:date", async (req, res) => {
  const { doctorId, date } = req.params;
  let { slots } = req.body;

  const ymd = toYMD(date);
  if (!ymd) return res.status(400).json({ message: "Invalid date format" });

  if (!Array.isArray(slots)) slots = [];
  const clean = Array.from(new Set(slots.map((n) => parseInt(n, 10))))
    .filter((n) => Number.isInteger(n) && n >= 0 && n <= 23)
    .sort((a, b) => a - b);

  try {
    // Save slots
    const doc = await DoctorDaySlots.findOneAndUpdate(
      { doctorId, date: ymd },
      { $set: { slots: clean } },
      { new: true, upsert: true }
    );

    // If all 24 slots booked, add this date to DoctorAvailability
    if (clean.length === 24) {
      await DoctorAvailability.findOneAndUpdate(
        { doctorId },
        { $addToSet: { availableDates: ymd } }, // automatically add without duplicates
        { new: true, upsert: true }
      );
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

/**
 * GET slots for a specific date
 * GET /api/day-slots/:doctorId/:date
 */
router.get("/:doctorId/:date", async (req, res) => {
  const { doctorId, date } = req.params;
  const ymd = toYMD(date);
  if (!ymd) return res.status(400).json({ message: "Invalid date format" });

  try {
    const doc = await DoctorDaySlots.findOne({ doctorId, date: ymd });
    res.json(doc || { doctorId, date: ymd, slots: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

/**
 * LIST slots for a doctor in a date range (inclusive)
 * GET /api/day-slots/:doctorId?from=YYYY-MM-DD&to=YYYY-MM-DD
 */
router.get("/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  const { from, to } = req.query;

  let filter = { doctorId };
  if (from || to) {
    const f = from ? toYMD(from) : null;
    const t = to ? toYMD(to) : null;
    if ((from && !f) || (to && !t)) {
      return res.status(400).json({ message: "Invalid from/to date format" });
    }
    filter.date = {};
    if (f) filter.date.$gte = f;
    if (t) filter.date.$lte = t;
  }

  try {
    const docs = await DoctorDaySlots.find(filter).sort({ date: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

/**
 * CLEAR slots for a date
 * DELETE /api/day-slots/:doctorId/:date
 */
router.delete("/:doctorId/:date", async (req, res) => {
  const { doctorId, date } = req.params;
  const ymd = toYMD(date);
  if (!ymd) return res.status(400).json({ message: "Invalid date format" });

  try {
    const doc = await DoctorDaySlots.findOneAndUpdate(
      { doctorId, date: ymd },
      { $set: { slots: [] } },
      { new: true }
    );

    // Optional: remove date from availability if cleared
    await DoctorAvailability.findOneAndUpdate(
      { doctorId },
      { $pull: { availableDates: ymd } }
    );

    res.json(doc || { doctorId, date: ymd, slots: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
