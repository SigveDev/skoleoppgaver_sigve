import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [status, setStatus] = useState(200);

    const register = async (e) => {
        try {
            e.preventDefault();
            if(document.getElementById('pass').value !== document.getElementById('pass2').value) {
                setStatus(400);
                return;
            }

            const response = await axios.post('https://ramit-api.hcklikk.com/user/register', {
                firstname: document.getElementById('fname').value,
                lastname: document.getElementById('lname').value,
                email: document.getElementById('email').value,
                password: document.getElementById('pass').value,
                isAdmin: false
            });
            console.log(response);
            if(response.status === 200) {
                const res = await axios.post("https://ramit-api.hcklikk.com/cart/create", {
                    userId: response.data.user._id,
                    total: 0,
                    items: []
                })
                localStorage.setItem('user', JSON.stringify(response.data.accessToken));
                let now = new Date();
                localStorage.setItem('ttl', JSON.stringify(now.getTime() + (86400000 * 7)));
                window.location.replace('https://ramit.hcklikk.com/');
            }
        } catch (err) {
            console.log(err);
            setStatus(404);
        }
    };

    return (
        <div className="register">
            <Header active="register" />
            <div className="register-content">
                <h1>Ny bruker</h1>
                <form onSubmit={register}>
                    <div className="form-horizontal">
                        <label htmlFor="fname">Fornavn
                            <input type="text" id="fname" name="fname" placeholder="First name" required />
                        </label>
                        <label htmlFor="lname">Etternavn
                            <input type="text" id="lname" name="lname" placeholder="Last name" required />
                        </label>
                    </div>
                    <label htmlFor="email">E-post adresse</label>
                    <input type="email" id="email" name="email" placeholder="Email address" required />
                    <label htmlFor="pass">Passord</label>
                    <input type="password" id="pass" name="pass" required />
                    <label htmlFor="pass2">Passord igjen</label>
                    <input type="password" id="pass2" name="pass2" required />
                    {status === 400 && <p className="error">Passordene er ikke like</p>}
                    {status === 404 && <p className="error">E-post allerede i bruk</p>}
                    <p>Har du en bruker? <a href="/login">Logg inn</a></p>
                    <button type="submit" className="btn">Registrer</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Register;