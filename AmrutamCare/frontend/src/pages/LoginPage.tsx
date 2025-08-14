// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  role: 'doctor' | 'patient';
}


const LoginPage = ({ role }: LoginPageProps) => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const endpoint =
      role === 'doctor'
        ? 'http://localhost:5000/api/doctors/login'
        : 'http://localhost:5000/api/patients/login';

    const payload =
      role === 'doctor'
        ? { doctorId: id, username }
        : { patientId: id, username };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);

      navigate(`/${role}/dashboard/${id}`);
    } else {
      setMessage(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    setMessage('Server error');
  }
};


  return (
    <div style={{ backgroundColor: "#fff7e2" }} className="flex flex-col items-center justify-center h-screen">
      <h2  className="text-xl text-green-900 mb-140 absolute font-semibold mb-4">
        {/* {role === 'doctor' ? 'Doctor Login' : 'Patient Login'} */}
        AmrutamCare
      </h2>
      <form
      style={{ backgroundColor: "#eeab42" }}
        onSubmit={handleSubmit}
        className=" p-6 rounded shadow-md w-80"
      >
        <label className="block mb-2 text-green-900 text-sm font-medium">
          {role === 'doctor' ? 'Doctor ID' : 'Patient ID'}
        </label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border border-gray-300 bg-white rounded px-3 py-2 w-full mb-4"
          placeholder={`Enter ${role} ID`}
          required
        />

        <label className="block mb-2 text-sm text-green-900 font-medium">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 bg-white rounded px-3 py-2 w-full mb-4"
          placeholder="Enter username"
          required
        />

        <button
        style={{ backgroundColor: "#3a643b" }}
          type="submit"
          className=" text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
