import "../App.css";
import background from "../img/background-gray.png";

const Home = ({user}) => {

    const logout = () => {
        window.open("https://api.jimbro.fyi/auth/logout", "_self");
    };

    return (
        <div className="home">
            <div className="userName">
                <img src={user.photos[0].value} alt="user pfp" className="userPFP"></img>
                <h1 className="name">{user.displayName}</h1>
                <h2 className="logout" onClick={logout}>Logout</h2>
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
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default Home;