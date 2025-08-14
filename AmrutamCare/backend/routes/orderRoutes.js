import express from "express";
// import { getOrders, createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Order routes working" });
});

export default router;
