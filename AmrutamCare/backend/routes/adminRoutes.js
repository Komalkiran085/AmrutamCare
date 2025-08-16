// routes/adminRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { adminId, username } = req.body;

    if (!adminId || !username) {
      return res.status(400).json({ message: 'Admin ID and username are required' });
    }

    const admin = await Admin.findOne({ adminId, username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, adminId: admin.adminId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admins/me (Protected)
router.get('/me', protectAdmin, async (req, res) => {
  res.json(req.admin);
});

export default router;
