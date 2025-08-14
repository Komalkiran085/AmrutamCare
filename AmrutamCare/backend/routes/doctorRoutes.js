// routes/doctorRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';
import { protectDoctor } from '../middleware/authMiddleware.js';

const router = express.Router();

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

    // Generate JWT
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
