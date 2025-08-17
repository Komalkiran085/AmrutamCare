import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctor/login" element={<LoginPage role="doctor" />} />
        <Route path="/patient/login" element={<LoginPage role="patient" />} />
        <Route path="/admin/login" element={<LoginPage role="admin" />} />
        <Route
          path="/:role/dashboard/:id"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ConcernsList />} />
          <Route path=":concernId" element={<DoctorsList />} />
          <Route path="doctor/:doctorId/calendar" element={<PatientDoctorCalendar />} />

        </Route>


        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;


import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from "./pages/Dashboard"; import DoctorsList from "./components/DoctorsList";
import ConcernsList from "./components/ConcernsList";
import PatientDoctorCalendar from "./components/PatientDoctorCalendar";

