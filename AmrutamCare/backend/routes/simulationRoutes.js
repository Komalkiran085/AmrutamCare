import express from "express";
// import { runSimulation } from "../controllers/simulationController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Simulation routes working" });
});

export default router;
