import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Policy } from './pages/Policy';
import { Bookings } from './pages/Bookings';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/admin/sofaliacakesandevents" element={<AdminLogin />} />
          <Route
            path="/admin/sofaliacakesandevents/dashboard"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;