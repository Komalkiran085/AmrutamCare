import { useState, useEffect } from "react";

interface PatientDaySlotsProps {
  date: Date;
  doctorId: string;
  onClose: () => void;
}

const PatientDaySlots = ({ date, doctorId, onClose }: PatientDaySlotsProps) => {
  const [doctorSlots, setDoctorSlots] = useState<number[]>([]);
  const [bookedSlot, setBookedSlot] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const API_BASE = "http://localhost:5000/api/day-slots";

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    // Fetch existing slots for this date
    const ymd = date.toISOString().split("T")[0];
    fetch(`${API_BASE}/${doctorId}/${ymd}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.slots) setDoctorSlots(data.slots);
      })
      .catch((err) => console.error("Error fetching slots:", err));
  }, [date, doctorId]);

  const handleSlotClick = (hour: number) => {
    if (doctorSlots.includes(hour)) {
      alert("This slot is already taken by doctor");
      return;
    }

    const confirmBooking = window.confirm(
      `Do you wish to book ${hour.toString().padStart(2, "0")}:00 for appointment?`
    );
    if (confirmBooking) {
      setBookedSlot(hour);
      // Optionally, POST booking to backend
      fetch(`${API_BASE}/book/${doctorId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString(), hour }),
      }).catch((err) => console.error("Error booking slot:", err));
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-white p-5 rounded-lg shadow-xl border border-gray-200 z-50 w-[350px]
                  transition-all duration-200 ease-out
                  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Available Slots for {date.toDateString()}
      </h2>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {hours.map((hour) => (
          <button
            key={hour}
            onClick={() => handleSlotClick(hour)}
            className={`p-3 rounded-xl text-sm border transition-colors
              ${doctorSlots.includes(hour)
                ? "bg-red-600 text-white cursor-not-allowed"
                : bookedSlot === hour
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {hour.toString().padStart(2, "0")}:00
            {bookedSlot === hour && " ✅"}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          style={{ backgroundColor: "#3a643b" }}
          onClick={handleClose}
          className="text-white px-3 py-1 rounded hover:bg-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientDaySlots;
