const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport')
const cors = require('cors');
const authRoute = require("./routes/auth");
const prRoute = require("./routes/setPr");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "jimbro"
    })
    .then(console.log("Connectet to mongoDB"))
    .catch((err) => console.log(err));

app.use(cookieSession(
    {
        name:"session",
        keys:["jimbro"],
        maxAge: 7 * 24 * 60 * 60 * 100
    }
))

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "https://jimbro.fyi",
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
);

app.use("/auth", authRoute);
app.use("/pr", prRoute);

app.listen("25568", ()=>{
    console.log("Server is running on port 25568!");
})