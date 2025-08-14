import mongoose from "mongoose";

const simulationResultSchema = new mongoose.Schema(
  {
    inputs: {
      availableDrivers: { type: Number, required: true },
      routeStartTime: { type: String, required: true }, // "HH:MM"
      maxHoursPerDriver: { type: Number, required: true },
    },
    // KPIs we will compute
    kpis: {
      totalProfitRs: { type: Number, default: 0 },
      efficiencyPercent: { type: Number, default: 0 },
      totalOrders: { type: Number, default: 0 },
      onTimeDeliveries: { type: Number, default: 0 },
      lateDeliveries: { type: Number, default: 0 },
      totalFuelCostRs: { type: Number, default: 0 },
    },
    // brief summary of order-level results (small objects)
    ordersSummary: [
      {
        orderId: String,
        assignedDriver: String,
        onTime: Boolean,
        penaltyRs: Number,
        bonusRs: Number,
        fuelCostRs: Number,
        profitRs: Number,
      },
    ],
    runBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const SimulationResult = mongoose.model("SimulationResult", simulationResultSchema);
export default SimulationResult;
