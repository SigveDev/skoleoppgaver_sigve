import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/navBar';
import UserName from '../components/userName';

const Home = ({user}) => {
    const [week, setWeek] = useState(null);
    const [allWeek, setAllWeek] = useState(null);
    const [today, setToday] = useState(null);
    const [canRun, setCanRun] = useState(false);

    useEffect(() => {
        const getAllWeek = async () => {
            const res = await axios.get("http://localhost:5000/week/get/public", { withCredentials: true });
            setAllWeek(res.data[0]);
        };
        getAllWeek();

        //Setter riktig dag som dagens dag og setter den til å være aktiv
        const setCorrectDay = () => {
            if(canRun) return;
            let today = new Date();
            let day = today.getDay();
            let dayList = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];
            let dayName = dayList[day];
            setToday(dayName);
            const element = document.getElementsByClassName(dayName)[0];
            element.style.backgroundColor = "#3665F7";
            element.style.color = "white";
            element.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
            setCanRun(true);
            return dayName;
        }
        setCorrectDay();

        //Får en brukers planer i følge hvilken dag det er med axios og setter den i state
        if(today) {
            const getWeek = async () => {
                const res = await axios.get("http://localhost:5000/week/get/public/" + today, { withCredentials: true });
                setWeek(res.data);
            };
            getWeek();
        }
    }, [today]);

    //lar brukeren endre hvilken dag som skal bli vist og setter den til å være aktiv
    const changeDay = (day, id) => {
        setToday(day);
        const dayList = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ];
        for(let i = 0; i < dayList.length; i++) {
            const element = document.getElementsByClassName(dayList[i])[0];
            element.style.backgroundColor = "white";
            element.style.color = "#4E4E4E";
        }
        let element = document.getElementsByClassName("day")[id];
        element.style.backgroundColor = "#3665F7";
        element.style.color = "white";
        element.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
        setCanRun(true);
    }

    //Sletter en plan med axios og oppdaterer siden
    const deletePlan = async (day, id) => {
        console.log(day + " " + id);
        const res = await axios.put("http://localhost:5000/week/remove/public/" + day + "/" + id, { withCredentials: true });
        window.location.reload();
    }

    return (
        <div className="home">
            <UserName user={user} />
            <div className="content">
                <div className="otherPlans">
                    <h2 className="otherHeader">Everyone</h2>
                    {/*<a href="/" className="moreLink">View all</a>*/}
                    <div className="daysList">
                        <button className="day monday" onClick={() => {changeDay("monday", "0")}}>
                            <h3 className="dayName">M</h3>
                        </button>
                        <button className="day tuesday" onClick={() => {changeDay("tuesday", "1")}}>
                            <h3 className="dayName">T</h3>
                        </button>
                        <button className="day wednesday" onClick={() => {changeDay("wednesday", "2")}}>
                            <h3 className="dayName">W</h3>
                        </button>
                        <button className="day thursday" onClick={() => {changeDay("thursday", "3")}}>
                            <h3 className="dayName">T</h3>
                        </button>
                        <button className="day friday" onClick={() => {changeDay("friday", "4")}}>
                            <h3 className="dayName">F</h3>
                        </button>
                        <button className="day saturday" onClick={() => {changeDay("saturday", "5")}}>
                            <h3 className="dayName">S</h3>
                        </button>
                        <button className="day sunday" onClick={() => {changeDay("sunday", "6")}}>
                            <h3 className="dayName">S</h3>
                        </button>
                    </div>
                    <div className="thisDay">
                        {week === null ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="dayList">
                                {/*Render inn alle planene for den dagen*/}
                                {week.map((plan, index) => (
                                    <div className="dayPlan" key={index}>
                                        <img src={plan.ownerPfp} alt="owner pfp" className="daypfp"/>
                                        <h4 className="dayTime">kl {plan.time}</h4>
                                        <h2 className="dayUser">{plan.user}</h2>
                                        <span className="dayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        <span className="dayWhat"><ion-icon name="clipboard-sharp" className="planIcon"></ion-icon>&emsp;{plan.plan}</span>
                                        <span className="dayAmount"><ion-icon name="people-sharp" className="planIcon"></ion-icon>&emsp;{plan.amount}</span>
                                    </div>
                                ))}
                                {week.length === 0 ? (
                                    <p className="noPlans">No plans for this day</p>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="myPlans">
                    <h2 className="myHeader">My Plans this week</h2>
                    <a href="/new-plan" className="moreLink"><ion-icon name="add-circle-sharp" size="large"></ion-icon></a>
                        {allWeek === null ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="myDayList">
                                {/*Render inn alle brukerens planer for mandag*/}
                                {allWeek.monday.map((plan, index) => (
                                    <div key={index}>
                                    {plan.ownerId === user.id ? (
                                        <div className="myDayPlan">
                                            <img src={plan.ownerPfp} alt="your pfp" className="myDaypfp"/>
                                            <h2 className="myDayWhat">{plan.plan}</h2>
                                            <h4 className="myDayTime">kl {plan.time}</h4>
                                            <button className="myTrash" onClick={() => {deletePlan("monday", user.id)}}><ion-icon name="trash-sharp"></ion-icon></button>
                                            <span className="myDayDay"><ion-icon name="calendar-sharp"></ion-icon>&emsp;Monday</span>
                                            <span className="myDayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                ))}
                                {/*Render inn alle brukerens planer for tirsdag*/}
                                {allWeek.tuesday.map((plan, index) => (
                                    <div key={index}>
                                    {plan.ownerId === user.id ? (
                                        <div className="myDayPlan">
                                            <img src={plan.ownerPfp} alt="your pfp" className="myDaypfp"/>
                                            <h2 className="myDayWhat">{plan.plan}</h2>
                                            <h4 className="myDayTime">kl {plan.time}</h4>
                                            <button className="myTrash" onClick={() => {deletePlan("tuesday", user.id)}}><ion-icon name="trash-sharp"></ion-icon></button>
                                            <span className="myDayDay"><ion-icon name="calendar-sharp"></ion-icon>&emsp;Tuesday</span>
                                            <span className="myDayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                ))}
                                {/*Render inn alle brukerens planer for onsdag*/}
                                {allWeek.wednesday.map((plan, index) => (
                                    <div key={index}>
                                    {plan.ownerId === user.id ? (
                                        <div className="myDayPlan">
                                            <img src={plan.ownerPfp} alt="your pfp" className="myDaypfp"/>
                                            <h2 className="myDayWhat">{plan.plan}</h2>
                                            <h4 className="myDayTime">kl {plan.time}</h4>
                                            <button className="myTrash" onClick={() => {deletePlan("wednesday", user.id)}}><ion-icon name="trash-sharp"></ion-icon></button>
                                            <span className="myDayDay"><ion-icon name="calendar-sharp"></ion-icon>&emsp;Wednesday</span>
                                            <span className="myDayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                ))}
                                {/*Render inn alle brukerens planer for torsdag*/}
                                {allWeek.thursday.map((plan, index) => (
                                    <div key={index}>
                                    {plan.ownerId === user.id ? (
                                        <div className="myDayPlan">
                                            <img src={plan.ownerPfp} alt="your pfp" className="myDaypfp"/>
                                            <h2 className="myDayWhat">{plan.plan}</h2>
                                            <h4 className="myDayTime">kl {plan.time}</h4>
                                            <button className="myTrash" onClick={() => {deletePlan("thursday", user.id)}}><ion-icon name="trash-sharp"></ion-icon></button>
                                            <span className="myDayDay"><ion-icon name="calendar-sharp"></ion-icon>&emsp;Thursday</span>
                                            <span className="myDayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                ))}
                                {/*Render inn alle brukerens planer for fredag*/}
                                {allWeek.friday.map((plan, index) => (
                                    <div key={index}>
                                    {plan.ownerId === user.id ? (
                                        <div className="myDayPlan">
                                            <img src={plan.ownerPfp} alt="your pfp" className="myDaypfp"/>
                                            <h2 className="myDayWhat">{plan.plan}</h2>
                                            <h4 className="myDayTime">kl {plan.time}</h4>
                                            <button className="myTrash" onClick={() => {deletePlan("friday", user.id)}}><ion-icon name="trash-sharp"></ion-icon></button>
                                            <span className="myDayDay"><ion-icon name="calendar-sharp"></ion-icon>&emsp;Friday</span>
                                            <span className="myDayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                ))}
                                {/*Render inn alle brukerens planer for lørdag*/}
                                {allWeek.saturday.map((plan, index) => (
                                    <div key={index}>
                                    {plan.ownerId === user.id ? (
                                        <div className="myDayPlan">
                                            <img src={plan.ownerPfp} alt="your pfp" className="myDaypfp"/>
                                            <h2 className="myDayWhat">{plan.plan}</h2>
                                            <h4 className="myDayTime">kl {plan.time}</h4>
                                            <button className="myTrash" onClick={() => {deletePlan("saturday", user.id)}}><ion-icon name="trash-sharp"></ion-icon></button>
                                            <span className="myDayDay"><ion-icon name="calendar-sharp"></ion-icon>&emsp;Saturday</span>
                                            <span className="myDayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                ))}
                                {/*Render inn alle brukerens planer for søndag*/}
                                {allWeek.sunday.map((plan, index) => (
                                    <div key={index}>
                                    {plan.ownerId === user.id ? (
                                        <div className="myDayPlan">
                                            <img src={plan.ownerPfp} alt="your pfp" className="myDaypfp"/>
                                            <h2 className="myDayWhat">{plan.plan}</h2>
                                            <h4 className="myDayTime">kl {plan.time}</h4>
                                            <button className="myTrash" onClick={() => {deletePlan("sunday", user.id)}}><ion-icon name="trash-sharp"></ion-icon></button>
                                            <span className="myDayDay"><ion-icon name="calendar-sharp"></ion-icon>&emsp;Sunday</span>
                                            <span className="myDayWhere"><ion-icon name="location-sharp" className="planIcon"></ion-icon>&emsp;{plan.place}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
                <NavBar id="home" />
            </div>
        </div>
    );
}

export default Home;