import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";

const Login = () => {
    const [status, setStatus] = useState(true);

    const login = async (e) => {
        e.preventDefault();
        try {
            const email = document.getElementById('email').value;
            const password = document.getElementById('pass').value;
            const response = await axios.get('https://ramit-api.sigve.dev/user/login/' + email + "/" + password, {Credentials: true });
            console.log(response);
            if(response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.accessToken));
                let now = new Date();
                localStorage.setItem('ttl', JSON.stringify(now.getTime() + (86400000 * 7)));
                window.location.replace('https://ramit.sigve.dev/profile');
            }
        } catch (err) {
            console.log(err);
            setStatus(false);
        }
    };

    return (
        <div className="login">
            <Header active="login" />
            <div className="login-content">
                <h1>Logg inn</h1>
                <form onSubmit={login}>
                    <input type="email" id="email" placeholder="E-post" required />
                    <input type="password" id="pass" placeholder="Passord" required />
                    {status === false && <p className="error">Feil e-post eller passord</p>}
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <input type="submit" className="btn" value="Logg Inn" />
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;