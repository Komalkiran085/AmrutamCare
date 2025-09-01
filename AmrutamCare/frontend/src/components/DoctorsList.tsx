import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Doctor {
  doctorId: string;
  username: string;
}

const DoctorsList = () => {
  const { concernId, id: patientId, role } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/mappings/${concernId}/doctors`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return res.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [concernId]);

  const handleDoctorSelect = (doctorId: string) => {

    localStorage.setItem("selectedDoctorId", doctorId);
    navigate(`/${role}/dashboard/${patientId}/doctor/${doctorId}/calendar`);
  };

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Please choose your Doctor
      </h2>
      <ul className="space-y-3">
        {doctors.map((doc) => (
          <li key={doc.doctorId}>
            <button
              onClick={() => handleDoctorSelect(doc.doctorId)}
              style={{ backgroundColor: "#eeab42" }}
              className="w-full px-6 py-3 text-white rounded-lg text-center text-lg font-medium hover:bg-green-700 transition"
            >
              <strong>{doc.username}</strong> (ID: {doc.doctorId})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
