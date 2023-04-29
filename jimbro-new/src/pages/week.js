import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Week = ({user}) => {
    const [week, setWeek] = useState(null);

    useEffect(() => {
        const getWeek = async () => {
            const res = await axios.get("http://localhost:5000/week/get/public", { withCredentials: true });
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
            element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            return;
        } else {
            setTimeout(setCorrectDay, 100);
        }
    }

    const deletePlan = async (day, id) => {
        console.log(day + " " + id);
        const res = await axios.put("http://localhost:5000/week/remove/public/" + day + "/" + id, { withCredentials: true });
        window.location.reload();
    }

    return (
        <div className="weekSite">
            <div className="weekMain">
                <a href="/" className="weekBack">
                    <ion-icon name="close-outline" size="large"></ion-icon>
                </a>
                <a href="/new-plan" className="newPlanPage" title="Add New Plan">
                    <ion-icon name="add-circle-outline" size="large"></ion-icon>
                </a>
                <div className="weekView">
                    <h1 className="weekText">This Week:</h1><br />
                    {week === null ? <h2>Loading...</h2> : 
                    <div className="weekContent">
                        <div className="monday weekDayView">
                            <h2 className="weekText">Monday:</h2>
                            {week.monday.map((plan) => {
                                if(plan.ownerId === user.id) {
                                    return (
                                        <div className="plan">
                                            <h3 className="planText">{plan.time}</h3>
                                            <h3 className="planText">{plan.plan}</h3>
                                            <h3 className="planText">{plan.user}</h3>
                                            <button type="button" className="deletePlan" onClick={() => deletePlan("monday", plan.ownerId)}>
                                                <ion-icon name="trash-outline" size="large"></ion-icon>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                <div className="plan">
                                    <h3 className="planText">{plan.time}</h3>
                                    <h3 className="planText">{plan.plan}</h3>
                                    <h3 className="planText">{plan.user}</h3>
                                </div>
                                );
                            })}
                        </div>
                        <div className="tuesday weekDayView">
                            <h2 className="weekText">Tuesday:</h2>
                            {week.tuesday.map((plan) => {
                                if(plan.ownerId === user.id) {
                                    return (
                                        <div className="plan">
                                            <h3 className="planText">{plan.time}</h3>
                                            <h3 className="planText">{plan.plan}</h3>
                                            <h3 className="planText">{plan.user}</h3>
                                            <button type="button" className="deletePlan" onClick={() => deletePlan("tuesday", plan.ownerId)}>
                                                <ion-icon name="trash-outline" size="large"></ion-icon>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                <div className="plan">
                                    <h3 className="planText">{plan.time}</h3>
                                    <h3 className="planText">{plan.plan}</h3>
                                    <h3 className="planText">{plan.user}</h3>
                                </div>
                                );
                            })}
                        </div>
                        <div className="wednesday weekDayView">
                            <h2 className="weekText">Wednesday:</h2>
                            {week.wednesday.map((plan) => {
                                if(plan.ownerId === user.id) {
                                    return (
                                        <div className="plan">
                                            <h3 className="planText">{plan.time}</h3>
                                            <h3 className="planText">{plan.plan}</h3>
                                            <h3 className="planText">{plan.user}</h3>
                                            <button type="button" className="deletePlan" onClick={() => deletePlan("wednesday", plan.ownerId)}>
                                                <ion-icon name="trash-outline" size="large"></ion-icon>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                <div className="plan">
                                    <h3 className="planText">{plan.time}</h3>
                                    <h3 className="planText">{plan.plan}</h3>
                                    <h3 className="planText">{plan.user}</h3>
                                </div>
                                );
                            })}
                        </div>
                        <div className="thursday weekDayView">
                            <h2 className="weekText">Thursday:</h2>
                            {week.thursday.map((plan) => {
                                if(plan.ownerId === user.id) {
                                    return (
                                        <div className="plan">
                                            <h3 className="planText">{plan.time}</h3>
                                            <h3 className="planText">{plan.plan}</h3>
                                            <h3 className="planText">{plan.user}</h3>
                                            <button type="button" className="deletePlan" onClick={() => deletePlan("thursday", plan.ownerId)}>
                                                <ion-icon name="trash-outline" size="large"></ion-icon>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                <div className="plan">
                                    <h3 className="planText">{plan.time}</h3>
                                    <h3 className="planText">{plan.plan}</h3>
                                    <h3 className="planText">{plan.user}</h3>
                                </div>
                                );
                            })}
                        </div>
                        <div className="friday weekDayView">
                            <h2 className="weekText">Friday:</h2>
                            {week.friday.map((plan) => {
                                if(plan.ownerId === user.id) {
                                    return (
                                        <div className="plan">
                                            <h3 className="planText">{plan.time}</h3>
                                            <h3 className="planText">{plan.plan}</h3>
                                            <h3 className="planText">{plan.user}</h3>
                                            <button type="button" className="deletePlan" onClick={() => deletePlan("friday", plan.ownerId)}>
                                                <ion-icon name="trash-outline" size="large"></ion-icon>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                <div className="plan">
                                    <h3 className="planText">{plan.time}</h3>
                                    <h3 className="planText">{plan.plan}</h3>
                                    <h3 className="planText">{plan.user}</h3>
                                </div>
                                );
                            })}
                        </div>
                        <div className="saturday weekDayView">
                            <h2 className="weekText">Saturday:</h2>
                            {week.saturday.map((plan) => {
                                if(plan.ownerId === user.id) {
                                    return (
                                        <div className="plan">
                                            <h3 className="planText">{plan.time}</h3>
                                            <h3 className="planText">{plan.plan}</h3>
                                            <h3 className="planText">{plan.user}</h3>
                                            <button type="button" className="deletePlan" onClick={() => deletePlan("saturday", plan.ownerId)}>
                                                <ion-icon name="trash-outline" size="large"></ion-icon>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                <div className="plan">
                                    <h3 className="planText">{plan.time}</h3>
                                    <h3 className="planText">{plan.plan}</h3>
                                    <h3 className="planText">{plan.user}</h3>
                                </div>
                                );
                            })}
                        </div>
                        <div className="sunday weekDayView">
                            <h2 className="weekText">Sunday:</h2>
                            {week.sunday.map((plan) => {
                                if(plan.ownerId === user.id) {
                                    return (
                                        <div className="plan">
                                            <h3 className="planText">{plan.time}</h3>
                                            <h3 className="planText">{plan.plan}</h3>
                                            <h3 className="planText">{plan.user}</h3>
                                            <button type="button" className="deletePlan" onClick={() => deletePlan("sunday", plan.ownerId)}>
                                                <ion-icon name="trash-outline" size="large"></ion-icon>
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                <div className="plan">
                                    <h3 className="planText">{plan.time}</h3>
                                    <h3 className="planText">{plan.plan}</h3>
                                    <h3 className="planText">{plan.user}</h3>
                                </div>
                                );
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Week;