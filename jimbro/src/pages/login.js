import '../App.css';
import Google from '../img/google.png';
import background from "../img/background.png";

function Login() {

    const google = ()=>{
        window.open("http://armadillo.pink:25568", "_self");
    }

    return (
        <div className="login">
            <div className="loginBox">
                <div className="loginBack">
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
            <img src={background} className="backgroundImage" />
        </div>
    );
}

export default Login;