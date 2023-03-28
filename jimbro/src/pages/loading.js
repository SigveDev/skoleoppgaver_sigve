import '../App.css';
import './loading.css';
import background from "../img/background-gray.png";
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Login() {
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

  if(user) {
    <Navigate to="/" user="user"/>
  }
  
  return (
      <div className="loading">
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          <img src={background} className="backgroundImage" alt="background" />
      </div>
  );
}

export default Login;