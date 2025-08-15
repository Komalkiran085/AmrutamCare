import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import DoctorCalendar from "../components/DoctorCalender";

const Dashboard = () => {
  const { role, id } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/${role}s/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
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

  return (
    <div style={{ backgroundColor: "#3a643b" }} className="min-h-screen p-6">
      <div style={{ backgroundColor: "#fff7e2" }} className="shadow rounded-lg p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">
            Welcome, {role === "doctor" ? "Dr." : ""} {username}
          </h1>
          <div className="flex flex-col items-end text-sm text-gray-700">
            <span className="text-lg font-semibold" style={{ color: "#3a643b" }}>
              {role === "doctor" ? `Doctor ID: ${id}` : `Patient ID: ${id}`}
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
          {role === "doctor"&& id ? (
            <DoctorCalendar doctorId={id} /> // <-- doctor sees calendar here
          ) : (
            <>
             
              <Outlet />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
