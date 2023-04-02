import '../App.css';
import background from "../img/background-gray.png";

const Error = () => {
    return (
        <div className="error">
            <h1>Error: 404</h1>
            <br />
            <h2>Page not found</h2>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default Error;