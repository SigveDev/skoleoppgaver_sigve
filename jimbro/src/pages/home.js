import "../App.css";
import background from "../img/background-gray.png";
import { useEffect, useState } from 'react';
import axios from "axios";

const Home = ({user}) => {
    const [pr, setPr] = useState(null);

    useEffect(() => {
        const getPr = async () => {
            const res = await axios.get("https://api.jimbro.fyi/pr/get/" + user.id, { withCredentials: true });
            setPr(res.data[0]);
        };
        getPr();
    }, []);

    const logout = () => {
        window.open("https://api.jimbro.fyi/auth/logout", "_self");
    };

    const editPr = ()=>{
        window.open("/pr", "_self");
    }

    return (
        <div className="home">
            <div className="userName">
                <img src={user.photos[0].value} alt="user pfp" className="userPFP"></img>
                <h1 className="name">{user.displayName}</h1>
                <h2 className="logout" onClick={logout}>Logout</h2>
            </div>
            <div className="content">
                <div className="pr" onClick={editPr}>
                    <h2 className="elementHeader">My PRs</h2>
                    <div className="editIcon">
                        <p className="smallText">Click box to edit</p>
                    </div>
                    <div className="prlist">
                        {pr === null ? <p>Loading...</p> : <p>Last updated:&ensp;{new Date(pr.updatedAt).toDateString()}</p>}
                        <br />
                        {pr === null ? <h3>Loading...</h3> : <h3>Bench: {pr.bench}</h3>}
                        {pr === null ? <h3>Loading...</h3> : <h3>Deadlift: {pr.deadlift}</h3>}
                        {pr === null ? <h3>Loading...</h3> : <h3>Squat: {pr.squat}</h3>}
                    </div>
                </div>
                <div className="thisWeek">
                    <h2 className="elementHeader">This Week</h2>
                    <div className="editIcon">
                        <p className="smallText">Click box to edit</p>
                    </div>
                </div>
                <div className="myDays">
                    <h2 className="elementHeader">My Plan</h2>
                    <div className="editIcon">
                        <p className="smallText">Click box to edit</p>
                    </div>
                </div>
            </div>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default Home;