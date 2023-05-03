import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import BackButton from '../components/backButton';

const NewPlan = ({user}) => {
    const [day, setDay] = useState(null);

    //setter opp en liste med alle timene og minuttene man kan velge mellom
    const hours = 24;
    const minutes = ["00", "15", "30", "45"];

    useEffect(() => {
        //Får en brukers planer med axios og setter den i state
        const getDay = async () => {
            const res = await axios.get("http://localhost:5000/plan/get/" + user.id, { withCredentials: true });
            setDay(res.data[0].days);
        };
        getDay();
    }, []);

    //henter all dataen fra inputfeltene og sender det til backenden
    const postNewPlan = async (e) => {
        // e.preventDefault(); forhinder at siden refresher seg når man trykker på submit
        e.preventDefault();

        //henter all dataen fra inputfeltene
        const hour = document.querySelector(".hour").value;
        const minute = document.querySelector(".minute").value;
        const whichDay = document.querySelector(".whichDay").value;
        const plan = document.querySelector(".plan").value;
        const where = document.querySelector(".where").value;
        const howMany = document.querySelector(".howMany").value;

        //henter alle planene som allerede er lagt ut
        const res = await axios.get("http://localhost:5000/week/get/public", { withCredentials: true });

        //setter alle planene inn i variabler
        const newMonday = res.data[0].monday;
        const newTuesday = res.data[0].tuesday;
        const newWednesday = res.data[0].wednesday;
        const newThursday = res.data[0].thursday;
        const newFriday = res.data[0].friday;
        const newSaturday = res.data[0].saturday;
        const newSunday = res.data[0].sunday;

        //sjekker hvilken dag som er valgt og legger til planen i riktig array
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

        //sender alle planene til backenden
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
        //sender brukeren tilbake til forsiden
        window.location.href = "/";
    }

    return (
        <div className="planSite">
            <div className="content">
                <BackButton whereTo="/" />
                <div className="planSiteCreate">
                    {/*Sjekker om den her fått dataen fra backenden før den viser content*/}
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
                            {/*kjører gjennom 24 ganger og setter det som et alternativ*/}
                            {Array.from(Array(hours).keys()).map((hour, index) => (
                                <option value={hour} key={index}>{hour}</option>
                            ))}
                        </select>
                        <span className="spacerTime">:</span>
                        <select className="minute">
                            {/*kjører gjennom minutes arrayen og setter det som alternativer*/}
                            {minutes.map((minute, index) => (
                                <option value={minute} key={index}>{minute}</option>
                            ))}
                        </select>
                        <h3 className="whereLabel">Where:</h3>
                        <input type="text" className="where" placeholder="Where?" />
                        <h3 className="planLabel">Plan:</h3>
                        <select className="plan">
                            {/*kjører gjennom plan arrayen og setter det som alternativer*/}
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