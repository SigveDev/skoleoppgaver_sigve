import Google from '../img/google.png';

const Login = () => {
    return (
        <div className="login">
            <div className="content">
                <div className="logo">
                </div>
                <div className="loginBox">
                    <h1 className="loginTitle">Login</h1><br /><br />
                    <a href="https://api.jimbro.fyi/auth/google" className="loginBtn"><img src={Google} alt="Google Logo" className="googleLogo" />Login with Google</a>
                </div>
            </div>
        </div>
    );
}

export default Login;