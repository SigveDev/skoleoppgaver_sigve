import '../App.css';
import background from "../img/background-gray.png";

const About = () => {

    const toLogin = () => {
        window.open("/login", "_self");
    }

    return (
        <div className="about">
            <div className="mainAbout">
                <h1>Jimbro</h1>
                <h2>Jimbro - all in one training app</h2>
                <br />
                <div className="toLoginPage" onClick={toLogin}>Login</div>
            </div>
            <div className="credits">
                <p>Created and maintained by: <a href="https://github.com/2derp4you">2derp4you</a></p>
                <img src={background} className="backgroundImage" alt="background" />
            </div>
        </div>
    );
}

export default About;