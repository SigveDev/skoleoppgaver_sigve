import '../App.css';
import Google from '../img/google.png';
import background from "../img/background-gray.png";

const Login = () => {

    const google = ()=>{
        window.open("http://localhost:5000/auth/google", "_self");
    }

    const toAbout = () => {
        window.open("/", "_self");
    }

    return (
        <div className="login">
            <div className="loginBox">
                <div className="loginBack" onClick={toAbout}>
                    <ion-icon name="close-outline" size="large"></ion-icon>
                </div>
                <div className="loginMethods">
                    <h1 className="loginText">Log in methods:</h1>
                    <div className="loginbutton google" onClick={google}>
                        <img src={Google} alt="google" className="icon" />
                        Google
                    </div>
                </div>
            </div>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default Login;