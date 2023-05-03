import axios from 'axios';
import NavBar from '../components/navBar';
import BackButton from '../components/backButton';

const EditPr = ({user}) => {

    const updatePr = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("https://api.jimbro.fyi/pr/update/" + user.id, {
                googleId: user.id,
                bench: document.getElementById("bench").value,
                deadlift: document.getElementById("deadlift").value,
                squat: document.getElementById("squat").value
            }, { withCredentials: true });
        } catch (err) {}
        window.open("/pr", "_self");
    }

    return (
        <div className="editPrSite">
            <div className="content">
                <BackButton whereTo="/pr" />
                <div className="editPrMain">
                    <form className="updateForm" method="GET" onSubmit={updatePr}>
                        <label htmlFor="bench">Bench:</label><br />
                        <input type="number" id="bench" name="bench" placeholder="in kg" maxLength="4" /><br /><br />
                        <label htmlFor="deadlift">Deadlift:</label><br />
                        <input type="number" id="deadlift" name="deadlift" placeholder="in kg" maxLength="5" /><br /><br />
                        <label htmlFor="squat">Squat:</label><br />
                        <input type="number" id="squat" name="squat" placeholder="in kg" maxLength="5" /><br />
                        <input type="submit" id="submit" value="Update" />
                    </form>
                </div>
                <NavBar id="pr"/>
            </div>
        </div>
    );
}

export default EditPr;