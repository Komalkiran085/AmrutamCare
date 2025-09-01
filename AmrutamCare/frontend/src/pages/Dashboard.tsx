import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import DoctorCalendar from "../components/DoctorCalender";
import AddDoctor from "../components/AddDoctor";

const Dashboard = () => {
  const { role, id } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!role) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/${role}s/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate(`/${role}/login`);
      });
  }, [role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate(`/${role}/login`);
  };

  const getIdLabel = () => {
    if (role === "doctor") return `Doctor ID: ${id}`;
    if (role === "patient") return `Patient ID: ${id}`;
    if (role === "admin") return `Admin ID: ${id}`;
    return `ID: ${id}`;
  };

  return (
    <div style={{ backgroundColor: "#3a643b" }} className="grid grid-cols-25 h-full min-h-screen p-6">
      <div
        style={{ backgroundColor: "#fff7e2" }}
        className="shadow col-start-2 col-end-24 rounded-lg p-4"
      >
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">
            Hi {role === "doctor" ? "Dr." : ""} {username}
          </h1>
          <div className="flex flex-col items-end text-sm text-gray-700">
            <span
              className="text-lg font-semibold"
              style={{ color: "#3a643b" }}
            >
              {getIdLabel()}
            </span>
            <button
              style={{ backgroundColor: "#3a643b" }}
              onClick={handleLogout}
              className="mt-2 px-3 py-1 text-white text-lg rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex justify-center items-center min-h-[60vh]">
          {role === "doctor" && id ? (
            <DoctorCalendar doctorId={id} /> // doctor-specific view
          ) : role === "admin" ? (
            <div className="text-center w-full">
              <h2 className="text-2xl font-bold mb-4 text-green-800">
                Admin Dashboard
              </h2>
              {/* AddDoctor is inside the admin dashboard */}
              <AddDoctor />
            </div>
          ) : (
            <Outlet /> // patients use nested routes
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
