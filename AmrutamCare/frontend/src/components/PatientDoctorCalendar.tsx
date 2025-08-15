// src/pages/PatientDoctorCalendar.tsx
import DoctorCalendar from "./DoctorCalender";
import { useParams } from "react-router-dom";

const PatientDoctorCalendar = () => {
  const { doctorId } = useParams();
  const idFromStorage = localStorage.getItem("selectedDoctorId");
  const resolvedId = doctorId || idFromStorage || "";

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Doctor's Available Dates</h1>
      {resolvedId ? (
        <DoctorCalendar doctorId={resolvedId} />
      ) : (
        <p className="text-red-500">No doctor selected</p>
      )}
    </div>
  );
};

export default PatientDoctorCalendar;
