import './App.css';
import About from './pages/about';
import PleaseLogin from './pages/pleaseLogin';
import Login from './pages/login';
import Home from './pages/home';
import PrSite from './pages/pr';
import DaySite from './pages/days';
import WeekSite from './pages/week';
import NewPlan from './pages/newPlan';
import Error from './pages/error';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async ()=>{
      const res = await axios.get("http://localhost:5000/auth/login/success", { withCredentials: true });
      setUser(res.data.user);
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <About />} />
        <Route path="/pr" element={user ? <PrSite user={user} /> : <PleaseLogin />} />
        <Route path="/days" element={user ? <DaySite user={user} /> : <PleaseLogin />} />
        <Route path="/week" element={user ? <WeekSite user={user} /> : <PleaseLogin />} />
        <Route path="/new-plan" element={user ? <NewPlan user={user} /> : <PleaseLogin />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
