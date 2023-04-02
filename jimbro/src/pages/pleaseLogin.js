import '../App.css';
import background from "../img/background-gray.png";

const PleaseLogin = () => {

    const toLogin = () => {
        window.open("/login", "_self");
    }

    return (
        <div className="pleaseLogin">
            <h1>Log in to view this page...</h1>
            <h2 className="toLogin" onClick={toLogin}>To login</h2>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default PleaseLogin;