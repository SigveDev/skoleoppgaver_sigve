import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './pages/home';
import ProductPage from './pages/product-page';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import NewProduct from './pages/new-product';
import Category from './categories/categories';
import Cart from './pages/cart-page';
import Order from './pages/order';
import Dashboard from './pages/dashboard';
import OrderInfo from './pages/order-info';
import ProductEdit from './pages/product-edit';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const response = await axios.get('https://ramit-api.hcklikk.com/auth', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user'))
        }
      }, { withCredentials: true });
      if(response.data) {
        setUser(response.data);
      }
    };
    if(localStorage.getItem('user')) {
      if(JSON.parse(localStorage.getItem('ttl')) < new Date().getTime()) {
        localStorage.removeItem('user');
        localStorage.removeItem('ttl');
      } else {
        checkUser();
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage user={user}/>} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" /> } />
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/profile" /> : <Register />} />
          <Route path="/new-product" element={<NewProduct user={user} />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/order" element={<Order user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/order-info/:id" element={<OrderInfo user={user} />} />
          <Route path="/product-edit/:id" element={<ProductEdit user={user} />} />

          <Route path="/pc" element={<Category category="pc" />} />
          <Route path="/laptop" element={<Category category="laptop" />} />
          <Route path="/mobil" element={<Category category="mobil" />} />
          <Route path="/skjerm" element={<Category category="skjerm" />} />
          <Route path="/tilbehor" element={<Category category="tilbehor" />} />
          <Route path="/hoyttaler" element={<Category category="hoyttaler" />} />
          <Route path="/kamera" element={<Category category="kamera" />} />
          <Route path="/lisens" element={<Category category="lisens" />} />
          <Route path="/annet" element={<Category category="annet" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
