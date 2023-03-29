import '../App.css';
import './loading.css';
import background from "../img/background-gray.png";
import user from "../components/fetchLogin";

function Loading() {

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