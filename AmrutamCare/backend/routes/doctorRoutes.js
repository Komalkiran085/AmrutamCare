// routes/doctorRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';
import { protectDoctor } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

import DoctorConcernMap from '../models/DoctorConcernMap.js';
import Concern from '../models/Concern.js';

const router = express.Router();

// Create new doctor (Admin only)
// Create new doctor (Admin only)
// Create new doctor (Admin only)
router.post("/", protectAdmin, async (req, res) => {
  try {
    const { doctorId, username } = req.body;

    if (!doctorId || !username) {
      return res.status(400).json({ message: "Doctor ID and username are required" });
    }

    // check if doctor already exists
    const existing = await Doctor.findOne({ doctorId });
    if (existing) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // create doctor
    const newDoctor = await Doctor.create({ doctorId, username });

    // ✅ Get all concerns sorted
    const concerns = await Concern.find({}).sort({ concernId: 1 });
    if (concerns.length === 0) {
      return res.status(400).json({ message: "No concerns available" });
    }

    // ✅ Count how many doctors are already mapped across all concerns
    const allMaps = await DoctorConcernMap.find({});
    const totalDoctorsMapped = allMaps.reduce((sum, map) => sum + map.doctors.length, 0);

    // ✅ Round-robin assignment (2 per concern)
    const nextConcernIndex = Math.floor(totalDoctorsMapped / 2) % concerns.length;
    const concernToAssign = concerns[nextConcernIndex];

    // ✅ Update mapping
    let concernMap = await DoctorConcernMap.findOne({ concernId: concernToAssign.concernId });
    if (concernMap) {
      concernMap.doctors.push(newDoctor);
      await concernMap.save();
    } else {
      await DoctorConcernMap.create({
        concernId: concernToAssign.concernId,
        concern: concernToAssign.concern,
        doctors: [newDoctor],
      });
    }

    res.status(201).json({
      message: "Doctor created and mapped successfully",
      doctor: newDoctor,
      mappedConcern: concernToAssign.concern,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// Doctor login
router.post('/login', async (req, res) => {
  try {
    const { doctorId, username } = req.body;

    if (!doctorId || !username) {
      return res.status(400).json({ message: 'Doctor ID and username are required' });
    }

    const doctor = await Doctor.findOne({ doctorId, username });
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: doctor._id, role: 'doctor' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, doctorId: doctor.doctorId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/doctors/me (Protected)
router.get('/me', protectDoctor, async (req, res) => {
  res.json(req.doctor);
});

export default router;
