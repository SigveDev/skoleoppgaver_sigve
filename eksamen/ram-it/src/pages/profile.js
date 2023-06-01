import Header from "../components/header";
import Footer from "../components/footer";

const Profile = ({ user }) => {
    return (
        <div className="profile-page">
            <Header active="profile" />
            <div className="profile-content">
                <h1>{user.firstname} {user.lastname}</h1>
                <h3>E-post:</h3>
                <p>{user.email}</p>
                <h3>Bruker Opprettet:</h3>
                <p>{new Date(user.createdAt).toDateString()}</p>
                <a href="/order" className="orderButton">Dine ordere</a>
                {user.isAdmin ? <div className="profile-admin">
                    <h3>Admin</h3>
                    <a href="/new-product" className="adminBtn">Nytt produkt</a>
                    <a href="/dashboard" className="adminBtn">Dashboard</a>
                </div> : null}
                <button onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('ttl');
                    window.location.replace('https://ramit.sigve.dev/');
                }} className="logout">Logg out</button>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;