import '../App.css';
import background from "../img/background-gray.png";
import axios from 'axios';
import { useEffect, useState } from 'react';

const DaySite = ({user}) => {
    const [day, setDay] = useState(null);
    let dayCount = 0;
    let exerciseCount = 0;

    useEffect(() => {
        const getDay = async () => {
            const res = await axios.get("https://api.jimbro.fyi/plan/get/" + user.id, { withCredentials: true });
            setDay(res.data[0]);
        };
        getDay();
    }, []);

    const updateDays = async (e) => {
        e.preventDefault();

        console.log("day count: " + dayCount);
        console.log("exercise count: " + exerciseCount);

        let days = [];
        for (let i = 1; i <= dayCount; i++) {
            let exercises = [];
            console.log("day" + i + ": " + eval("day" + i + "Exercise"));
            if(document.getElementById("day" + i) === null || document.getElementById("day" + i).value === "") {
                console.log("day" + i + " is null");
                continue;
            }
            for (let j = 1; j <= eval("day" + i + "Exercise"); j++) {
                if (document.getElementById("exercise" + i + j) === null || document.getElementById("exercise" + i + j).value === "") {
                    console.log("exercise" + i + j + " is null");
                    continue;
                } else {
                    exercises.push({
                        exercise: document.getElementById("exercise" + i + j).value
                    });
                }
            }
            days.push({
                day: document.getElementById("day" + i).value,
                exercises: exercises
            });
        }

        try {
            const res = await axios.put("https://api.jimbro.fyi/plan/update/" + user.id, {
                googleId: user.id,
                days: days
            }, { withCredentials: true });
        } catch (err) {console.log(err)}
        window.open("/", "_self");
    }

    const moreDays = (myDayCount) => {
        document.getElementById("formContent").insertAdjacentHTML('beforeend', `
            <div id="dayDiv${dayCount + 1}" class="formPortion">
                <label for="day${dayCount + 1}" id="dayLabel"${dayCount + 1}">Day:</label><br />
                <input type="text" class="name" id="day${dayCount + 1}" name="day${dayCount + 1}" placeholder="Name of the new day" defaultValue="" maxlength="10" />
                <button type="button" class="addExercise" id="moreExerciseButton${dayCount + 1}" title="Add New Exercise"><ion-icon name="add-circle-outline" size="large"></ion-icon></button>
                <button type="button" id="delete${dayCount + 1}" class="deleteButton" title="Delete Day"><ion-icon name="trash-outline" size="large"></ion-icon></button>
                <br /><br />
            </div>
        `);

        document.getElementById("dayDiv" + (myDayCount + 1)).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

        console.log(myDayCount + 1);
        document.getElementById("delete" + (dayCount + 1)).addEventListener("click", () => deleteDay("dayDiv" + (myDayCount + 1)));
        document.getElementById("moreExerciseButton" + (dayCount + 1)).addEventListener("click", () => moreExercise("dayDiv" + (myDayCount + 1)));
        eval("globalThis.day" + (myDayCount + 1) + "Exercise" + " = " + "0");
        dayCount++;
    }

    const moreExercise = (id) => {
        let myDayCount = id.split("Div");
        eval(myDayCount[0] + myDayCount[1] + "Exercise" + "++");
        document.getElementById(id).insertAdjacentHTML('beforeend',`
            <div id="${"exerciseDiv" + dayCount + eval("day" + dayCount + "Exercise")}">
                <label for="exercise${exerciseCount + 1}">Exercise:</label><br />
                <input type="text" class="subname" id="exercise${myDayCount[1]}${eval(myDayCount[0] + myDayCount[1] + "Exercise")}" name="exercise${exerciseCount + 1}" placeholder="Name of the exercise" defaultValue="" />
                <button type="button" id="delete${dayCount}${eval("day" + dayCount + "Exercise")}" class="deleteButton" title="Delete Exercise"><ion-icon name="trash-outline" size="large"></ion-icon></button>
            </div>
        `);

        console.log(myDayCount[1]);
        document.getElementById("delete" + dayCount + eval("day" + dayCount + "Exercise")).addEventListener("click", () => deleteExercise("exerciseDiv" + myDayCount[1] + eval("day" + dayCount + "Exercise"), myDayCount[1]));
        exerciseCount++;
    }

    const deleteDay = (id) => {
        document.getElementById(id).remove();
        let myDayCount = id.split("Div");
        exerciseCount -= eval(myDayCount[0] + myDayCount[1] + "Exercise");
        eval(myDayCount[0] + myDayCount[1] + "Exercise" + " = " + "0");
    }

    const deleteExercise = (id, name) => {
        console.log("which day is this taken from: " + name);
        document.getElementById(id).remove();
        eval("day" + name + "Exercise" + "--");
        exerciseCount--;
    }

    return (
        <div className="daySite">
            <div className="dayMain">
                <a href="/" className="dayBack">
                    <ion-icon name="close-outline" size="large"></ion-icon>
                </a>
                <button className="newDay" onClick={() => moreDays(dayCount)} title="Add New Day">
                    <ion-icon name="add-circle-outline" size="large"></ion-icon>
                </button>
                <h1>Edit Days</h1>
                <br />
                {day === null ? <h2>Loading...</h2> : 
                <form id="updateForm" method="GET" onSubmit={updateDays}>
                    <div id="formContent">
                    {day.days.map((days) => {
                        dayCount++;
                        let ownDayCount = dayCount;
                        eval("globalThis.day" + dayCount + "Exercise" + " = " + "0");
                        return (
                            <div id={"dayDiv" + dayCount} className="formPortion">
                                <label htmlFor={"day" + dayCount} id={"dayLabel" + dayCount}>Day:</label><br />
                                <input type="text" className="name" id={"day" + dayCount} name={"day" + dayCount} placeholder="eks. Push" defaultValue={days.day} maxlength="10" />
                                <button type="button" className="addExercise" onClick={() => moreExercise("dayDiv" + ownDayCount)} title="Add New Exercise"><ion-icon name="add-circle-outline" size="large"></ion-icon></button>
                                {days !== day.days[0] ? <button type="button" id={"delete" + dayCount} className="deleteButton" onClick={() => deleteDay("dayDiv" + ownDayCount)} title="Delete Day"><ion-icon name="trash-outline" size="large"></ion-icon></button> : <br />}
                                <br />
                                {days.exercises.map((exercises) => {
                                    eval("day" + ownDayCount + "Exercise" + "++");
                                    exerciseCount++;
                                    return (
                                        <div id={"exerciseDiv" + dayCount + eval("day" + dayCount + "Exercise")}>
                                            <label htmlFor={"exercise" + exerciseCount}>Exercise:</label><br />
                                            <input type="text" className="subname" id={"exercise" + dayCount + eval("day" + dayCount + "Exercise")} name={"exercise" + exerciseCount} placeholder="eks. Deadlift 4x8" defaultValue={exercises.exercise} />
                                            {days === day.days[0] && exercises === days.exercises[0] ? <br /> : <button type="button" id={"delete" + dayCount + eval("day" + dayCount + "Exercise")} className="deleteButton" onClick={() => deleteExercise("exerciseDiv" + ownDayCount + eval("day" + ownDayCount + "Exercise"), ownDayCount)} title="Delete Exercise"><ion-icon name="trash-outline" size="large"></ion-icon></button>}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                    </div>
                    <button type="submit" className="updateButton" title="Update">Update Days</button>
                </form>
                }
            </div>
            <img src={background} className="backgroundImage" alt="background" />
        </div>
    );
}

export default DaySite;