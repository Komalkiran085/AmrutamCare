import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface DoctorCalendarProps {
  doctorId: string;
}

const DoctorCalendar = ({ doctorId }: DoctorCalendarProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const API_BASE = "http://localhost:5000/api/availability";
  
  // Convert date to YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // Fetch existing availability from backend
  useEffect(() => {
    fetch(`${API_BASE}/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.availableDates) {
          setSelectedDates(data.availableDates.map((d: string) => new Date(d)));
        }
      })
      .catch((err) => console.error("Error fetching availability:", err));
  }, [doctorId]);

  // Handle selecting/unselecting a date
  const handleClickDay = (value: Date) => {
    const isSelected = selectedDates.some(
      (date) => date.toDateString() === value.toDateString()
    );
    if (isSelected) {
      setSelectedDates(
        selectedDates.filter(
          (date) => date.toDateString() !== value.toDateString()
        )
      );
    } else {
      setSelectedDates([...selectedDates, value]);
    }
  };

  // Save availability to backend
  const saveAvailability = () => {
    const dates = selectedDates.map(formatDate);
    fetch(`${API_BASE}/${doctorId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availableDates: dates }),
    })
      .then((res) => res.json())
      .then(() => alert("✅ Availability updated!"))
      .catch((err) => console.error("Error saving availability:", err));
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <Calendar
        onClickDay={handleClickDay}
        tileClassName={({ date }) =>
          selectedDates.some(
            (d) => d.toDateString() === date.toDateString()
          )
            ? "bg-green-700 text-white rounded-lg"
            : "hover:bg-green-100 rounded-lg"
        }
        className="bg-white shadow-xl rounded-xl p-4 border border-gray-200"
      />

      <button
        onClick={saveAvailability}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Availability
      </button>
    </div>
  );
};

export default DoctorCalendar;
