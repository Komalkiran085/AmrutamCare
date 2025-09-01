import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";
import DoctorDaySlots from "./DoctorDaySlots";
import PatientDaySlots from "./PatientDaySlots";
import "./calender.css"

const DoctorCalendar = ({ doctorId }: { doctorId: string }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const API_BASE = `${import.meta.env.VITE_API_URL}/api/availability`;
  const { role } = useParams();

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

  const handleClickDay = (value: Date) => {
    // Prevent opening modal for fully booked/faded dates
    const isFullyBooked = selectedDates.some(
      (d) => d.toDateString() === value.toDateString()
    );
    if (!isFullyBooked) setSelectedDay(value);
  };

  const clearAvailability = () => {
    setSelectedDates([]);
    fetch(`${API_BASE}/${doctorId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availableDates: [] }),
    })
      .then((res) => res.json())
      .then(() => alert("🗑️ All availability cleared!"))
      .catch((err) => console.error("Error clearing availability:", err));
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <Calendar
        onClickDay={handleClickDay}
        tileClassName={({ date }) => {
          const isFullyBooked = selectedDates.some(
            (d) => d.toDateString() === date.toDateString()
          );
          const isSelected =
            selectedDay && date.toDateString() === selectedDay.toDateString();

          if (isSelected) return "highlight-tile"; // highlight selected tile
          if (isFullyBooked) return "booked-tile"; // style booked dates
          return "available-tile"; // style all other available dates
        }}
        className="bg-white shadow-xl rounded-xl p-4 border border-gray-200"
      />

      {role === "doctor" && (
        <div className="flex gap-3">
          <button
            style={{ backgroundColor: "#3a643b" }}
            onClick={clearAvailability}
            className="text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Clear Calendar
          </button>
        </div>
      )}

      {selectedDay && (
        <>
          {role === "doctor" ? (
            <DoctorDaySlots
              date={selectedDay}
              doctorId={doctorId}
              onClose={() => setSelectedDay(null)}
              role={role}
            />
          ) : role === "patient" ? (
            <PatientDaySlots
              date={selectedDay}
              doctorId={doctorId}
              onClose={() => setSelectedDay(null)}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default DoctorCalendar;
