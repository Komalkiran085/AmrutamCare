# 🌿 AmrutamCare – Ayurvedic Consultation Platform

This is the **Full Stack Modular MVP** project.  
The goal is to build a platform for an Ayurvedic doctor consultation platform, covering flows like doctor discovery, slot booking, and appointment management.  

---

## 📌 Features Implemented

- **Landing Page** with login options for Doctors, Patients, and Admins.
- **Role-based Login** (Doctor, Patient, Admin) using JWT authentication.
- **Doctor Dashboard**:
  - Calendar-based availability management.
  - Add/Clear available dates and time slots.
- **Patient Dashboard**:
  - View doctors by concern/specialization.
  - Book time slots with confirmation step.
- **Admin Dashboard**:
  - Add/manage doctors.
  - Oversee system operations.
- **Protected Routes** with token-based access.
- **React Router v6** with nested routes for role dashboards.

---

## 🛠️ Tech Stack

### Frontend
- **React + TypeScript**
- **React Router DOM** (role-based routing)
- **TailwindCSS** (UI styling)
- **React Calendar** (calendar component)

### Backend
- **Node.js + Express**
- **MongoDB (Mongoose)** for persistence
- **JWT Authentication**

### Screenshots

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Komalkiran085/AmrutamCare.git
cd AmrutamCare
