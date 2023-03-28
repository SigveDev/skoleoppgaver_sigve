import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Loading from './pages/loading';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App({user}) {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="*" element={<Loading />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
