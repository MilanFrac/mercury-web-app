import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/AddEventForm/Header';
import CalendarTabs from './routes/CalendarTabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Matarnia from './routes/Matarnia';
import CityMeble from './routes/CityMeble';
import Dashboard from './routes/Dashboard';
import PruszczGdański from './routes/PruszczGdański';
import Tczew from './routes/Tczew';
import Form from './routes/Form';
import FullInfo from './routes/FullInfo';
import LoginPage from './routes/Login';

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
    console.log('Nowe wydarzenie odebrane z formularza:', newEvent);
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/calendar" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/calendar"
          element={
            <AppLayout>
              <CalendarTabs setAllEvents={setAllEvents} />
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
          path="/Form"
          element={
            <AppLayout>
              <Form />
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
  );
};

export default App;
