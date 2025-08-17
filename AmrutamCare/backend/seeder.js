import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";

import Doctor from "./models/Doctor.js";
import Concern from "./models/Concern.js";
import Patient from "./models/Patient.js";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    // Clear existing data
  
    await Admin.deleteMany();


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
            concernId: Number(row.concernId),
          });
        })
        .on("end", async () => {
          await Doctor.deleteMany({});
          await Doctor.insertMany(doctors);
          console.log(`✅ Imported ${doctors.length} doctors`);
          resolve();
        });
    });
    // Seed admin
    const admin = [];
    await new Promise((resolve) => {
      fs.createReadStream("./data/admin.csv")
        .pipe(csv())
        .on("data", (row) => {
          admin.push({
            adminId: row.adminId,
            username: row.username,
          });
        })
        .on("end", async () => {
          await Admin.deleteMany({});
          await Admin.insertMany(admin);
          console.log(`✅ Imported ${admin.length} admin`);
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
