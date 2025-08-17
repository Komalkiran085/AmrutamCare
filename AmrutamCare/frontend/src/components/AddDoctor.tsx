import { useState } from "react";

const AddDoctor = () => {
  const [doctorId, setDoctorId] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // admin’s JWT

    try {
      const res = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId, username }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Doctor added successfully!");
        setDoctorId("");
        setUsername("");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Failed to add doctor");
    }
  };

  return (
    <div className="grid grid-cols-25 ">
     <div className="flex flex-col col-start-10 col-end-17 bg-white shadow-md rounded-lg p-5 " >
         <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
      <form onSubmit={handleSubmit} className=" flex flex-col justify-center space-y-4">
        <input
          type="text"
          placeholder="Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className=" border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Doctor Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" border p-2 rounded"
        />
        <button
        style={{ backgroundColor: "#3a643b" }}
          type="submit"
          className="text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Doctor
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
     </div>
    </div>
  );
};

export default AddDoctor;
