import "../App.css";
import background from "../img/background-gray.png";
import { useEffect, useState } from 'react';
import axios from "axios";

const Home = ({user}) => {
    const [pr, setPr] = useState(null);
    const [day, setDay] = useState(null);
    const [week, setWeek] = useState(null);

    useEffect(() => {
        const getPr = async () => {
            const res = await axios.get("https://api.jimbro.fyi/pr/get/" + user.id, { withCredentials: true });
            setPr(res.data[0]);
        };
        getPr();

        const getDay = async () => {
            const res = await axios.get("https://api.jimbro.fyi/plan/get/" + user.id, { withCredentials: true });
            setDay(res.data[0]);
        };
        getDay();

        const getWeek = async () => {
            const res = await axios.get("https://api.jimbro.fyi/week/get/public", { withCredentials: true });
            setWeek(res.data[0]);
            setCorrectDay(week);
        };
        getWeek();
    }, []);

    const setCorrectDay = (check) => {
        if(check !== null) {
            let today = new Date();
            let day = today.getDay();
            let dayList = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];
            let dayName = dayList[day];
            const element = document.getElementsByClassName(dayName)[0];
            element.style.backgroundColor = "#fcba0325";
            element.scrollIntoView({behavior: "smooth", block: "end", inline: "start"});
            return;
        } else {
            setCorrectDay(week);
        }
    }

    return (
        <div className="home">
            <div className="userName">
                <img src={user.photos[0].value} alt="user pfp" className="userPFP"></img>
                <h1 className="name">{user.displayName}</h1>
                <a href="https://api.jimbro.fyi/auth/logout" className="logout">Logout</a>
            </div>
            <div className="content">
                <a href="/days" className="myDays">
                    <div className="editIcon">
                        <p className="smallText">*Click box to edit</p>
                    </div>
                    <h2 className="elementHeader">My Plan</h2>
                    <div className="dayContent">
                    {day === null ? <p>Loading...</p> : 
                        <div className="daylist">
                            <p className="lastUpdated">Last updated:&ensp;{new Date(day.updatedAt).toDateString()}</p>
                            {day.days.map((days) => {
                                return (
                                    <div className="day">
                                        <h3>{days.day}:</h3>
                                        <div className="exercises">
                                            {days.exercises.map((exercises) => {
                                                return (
                                                    <div className="exercise">
                                                        <p>{exercises.exercise}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    }
                    </div>
                </a>
                <a href="/week" className="thisWeek">
                    <h2 className="elementHeader">This Week</h2>
                    <div className="editIcon">
                        <p className="smallText">*Click box to edit</p>
                    </div>
                    {week === null ? <p>Loading...</p> : <p className="lastUpdated">Last updated:&ensp;{new Date(week.updatedAt).toDateString()}</p>}
                    <div className="weekContent">
                        {week === null ? <p>Loading...</p> :
                            <div className="weeklist">
                                <div className="smallweek">
                                    <div className="monday weekDay">
                                        <h3>Monday:</h3>
                                        {week.monday === null ? <p>No plans for this day</p> :   
                                        <div className="mondayContent">
                                            {week.monday.map((days, i) => {
                                                if(i >= 3) {
                                                    return;
                                                } else {
                                                    return (
                                                        <div className={"monday" + i}>
                                                            <p>{days.time}</p>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                        }
                                    </div>
                                    <div className="tuesday weekDay">
                                        <h3>Tuesday:</h3>
                                        {week.tuesday === null ? <p>No plans for this day</p> :   
                                        <div className="tuesdayContent">
                                            {week.tuesday.map((days, i) => {
                                            return (
                                                <div className={"tuesday" + i}>
                                                    <p>{days.time}</p>
                                                </div>
                                            );
                                            })}
                                        </div>
                                        }
                                    </div>
                                    <div className="wednesday weekDay">
                                        <h3>Wednesday:</h3>
                                        {week.wednesday === null ? <p>No plans for this day</p> :   
                                        <div className="wednesdayContent">
                                            {week.wednesday.map((days, i) => {
                                            return (
                                                <div className={"wednesday" + i}>
                                                    <p>{days.time}</p>
                                                </div>
                                            );
                                            })}
                                        </div>
                                        }
                                    </div>
                                    <div className="thursday weekDay">
                                        <h3>Thursday:</h3>
                                        {week.thursday === null ? <p>No plans for this day</p> :   
                                        <div className="thursdayContent">
                                            {week.thursday.map((days, i) => {
                                            return (
                                                <div className={"thursday" + i}>
                                                    <p>{days.time}</p>
                                                </div>
                                            );
                                            })}
                                        </div>
                                        }
                                    </div>
                                    <div className="friday weekDay">
                                        <h3>Friday:</h3>
                                        {week.friday === null ? <p>No plans for this day</p> :   
                                        <div className="fridayContent">
                                            {week.friday.map((days, i) => {
                                            return (
                                                <div className={"friday" + i}>
                                                    <p>{days.time}</p>
                                                </div>
                                            );
                                            })}
                                        </div>
                                        }
                                    </div>
                                    <div className="saturday weekDay">
                                        <h3>Saturday:</h3>
                                        {week.saturday === null ? <p>No plans for this day</p> :   
                                        <div className="saturdayContent">
                                            {week.saturday.map((days, i) => {
                                            return (
                                                <div className={"saturday" + i}>
                                                    <p>{days.time}</p>
                                                </div>
                                            );
                                            })}
                                        </div>
                                        }
                                    </div>
                                    <div className="sunday weekDay">
                                        <h3>Sunday:</h3>
                                        {week.sunday === null ? <p>No plans for this day</p> :   
                                        <div className="sundayContent">
                                            {week.sunday.map((days, i) => {
                                            return (
                                                <div className={"sunday" + i}>
                                                    <p>{days.time}</p>
                                                </div>
                                            );
                                            })}
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </a>
                <a href="/pr" className="pr">
                    <h2 className="elementHeader">My PRs</h2>
                    <div className="editIcon">
                        <p className="smallText">*Click box to edit</p>
                    </div>
                    <div className="prlist">
                        {pr === null ? <p>Loading...</p> : <p className="lastUpdated">Last updated:&ensp;{new Date(pr.updatedAt).toDateString()}</p>}
                        {pr === null ? <h3>Loading...</h3> : <h3>Bench: {pr.bench}</h3>}
                        {pr === null ? <h3>Loading...</h3> : <h3>Deadlift: {pr.deadlift}</h3>}
                        {pr === null ? <h3>Loading...</h3> : <h3>Squat: {pr.squat}</h3>}
                    </div>
                </a>
            </div>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default Home;