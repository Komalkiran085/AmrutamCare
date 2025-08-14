// src/components/DoctorsList.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Doctor {
  doctorId: string;
  username: string;
}

const DoctorsList = () => {
  const { concernId } = useParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/mappings/${concernId}/doctors`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return res.json();
      })
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [concernId]);

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Doctors for Concern {concernId}
      </h2>
      <ul className="space-y-3">
        {doctors.map(doc => (
          <li
            key={doc.doctorId}
            className="p-4 bg-white shadow rounded"
          >
            <strong>{doc.username}</strong> (ID: {doc.doctorId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
