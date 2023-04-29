import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NewPlan = ({user}) => {
    const [day, setDay] = useState(null);
    const [week, setWeek] = useState(null);

    const hours = 24;
    const minutes = ["00", "15", "30", "45"];

    useEffect(() => {
        const getDay = async () => {
            const res = await axios.get("http://localhost:5000/plan/get/" + user.id, { withCredentials: true });
            setDay(res.data[0].days);
        };
        getDay();

        const getWeek = async () => {
            const res = await axios.get("http://localhost:5000/week/get/public", { withCredentials: true });
            setWeek(res.data[0]);
        };
        getWeek();
    }, []);

    const postNewPlan = async (e) => {
        e.preventDefault();

        const hour = document.querySelector(".hour").value;
        const minute = document.querySelector(".minute").value;
        const whichDay = document.querySelector(".whichDay").value;
        const plan = document.querySelector(".plan").value;

        console.log(hour + ":" + minute + " " + whichDay + " " + plan);

        const newMonday = week.monday;
        const newTuesday = week.tuesday;
        const newWednesday = week.wednesday;
        const newThursday = week.thursday;
        const newFriday = week.friday;
        const newSaturday = week.saturday;
        const newSunday = week.sunday;

        if(whichDay === "monday") {
            newMonday.push({
                ownerId: user.id,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan
            });
        } else if(whichDay === "tuesday") {
            newTuesday.push({
                ownerId: user.id,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan
            });
        } else if(whichDay === "wednesday") {
            newWednesday.push({
                ownerId: user.id,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan
            });
        } else if(whichDay === "thursday") {
            newThursday.push({
                ownerId: user.id,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan
            });
        } else if(whichDay === "friday") {
            newFriday.push({
                ownerId: user.id,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan
            });
        } else if(whichDay === "saturday") {
            newSaturday.push({
                ownerId: user.id,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan
            });
        } else if(whichDay === "sunday") {
            newSunday.push({
                ownerId: user.id,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan
            });
        }

        try {
            const res = await axios.put("http://localhost:5000/week/update/public", {
                monday: newMonday,
                tuesday: newTuesday,
                wednesday: newWednesday,
                thursday: newThursday,
                friday: newFriday,
                saturday: newSaturday,
                sunday: newSunday
            }, { withCredentials: true });
            console.log(res.data);
        } catch(err) {
            console.log(err);
        }
        window.location.href = "/week";
    }

    return (
        <div className="newPlan">
            <div className="planBox">
                <a href="/week" className="planBack">
                    <ion-icon name="close-outline" size="large"></ion-icon>
                </a>
                <div className="planPage">
                    <h1 className="planText">Add a new plan:</h1>
                    {day === null ? <h2>Loading...</h2> : 
                    <div className="planContent">
                        <form className="planForm" onSubmit={postNewPlan}>
                            <h3 className="time">Time:</h3>
                            <select className="hour">
                                {Array.from(Array(hours).keys()).map((hour) => (
                                    <option value={hour}>{hour}</option>
                                ))}
                            </select>
                            <span className="timeSeperator">&nbsp;:&nbsp;</span>
                            <select className="minute">
                                {minutes.map((minute) => (
                                    <option value={minute}>{minute}</option>
                                ))}
                            </select><br />
                            <select className="whichDay">
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                            <h3 className="planHeader">Plan:</h3>
                            <select className="plan">
                                {day.map((days) => (
                                    <option value={days.day}>{days.day}</option>
                                ))}
                            </select><br />
                            <a href="/week">Back</a>
                            <button type="submit" className="newPlanButton" title="Update">Add Plan</button>
                        </form>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default NewPlan;