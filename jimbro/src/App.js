import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Loading from './pages/loading';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = ()=>{
      fetch("https://api.jimbro.fyi/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(response=>{
        if (response.status === 200) return response.json();
        throw new Error("authentication failed");
      }).then(resObject=>{
        setUser(resObject.user);
      }).catch(err=>{
        console.log(err);
      });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
