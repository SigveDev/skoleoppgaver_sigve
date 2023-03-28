import '../App.css';
import './loading.css';
import background from "../img/background-gray.png";
import { user } from './components/getUser';

function Login() {

    if(user) {
        window.open("https://api.jimbro.fyi/auth/logout", "_self");
    }

    return (
        <div className="loading">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default Login;