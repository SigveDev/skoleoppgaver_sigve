const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const userRoute = require('./routes/setUser');
const productRoute = require('./routes/setProducts');
const cartRoute = require('./routes/setCart');
const orderRoute = require('./routes/setOrder');

//setter opp for bruk av .env filen
dotenv.config();
//setter opp for bruk av json
app.use(express.json());

//kobler til mongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ram-it"
    })
    .then(console.log("Connectet to mongoDB"))
    .catch((err) => console.log(err));

//setter opp for bruk av cors og hvilet domene som kan bruke serveren
app.use(
    cors({
        origin: "https://ramit.sigve.dev",
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Image uploaded successfully', file: req.file.filename });
});

app.get("/uploads/:filename", (req, res) => {
    if (req.params.filename) {
        const filePath = __dirname + "/uploads/" + req.params.filename;
        res.sendFile(filePath);
    } else {
        res.status(404).send("File not found");
    }
});

app.get("/auth", (req, res) => {
    try {
        const header = req.headers["authorization"];
        const authData = jwt.verify(header, process.env.JWT_SECRET);

        if(authData) {
            res.status(200).json(authData);
        } else {
            res.status(401).json("Not authorized!");
        }
    } catch (err) {
        res.status(401).json("Not authorized!");
    }
})

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

//starter serveren
app.listen("25581", ()=>{
    console.log("Server is running on port 25581!");
})