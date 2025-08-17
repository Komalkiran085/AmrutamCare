
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#fff7e2" }} className="flex flex-col items-center pt-10 min-h-screen text-white">
      <h1 className="text-3xl text-green-900 md:text-4xl mb-10">AmrutamCare</h1>
      <div style={{ backgroundColor: "#eeab42" }} className="flex flex-col gap-10 rounded-sm mt-10 p-20">
        <button
          style={{ backgroundColor: "#3a643b" }}
          onClick={() => navigate("/doctor/login")}
          className="px-6 py-3 rounded-sm text-lg shadow-md hover:bg-gray-100 transform hover:scale-105 transition"
        >
          Doctor Login
        </button>
        <button
          style={{ backgroundColor: "#3a643b" }}
          onClick={() => navigate("/patient/login")}
          className=" px-6 py-3 rounded-sm text-lg shadow-md hover:bg-gray-100 transform hover:scale-105 transition"
        >
          Patient Login
        </button>
        <button
          style={{ backgroundColor: "#3a643b" }}
          onClick={() => navigate("/admin/login")}
          className=" px-6 py-3 rounded-sm text-lg shadow-md hover:bg-gray-100 transform hover:scale-105 transition"
        >
          Admin Login
        </button>

      </div>
    </div>
  );
};

export default LandingPage;
