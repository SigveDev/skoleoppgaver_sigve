import '../App.css';
import Google from '../img/google.png';

function Login() {
    return (
        <div className="login">
            <div className="loginBox">
                <span className="back">Back</span>
                <div className="loginbutton google">
                    <img src={Google} alt="google" className="icon" />
                    Google
                </div>
            </div>
        </div>
    );
}

export default Login;