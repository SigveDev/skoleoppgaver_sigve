import '../App.css';
import background from "../img/background-gray.png";
import axios from 'axios';

const PrSite = ({user}) => {

    const updatePr = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("http://localhost:5000/pr/update/" + user.id, {
                googleId: user.id,
                bench: document.getElementById("bench").value,
                deadlift: document.getElementById("deadlift").value,
                squat: document.getElementById("squat").value
            }, { withCredentials: true });
        } catch (err) {}
        toMain();
    }

    const toMain = () => {
        window.open("/", "_self");
    }

    return (
        <div className="prSite">
            <div className="prMain">
                <div className="prBack" onClick={toMain}>
                    <ion-icon name="close-outline" size="large"></ion-icon>
                </div>
                <h1>Edit PR</h1>
                <h2>New personal records:</h2>
                <br />
                <form method="GET" onSubmit={updatePr}>
                    <label htmlFor="bench">Bench:</label><br />
                    <input type="number" id="bench" name="bench" placeholder="in kg"/><br />
                    <label htmlFor="deadlift">Deadlift:</label><br />
                    <input type="number" id="deadlift" name="deadlift" placeholder="in kg"/><br />
                    <label htmlFor="squat">Squat:</label><br />
                    <input type="number" id="squat" name="squat" placeholder="in kg"/><br />
                    <input type="submit" id="submit" value="Update" />
                </form>
            </div>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default PrSite;