// routes/mappingRoutes.js
import express from 'express';
import Doctor from '../models/Doctor.js';
import Concern from '../models/Concern.js';
import DoctorConcernMap from '../models/DoctorConcernMap.js';

const router = express.Router();

// Create mapping
router.post('/map-doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    const concerns = await Concern.find({});
    let doctorIndex = 0;
    const mapping = [];

    concerns.forEach(concern => {
      const assignedDoctors = doctors.slice(doctorIndex, doctorIndex + 2);
      mapping.push({
        concernId: concern.concernId,
        concern: concern.concern,
        doctors: assignedDoctors
      });
      doctorIndex += 2;
    });

    await DoctorConcernMap.deleteMany({});
    await DoctorConcernMap.insertMany(mapping);

    res.json({ message: 'Mapping created successfully', mapping });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get doctors for a concern
router.get('/:concernId/doctors', async (req, res) => {
  try {
    const data = await DoctorConcernMap.findOne({ concernId: parseInt(req.params.concernId) });
    if (!data) return res.status(404).json({ error: 'No mapping found' });
    res.json(data.doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
