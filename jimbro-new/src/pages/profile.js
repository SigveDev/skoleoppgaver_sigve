import NavBar from '../components/navBar';

const Profile = ({user}) => {

    return (
        <div className="profileSite">
            <div className="content">
                <div className="profileTop">
                    <div className="profilePic">
                        <img src={user.photos[0].value} alt="Profile Picture" />
                    </div>
                    <h1 className="userName">{user.displayName}</h1>
                </div>
                <div className="profileMain">
                    <a href="https://api.jimbro.fyi/auth/logout" className="logout">Logout</a>
                </div>
                <NavBar id="profile"/>
            </div>
        </div>
    );
}

export default Profile;