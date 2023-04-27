import '../App.css';
import Google from '../img/google.png';
import background from "../img/background-gray.png";

const Login = () => {
    return (
        <div className="login">
            <div className="loginBox">
                <a href="/" className="loginBack">
                    <ion-icon name="close-outline" size="large"></ion-icon>
                </a>
                <div className="loginMethods">
                    <h1 className="loginText">Log in methods:</h1>
                    <a href="https://api.jimbro.fyi/auth/google" className="loginbutton google">
                        <img src={Google} alt="google" className="icon" />
                        Google
                    </a>
                </div>
            </div>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default Login;