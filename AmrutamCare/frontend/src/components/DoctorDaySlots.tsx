import { useState, useEffect } from "react";

interface DoctorDaySlotsProps {
    date: Date;
    doctorId: string;
    onClose: () => void;
    role?: "doctor" | "patient"; // new prop
}

const DoctorDaySlots = ({ date, doctorId, onClose, role }: DoctorDaySlotsProps) => {
    const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    // const hours = Array.from({ length: 24 }, (_, i) => i);
     const hours = Array.from({ length: 10 }, (_, i) => i + 9);
    const API_BASE = "http://localhost:5000/api/day-slots";

    const [bookedSlots, setBookedSlots] = useState<any[]>([]);
    const [dialogMessage, setDialogMessage] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);

        const ymd = date.toISOString().split("T")[0];

        // 1. Fetch doctor’s availability
        fetch(`${API_BASE}/${doctorId}/${ymd}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.slots) setSelectedSlots(data.slots);
            })
            .catch((err) => console.error("Error fetching slots:", err));

        // 2. Fetch bookings for this doctor/date
        fetch(`http://localhost:5000/api/bookings/doctor/${doctorId}/${ymd}`)
            .then((res) => res.json())
            .then((data) => {
                setBookedSlots(data); // [{hour, patientId, ...}, ...]
            })
            .catch((err) => console.error("Error fetching bookings:", err));
    }, [date, doctorId]);

    const toggleSlot = (hour: number) => {
        setSelectedSlots((prev) =>
            prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
        );
    };

    const selectAllSlots = () => {
        setSelectedSlots([...hours]);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => onClose(), 200);
    };

    const handleSave = () => {
        const ymd = date.toISOString().split("T")[0];
        fetch(`${API_BASE}/${doctorId}/${ymd}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slots: selectedSlots }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("✅ Time slots Locked!");
                handleClose();
            })
            .catch((err) => console.error("Error saving slots:", err));
    };

    const handleClear = () => {
        const ymd = date.toISOString().split("T")[0];
        fetch(`${API_BASE}/${doctorId}/${ymd}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                setSelectedSlots([]);
                alert("🗑️ Time slots cleared!");
            })
            .catch((err) => console.error("Error clearing slots:", err));
    };

    return (
        <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-white p-5 rounded-lg shadow-xl border border-gray-200 z-50 w-[350px]
                  transition-all duration-200 ease-out
                  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
            <h2 className="text-lg font-semibold mb-4 text-center">
                Time Slots for {date.toDateString()}
            </h2>

            <div className="grid grid-cols-4 gap-2 mb-4">
                {hours.map((hour) => {
                    const isAvailable = selectedSlots.includes(hour);
                    const booking = bookedSlots.find((b) => b.hour === hour);

                    let btnClass = "bg-gray-100 hover:bg-gray-200"; // default empty
                    if (booking) {
                        btnClass = "bg-red-600 text-white"; // booked by patient
                    } else if (isAvailable) {
                        btnClass = "bg-green-600 text-white"; // doctor available
                    }

                    return (
                        <button
                            key={hour}
                            onClick={() => {
                                if (booking) {
                                    setDialogMessage(`Patient ID: ${booking.patientId}`);
                                } else if (role === "doctor") {
                                    toggleSlot(hour);
                                }
                            }}
                            className={`p-3 rounded-xl text-sm border transition-colors ${btnClass}`}
                        >
                            {hour.toString().padStart(2, "0")}:00
                        </button>
                    );
                })}
            </div>

            {role === "doctor" && (
                <div className="flex justify-end gap-2">
                    <button
                        style={{ backgroundColor: "#3a643b" }}
                        onClick={selectAllSlots}
                        className="text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Select All
                    </button>
                    <button
                        style={{ backgroundColor: "#3a643b" }}
                        onClick={handleClose}
                        className="text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                        Close
                    </button>
                    <button
                        style={{ backgroundColor: "#3a643b" }}
                        onClick={handleClear}
                        className="text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Clear
                    </button>
                    <button
                        style={{ backgroundColor: "#3a643b" }}
                        onClick={handleSave}
                        className="text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            )}

            {/* Dialog Modal for Patient Info */}
            {dialogMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
                        <p className="text-gray-800">{dialogMessage}</p>
                        <button
                            onClick={() => setDialogMessage(null)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDaySlots;
