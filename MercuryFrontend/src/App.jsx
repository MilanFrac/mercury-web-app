import React, { useState, useContext } from 'react';
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
import { LanguageContext } from './data/LanguageContext';

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
  const language = useContext(LanguageContext);

  const handleAddEvent = (newEvent) => {
    console.log('New event received from a form:', newEvent);
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <LanguageContext.Provider value={language}>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/calendar" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/calendar"
          element={
            <AppLayout>
              <AppointmentScheduler setAllEvents={setAllEvents} />
            </AppLayout>
          }
        />
        <Route
          path="/matarnia"
          element={
            <AppLayout>
              <Matarnia />
            </AppLayout>
          }
        />
        <Route
          path="/cityMeble"
          element={
            <AppLayout>
              <CityMeble />
            </AppLayout>
          }
        />
        <Route
          path="/pruszczGdanski"
          element={
            <AppLayout>
              <PruszczGdański />
            </AppLayout>
          }
        />
        <Route
          path="/tczew"
          element={
            <AppLayout>
              <Tczew />
            </AppLayout>
          }
        />
        <Route
          path="/AppointmentForm"
          element={
            <AppLayout>
              <AppointmentForm />
            </AppLayout>
          }
        />
        <Route
          path="/fullInfo"
          element={
            <AppLayout>
              <FullInfo />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
      </Routes>
    </Router>   
    </LanguageContext.Provider>
  );
};

export default App;
