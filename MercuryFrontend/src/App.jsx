import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import AppointmentScheduler from './routes/AppointmentScheduler';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './routes/Dashboard';
import FullInfo from './routes/FullInfo';
import LoginPage from './routes/Login';
import AppointmentForm from './routes/AppointmentForm';
import { LanguageContext } from './data/LanguageContext';
import Location from './Components/Location';

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
                <Location locationName="Matarnia" />
              </AppLayout>
            }
          />
          <Route
            exact
            path="/cityMeble"
            element={
              <AppLayout>
                <Location locationName="City Meble" />
              </AppLayout>
            }
          />
          <Route
            exact
            path="/pruszczGdanski"
            element={
              <AppLayout>
                <Location locationName="Pruszcz Gdański" />
              </AppLayout>
            }
          />
          <Route
            exact
            path="/tczew"
            element={
              <AppLayout>
                <Location locationName="Tczew" />
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
    </LanguageContext.Provider>
  );
};

export default App;
