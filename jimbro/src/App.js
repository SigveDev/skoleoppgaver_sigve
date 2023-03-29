import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Loading from './pages/loading';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FetchLogin } from "./components/fetchLogin";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    FetchLogin().then((data) => setUser(data));
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
