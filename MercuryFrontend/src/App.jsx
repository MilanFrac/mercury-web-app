import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import Header from './Components/AddEventForm/Header';
import CalendarTabs from './routes/CalendarTabs';
import ErrorPage from './routes/Errors/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Matarnia from './routes/Matarnia';
import CityMeble from './routes/CityMeble';
import Dashboard from './routes/Dashboard';
import PruszczGdański from './routes/PruszczGdański';
import Tczew from './routes/Tczew';
import Form from './routes/Form';
import FullInfo from './routes/FullInfo';
import Login from './routes/login';

const AppLayout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      {isLoggedIn && <Header handleLogout={handleLogout} />}
      <br />
      <Outlet />
    </>
  );
};

const App = () => {
  const [allEvents, setAllEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    console.log('Nowe wydarzenie odebrane z formularza:', newEvent);
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <CalendarTabs setAllEvents={setAllEvents} />,
        },
        {
          path: 'matarnia',
          element: <Matarnia />,
        },
        {
          path: 'cityMeble',
          element: <CityMeble />,
        },
        {
          path: 'pruszczGdanski',
          element: <PruszczGdański />,
        },
        {
          path: 'tczew',
          element: <Tczew />,
        },
        {
          path: 'Form',
          element: <Form />,
        },
        {
          path: 'fullInfo',
          element: <FullInfo />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
