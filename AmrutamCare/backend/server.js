import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import driverRoutes from "./routes/driverRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import concernRoutes from "./routes/concernRoutes.js";
import doctorConcernMapRoutes from "./routes/doctorConcernMapRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorAvailabilityRoutes from "./routes/doctorAvailabilityRoutes.js";
import doctorDaySlotsRoutes from "./routes/doctorDaySlotsRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import simulationRoutes from "./routes/simulationRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/drivers", driverRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/concerns", concernRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/simulations", simulationRoutes);
app.use("/api/mappings", doctorConcernMapRoutes);
app.use("/api/availability", doctorAvailabilityRoutes);
app.use("/api/day-slots", doctorDaySlotsRoutes);


// ...
app.use("/api/bookings", bookingRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 FleetIQ Komal API is running");
});

app.listen(PORT, () => console.log(`✅ FleetIQ backend running on port ${PORT}`));
