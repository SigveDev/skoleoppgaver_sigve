import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import UserName from '../components/userName';

const DaySite = ({user}) => {
    const [day, setDay] = useState(null);
    const [listId, setListId] = useState(null);

    useEffect(() => {
        const getDay = async () => {
            const res = await axios.get("https://api.jimbro.fyi/plan/get/" + user.id, { withCredentials: true });
            setDay(res.data[0]);
        };
        getDay();
    }, []);

    const expand = (id) => {
        if(listId !== id) {
            let elem = document.getElementById("dayElem" + id);
            let list = document.getElementById("list" + id);
            let counter = document.getElementById("counter" + id);
            let button = document.getElementById("button" + id);

            elem.style.height = "fit-content";
            elem.style.gridTemplateRows = "50px auto";
            elem.classList.add("active");

            list.style.display = "block";
            counter.style.display = "none";

            button.style.rotate = "-90deg";

            elem.scrollIntoView({behavior: "smooth", block: "start"});

            for(let i = 0; i < day.days.length; i++) {
                if (i === id) {
                    continue;
                } else {
                    document.getElementById("dayElem" + i).style.height = "80px";
                    document.getElementById("dayElem" + i).style.gridTemplateRows = "65% 35%";
                    document.getElementById("dayElem" + i).classList.remove("active");

                    document.getElementById("list" + i).style.display = "none";
                    document.getElementById("counter" + i).style.display = "block";

                    document.getElementById("button" + i).style.rotate = "0deg";
                }
            }
            setListId(id);
        } else {
            let elem = document.getElementById("dayElem" + id);
            let list = document.getElementById("list" + id);
            let counter = document.getElementById("counter" + id);
            let button = document.getElementById("button" + id);

            elem.style.height = "80px";
            elem.style.gridTemplateRows = "65% 35%";
            elem.classList.remove("active");

            list.style.display = "none";
            counter.style.display = "block";

            button.style.rotate = "0deg";
            setListId(null);
        }
    }

    return (
        <div className="daySite">
            <UserName user={user} />
            <div className="content">
                <div className="myDays">
                    <h2 className="dayHeader">My Plans</h2>
                    <a href="/edit-days" className="editLink"><ion-icon name="create"></ion-icon></a>
                    {day === null ? <p className="noPlan">Loading...</p> : <p className="lastUpdated">Last Updated: {new Date(day.updatedAt).toDateString()}</p>}
                    <div className="days">
                        {day === null ? <p className="noPlan">You have no plans yet</p> : day.days.map((days, index) => (
                            <div className="dayElem" id={"dayElem" + index} key={index}>
                                <h3 className="dayName">{days.day}</h3>
                                <button className="openButton" id={"button" + index} onClick={() => {expand(index)}}><ion-icon name="chevron-back-sharp"></ion-icon></button>
                                <p className="amountCounter" id={"counter" + index}>Exercises: {days.exercises.length}</p>
                                <div className="exerciseList" id={"list" + index}>
                                    {days.exercises.map((exercise, index) => (
                                        <div className="exerciseElem" key={index}>
                                            <p className="exerciseName">{exercise.exercise}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>

                </div>
                <NavBar id="plan" />
            </div>
        </div>
    );
}

export default DaySite;