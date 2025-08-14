import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctor/login" element={<LoginPage role="doctor" />} />
        <Route path="/patient/login" element={<LoginPage role="patient" />} />
        {/* <Route
          path="/:role/dashboard/:id"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
        </Route>
         <Route path="/:role/concern/:concernId" element={<DoctorsList />} />
      </Routes> */}


        <Route
          path="/:role/dashboard/:id"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Default child route → shows concerns list */}
          <Route index element={<ConcernsList />} />

          {/* Child route for doctors list */}
          <Route path=":concernId" element={<DoctorsList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from "./pages/Dashboard"; import DoctorsList from "./components/DoctorsList";
import ConcernsList from "./components/ConcernsList";

