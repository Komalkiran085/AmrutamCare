import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: Number, required: true, unique: true },
    valueRs: { type: Number, required: true },
    routeId: { type: Number, required: true },
    deliveryTime: { type: String, required: true } // HH:MM format
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
