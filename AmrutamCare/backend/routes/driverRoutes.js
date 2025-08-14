import express from "express";
import {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driverController.js";

const router = express.Router();

router.post("/", createDriver);
router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);


// POST - Create a new driver
router.post("/", async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET - Fetch all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
