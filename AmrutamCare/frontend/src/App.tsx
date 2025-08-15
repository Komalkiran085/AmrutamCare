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

        {/* Patient Calendar route */}
        {/* <Route
          path="/patient/doctor/:doctorId/calendar"
          element={<PatientDoctorCalendar />}
        /> */}

        {/* Protected dashboard routes */}
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

        {/* Catch-all should be LAST */}
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

