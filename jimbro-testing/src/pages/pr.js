import { useEffect, useState } from 'react';
//import axios from 'axios';
import NavBar from '../components/navBar';
import UserName from '../components/userName';

const PrSite = ({user}) => {
    const [pr, setPr] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/pr/get/" + user.id, { withCredentials: true })
        .then(res => setPr(res.data));
    }, []);

    return (
        <div className="prSite">
            <UserName user={user}/>
            <div className="content">
                <div className="pr">
                    <h2 className="prTitle">My PR's</h2>
                    <a href="/edit-pr" className="editLink"><ion-icon name="create"></ion-icon></a>
                    {pr === null ? <p className="noPr">loading...</p> : <p className="lastUpdated">Last Updated: {new Date(pr.updatedAt).toDateString()}</p>}
                    <div className="prs">
                        {pr === null ? <p className="noPr">Loading...</p> : (
                        <div className="prList">
                            <div className="prElem">
                                <h3 className="prName">Bench</h3>
                                <p className="prWeight" data-testid="pr-1">{pr.bench}</p>
                            </div>
                            <div className="prElem">
                                <h3 className="prName">Deadlift</h3>
                                <p className="prWeight" data-testid="pr-1">{pr.deadlift}</p>
                            </div>
                            <div className="prElem">
                                <h3 className="prName">Squat</h3>
                                <p className="prWeight">{pr.squat}</p>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <NavBar id="pr"/>
            </div>
        </div>
    );
}

export default PrSite;