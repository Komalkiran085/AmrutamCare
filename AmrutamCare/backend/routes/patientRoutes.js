// routes/patientRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import Patient from '../models/Patient.js';
import { protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();

// Patient login
router.post('/login', async (req, res) => {
  try {
    const { patientId, username } = req.body;

    if (!patientId || !username) {
      return res.status(400).json({ message: 'patient ID and username are required' });
    }

    const patient = await Patient.findOne({ patientId, username });
    if (!patient) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: patient._id, role: 'patient' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, patientId: patient.patientId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/patients/me (Protected)
router.get('/me', protectPatient, async (req, res) => {
  res.json(req.patient);
});

export default router;
