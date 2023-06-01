import Header from "../components/header";
import Footer from "../components/footer";

const PleaseLogin = () => {
    return (
        <div className="please-login">
            <Header active="none" />
            <div className="please-login-content">
                <h1>Logg inn for å fortsette</h1>
                <p>Du må være logget inn for å fortsette.</p>
                <a href="/login">Logg inn</a>
            </div>
            <Footer />
        </div>
    );
};

export default PleaseLogin;
