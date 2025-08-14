import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";

import Driver from "./models/Driver.js";
import Doctor from "./models/Doctor.js";
import Concern from "./models/Concern.js";
import Patient from "./models/Patient.js";
import Order from "./models/Order.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Driver.deleteMany();
    await Order.deleteMany();

    // Seed drivers
    const drivers = [];
    await new Promise((resolve) => {
      fs.createReadStream("./data/drivers.csv")
        .pipe(csv())
        .on("data", (row) => {
          drivers.push({
            name: row.name,
            currentShiftHours: Number(row.shift_hours),
            pastWeekHours: row.past_week_hours.split("|").map(Number)
          });
        })
        .on("end", async () => {
          await Driver.insertMany(drivers);
          console.log(`✅ Imported ${drivers.length} drivers`);
          resolve();
        });
    });


    // Seed patients
    const patients = [];
    await new Promise((resolve) => {
      fs.createReadStream("./data/patients.csv")
        .pipe(csv())
        .on("data", (row) => {
          patients.push({
            patientId: row.patientId,
            username: row.username,
          });
        })
        .on("end", async () => {
          await Patient.deleteMany({});
          await Patient.insertMany(patients);
          console.log(`✅ Imported ${patients.length} patients`);
          resolve();
        });
    });

    // Seed concerns
    const concerns = [];
    await new Promise((resolve) => {
      fs.createReadStream("./data/concerns.csv")
        .pipe(csv())
        .on("data", (row) => {
          concerns.push({
            concernId: Number(row.concernId),
            concern: row.concern,
          });
        })
        .on("end", async () => {
          await Concern.deleteMany({});
          await Concern.insertMany(concerns);
          console.log(`✅ Imported ${concerns.length} doctors`);
          resolve();
        });
    });


    // Seed doctors
    const doctors = [];
    await new Promise((resolve) => {
      fs.createReadStream("./data/doctors.csv")
        .pipe(csv())
        .on("data", (row) => {
          doctors.push({
            doctorId: row.doctorId,
            username: row.username,
          });
        })
        .on("end", async () => {
          await Doctor.deleteMany({});
          await Doctor.insertMany(doctors);
          console.log(`✅ Imported ${doctors.length} doctors`);
          resolve();
        });
    });


    // Seed orders
    const orders = [];
    await new Promise((resolve) => {
      fs.createReadStream("./data/orders.csv")
        .pipe(csv())
        .on("data", (row) => {
          orders.push({
            orderId: Number(row.order_id),
            valueRs: Number(row.value_rs),
            routeId: Number(row.route_id),
            deliveryTime: row.delivery_time
          });
        })
        .on("end", async () => {
          await Order.insertMany(orders);
          console.log(`✅ Imported ${orders.length} orders`);
          resolve();
        });
    });

    console.log("🎯 All data imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data", error);
    process.exit(1);
  }
};

importData();
