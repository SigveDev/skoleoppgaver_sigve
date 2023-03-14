import "../App.css";
import pfp from "../img/meg2.png";
import background from "../img/background.png";

function Home() {
    return (
        <div className="home">
            <div className="userName">
                <img src={pfp} alt="user pfp" className="userPFP"></img>
                <h1 className="name">Sigve Tomten</h1>
            </div>
            <div className="content">
                <div className="pr">
                    <h2 className="elementHeader">My PRs</h2>
                    <div className="editIcon">
                        <ion-icon name="create-outline" size="large"></ion-icon>
                    </div>
                </div>
                <div className="thisWeek">
                    <h2 className="elementHeader">This Week</h2>
                    <div className="editIcon">
                        <ion-icon name="create-outline" size="large"></ion-icon>
                    </div>
                </div>
                <div className="myDays">
                    <h2 className="elementHeader">My Days</h2>
                    <div className="editIcon">
                        <ion-icon name="create-outline" size="large"></ion-icon>
                    </div>
                </div>
            </div>
            <img src={background} className="backgroundImage" />
        </div>
    );
}

export default Home;