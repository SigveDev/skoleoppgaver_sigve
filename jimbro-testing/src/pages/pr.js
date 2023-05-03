import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/navBar';
import UserName from '../components/userName';

const PrSite = ({user}) => {
    const [pr, setPr] = useState(null);

    useEffect(() => {
        //Får en brukers pr med axios og setter den i state
        const getPr = async () => {
            const res = await axios.get("http://localhost:5000/pr/get/" + user.id, { withCredentials: true })
            setPr(res.data[0]);
        };
        getPr();
    }, []);

    return (
        <div className="prSite">
            <UserName user={user}/>
            <div className="content">
                <div className="pr">
                    <h2 className="prTitle">My PR's</h2>
                    <a href="/edit-pr" className="editLink"><ion-icon name="create"></ion-icon></a>
                    {/*venter med å rendre datoen før den har fått det fra backenden*/}
                    {pr === null ? <p className="noPr">loading...</p> : <p className="lastUpdated">Last Updated: {new Date(pr.updatedAt).toDateString()}</p>}
                    <div className="prs">
                        {/*venter med å rendre innholdet før den har fått det fra backenden*/}
                        {pr === null ? <p className="noPr">Loading...</p> : (
                        <div className="prList">
                            <div className="prElem">
                                <h3 className="prName">Bench</h3>
                                <p className="prWeight" id="benchValue">{pr.bench}</p>
                            </div>
                            <div className="prElem">
                                <h3 className="prName">Deadlift</h3>
                                <p className="prWeight" data-testid="pr-2">{pr.deadlift}</p>
                            </div>
                            <div className="prElem">
                                <h3 className="prName">Squat</h3>
                                <p className="prWeight" data-testid="pr-3">{pr.squat}</p>
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