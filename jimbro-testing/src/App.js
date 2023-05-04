import './App.css';
import PleaseLogin from './pages/pleaseLogin';
import Login from './pages/login';
import Home from './pages/home';
import PrSite from './pages/pr';
import DaySite from './pages/days';
import Profile from './pages/profile';
import NewPlan from './pages/newPlan';
import EditDays from './pages/editDays';
import EditPr from './pages/editPr';
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
        <Route path="/" element={user ? <Home user={user} /> : <Login />} />
        <Route path="/pr" element={user ? <PrSite user={user} /> : <PleaseLogin />} />
        <Route path="/days" element={user ? <DaySite user={user} /> : <PleaseLogin />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <PleaseLogin />} />
        <Route path="/new-plan" element={user ? <NewPlan user={user} /> : <PleaseLogin />} />
        <Route path="/edit-days" element={user ? <EditDays user={user} /> : <PleaseLogin />} />
        <Route path="/edit-pr" element={user ? <EditPr user={user} /> : <PleaseLogin />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {/*Router alle andre til error 404 siden*/}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
