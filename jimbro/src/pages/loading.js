import '../App.css';
import './loading.css';
import background from "../img/background-gray.png";
import { FetchLogin } from "../components/fetchLogin";
import { useEffect, useState } from 'react';

function Loading() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    FetchLogin().then((data) => setUser(data));
  }, []);

  console.log(user);

  if(user) {
    window.open("https://jimbro.fyi", "_self");
  }
  
  return (
      <div className="loading">
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          <img src={background} className="backgroundImage" alt="background" />
      </div>
  );
}

export default Loading;