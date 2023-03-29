import '../App.css';
import './loading.css';
import background from "../img/background-gray.png";
import FetchLogin from "../components/fetchLogin";

function Loading(prop) {

  console.log(prop.user);

  if(prop.user) {
    window.open("https://jimbro.fyi", "_self");
  }
  
  return (
      <div className="loading">
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          <img src={background} className="backgroundImage" alt="background" />
          <FetchLogin />
      </div>
  );
}

export default Loading;