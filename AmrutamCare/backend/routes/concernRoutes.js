import express from "express";
import {
  createConcern,
  getConcerns,
  getConcernById,
  updateConcern,
  deleteConcern,
} from "../controllers/concernController.js";

const router = express.Router();

router.post("/", createConcern);
router.get("/", getConcerns);
router.get("/:id", getConcernById);
router.put("/:id", updateConcern);
router.delete("/:id", deleteConcern);


// POST - Create a new concern
router.post("/", async (req, res) => {
  try {
    const concern = new Concern(req.body);
    await concern.save();
    res.status(201).json(concern);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET - Fetch all concerns
router.get("/", async (req, res) => {
  try {
    const concerns = await Concern.find();
    res.json(concerns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
