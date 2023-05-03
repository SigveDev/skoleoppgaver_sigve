import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import BackButton from '../components/backButton';

const NewPlan = ({user}) => {
    const [day, setDay] = useState(null);
    const [week, setWeek] = useState(null);

    const hours = 24;
    const minutes = ["00", "15", "30", "45"];

    useEffect(() => {
        const getDay = async () => {
            const res = await axios.get("https://api.jimbro.fyi/plan/get/" + user.id, { withCredentials: true });
            setDay(res.data[0].days);
        };
        getDay();

        const getWeek = async () => {
            const res = await axios.get("https://api.jimbro.fyi/week/get/public", { withCredentials: true });
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
        const where = document.querySelector(".where").value;
        const howMany = document.querySelector(".howMany").value;

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
                ownerPfp: user.photos[0].value,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan,
                place: where,
                amount: howMany
            });
        } else if(whichDay === "tuesday") {
            newTuesday.push({
                ownerId: user.id,
                ownerPfp: user.photos[0].value,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan,
                place: where,
                amount: howMany
            });
        } else if(whichDay === "wednesday") {
            newWednesday.push({
                ownerId: user.id,
                ownerPfp: user.photos[0].value,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan,
                place: where,
                amount: howMany
            });
        } else if(whichDay === "thursday") {
            newThursday.push({
                ownerId: user.id,
                ownerPfp: user.photos[0].value,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan,
                place: where,
                amount: howMany
            });
        } else if(whichDay === "friday") {
            newFriday.push({
                ownerId: user.id,
                ownerPfp: user.photos[0].value,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan,
                place: where,
                amount: howMany
            });
        } else if(whichDay === "saturday") {
            newSaturday.push({
                ownerId: user.id,
                ownerPfp: user.photos[0].value,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan,
                place: where,
                amount: howMany
            });
        } else if(whichDay === "sunday") {
            newSunday.push({
                ownerId: user.id,
                ownerPfp: user.photos[0].value,
                user: user.displayName,
                time: hour + ":" + minute,
                plan: plan,
                place: where,
                amount: howMany
            });
        }

        try {
            const res = await axios.put("https://api.jimbro.fyi/week/update/public", {
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
        window.location.href = "/";
    }

    return (
        <div className="planSite">
            <div className="content">
                <BackButton whereTo="/" />
                <div className="planSiteCreate">
                    {day === null ? <h1 className="noPlan">Loading...</h1> : 
                    <form className="planForm" onSubmit={postNewPlan}>
                        <h3 className="dayLabel">Day:</h3>
                        <select className="whichDay">
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>
                        <h3 className="timeLabel">Time:</h3>
                        <select className="hour">
                            {Array.from(Array(hours).keys()).map((hour, index) => (
                                <option value={hour} key={index}>{hour}</option>
                            ))}
                        </select>
                        <span className="spacerTime">:</span>
                        <select className="minute">
                            {minutes.map((minute, index) => (
                                <option value={minute} key={index}>{minute}</option>
                            ))}
                        </select>
                        <h3 className="whereLabel">Where:</h3>
                        <input type="text" className="where" placeholder="Where?" />
                        <h3 className="planLabel">Plan:</h3>
                        <select className="plan">
                            {day.map((days, index) => (
                                <option value={days.day} key={index}>{days.day}</option>
                            ))}
                        </select>
                        <h3 className="howManyLabel">How many:</h3>
                        <input type="number" className="howMany" placeholder="How many is going?" /><br />
                        <button type="submit" className="createPlanButton">Create</button>
                    </form>
                    }
                </div>
                <NavBar id="home" />
            </div>
        </div>
    );
}

export default NewPlan;