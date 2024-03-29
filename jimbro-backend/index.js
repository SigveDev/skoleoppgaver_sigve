const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport')
const cors = require('cors');
const authRoute = require("./routes/auth");
const prRoute = require("./routes/setPr");
const planRoute = require("./routes/setPlaner");
const thisWeek = require("./routes/setWeek");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//setter opp for bruk av .env filen
dotenv.config();
//setter opp for bruk av json
app.use(express.json());

//kobler til mongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "jimbro"
    })
    .then(console.log("Connectet to mongoDB"))
    .catch((err) => console.log(err));

//setter opp for bruk av cookies
app.use(cookieSession(
    {
        name:"user-data",
        keys:["jimbro"],
        maxAge: 24 * 60 * 60 * 1000 //24 timer
    }
))

app.use(passport.initialize());
app.use(passport.session());

//setter opp for bruk av cors og hvilet domene som kan bruke serveren
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
);

//setter opp for bruk av routes
app.use("/auth", authRoute);
app.use("/pr", prRoute);
app.use("/plan", planRoute);
app.use("/week", thisWeek);

//starter serveren
app.listen("5000", ()=>{
    console.log("Server is running on port 5000!");
})