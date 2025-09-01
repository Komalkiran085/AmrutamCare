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

  // Dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"info" | "confirm" | "error">("info");
  const [pendingHour, setPendingHour] = useState<number | null>(null);
 const hours = Array.from({ length: 10 }, (_, i) => i + 9);
  const API_BASE = `${import.meta.env.VITE_API_URL}/api/day-slots`;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    const ymd = date.toISOString().split("T")[0];
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings/doctor/${doctorId}/${ymd}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDoctorSlots(data.map((b: any) => b.hour)); // booked hours
        }
      })
      .catch((err) => console.error("Error fetching slots:", err));
  }, [date, doctorId]);

  const handleSlotClick = (hour: number) => {
    if (doctorSlots.includes(hour)) {
      setDialogMessage("This slot is already Booked.");
      setDialogType("error");
      setDialogVisible(true);
      return;
    }

    setPendingHour(hour);
    setDialogMessage(`Do you wish to book ${hour.toString().padStart(2, "0")}:00 for appointment?`);
    setDialogType("confirm");
    setDialogVisible(true);
  };

  const confirmBooking = () => {
    if (pendingHour === null) return;

    setBookedSlot(pendingHour);

    fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: "P001", // TODO: replace with logged-in patient's ID
        doctorId,
        date: date.toISOString().split("T")[0], // only YYYY-MM-DD
        hour: pendingHour,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Error booking slot");
        }
        return res.json();
      })
      .then((data) => {
        setDialogMessage(
          `🎉 Appointment booked successfully at ${pendingHour}:00.`
        );
        setDialogType("info");
        setDialogVisible(true);
      })
      .catch((err) => {
        setDialogMessage(`⚠️ ${err.message}`);
        setDialogType("error");
        setDialogVisible(true);
        setBookedSlot(null);
      });

    setPendingHour(null);
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
                ? "bg-amber-600 text-white cursor-not-allowed"
                : bookedSlot === hour
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {hour.toString().padStart(2, "0")}:00
            {bookedSlot === hour}
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

      {/* Custom Dialog */}
      {dialogVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`bg-white p-6 rounded-lg shadow-xl w-[300px] text-center transform transition-all duration-300 ease-out
        ${dialogVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
          >
            <p className="mb-4 text-gray-800">{dialogMessage}</p>
            <div className="flex justify-center gap-3">
              {dialogType === "confirm" ? (
                <>
                  <button
                    style={{ backgroundColor: "#3a643b" }}

                    className="text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    onClick={() => {
                      setDialogVisible(false);
                      confirmBooking();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                    onClick={() => setDialogVisible(false)}
                  >
                    No
                  </button>
                </>
              ) : (
                <button
                  style={{ backgroundColor: "#3a643b" }}

                  className=" text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => setDialogVisible(false)}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDaySlots;
