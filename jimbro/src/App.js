import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const user = false;

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
