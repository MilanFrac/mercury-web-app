import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import AppointmentScheduler from './routes/AppointmentScheduler';
import 'bootstrap/dist/css/bootstrap.min.css';
import Matarnia from './routes/Matarnia';
import CityMeble from './routes/CityMeble';
import Dashboard from './routes/Dashboard';
import PruszczGdański from './routes/PruszczGdański';
import Tczew from './routes/Tczew';
import FullInfo from './routes/FullInfo';
import LoginPage from './routes/Login';
import AppointmentForm from './routes/AppointmentForm';

const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header handleLogout={handleLogout} />
      <br />
      {children}
    </>
  );
};

const App = () => {
  const [allEvents, setAllEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    console.log('New event received from a form:', newEvent);
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <Router basename={process.env.REACT_APP_PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<Navigate to="/calendar" />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/calendar"
          element={
            <AppLayout>
              <AppointmentScheduler setAllEvents={setAllEvents} />
            </AppLayout>
          }
        />
        <Route
          exact
          path="/matarnia"
          element={
            <AppLayout>
              <Matarnia />
            </AppLayout>
          }
        />
        <Route
          exact
          path="/cityMeble"
          element={
            <AppLayout>
              <CityMeble />
            </AppLayout>
          }
        />
        <Route
          exact
          path="/pruszczGdanski"
          element={
            <AppLayout>
              <PruszczGdański />
            </AppLayout>
          }
        />
        <Route
          exact
          path="/tczew"
          element={
            <AppLayout>
              <Tczew />
            </AppLayout>
          }
        />
        <Route
          exact
          path="/AppointmentForm"
          element={
            <AppLayout>
              <AppointmentForm />
            </AppLayout>
          }
        />
        <Route
          exact
          path="/fullInfo"
          element={
            <AppLayout>
              <FullInfo />
            </AppLayout>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
