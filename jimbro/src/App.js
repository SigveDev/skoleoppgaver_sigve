import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Loading from './pages/loading';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={userInfo ? <Home user={userInfo} /> : <Navigate to="/login" />} />
        <Route path="/login" element={userInfo ? <Navigate to="/" /> : <Login />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
