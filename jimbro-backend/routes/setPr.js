const router = require('express').Router();
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const Pr = require('../models/pr');

//lar deg bruke .env filen
dotenv.config();

//create a user pr
router.post('/create/:id', async (req, res) => {
    try {
        //lager en ny pr for brukeren
        const newPr = new Pr({
            googleId: req.params.id,
            bench: req.body.bench,
            deadlift: req.body.deadlift,
            squat: req.body.squat,
        });
        //lagrer pr i databasen
        const pr = await newPr.save();
        res.status(200).json(pr);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a users pr
router.get('/get/:id', async (req, res) => {
    try {
        //henter pr fra databasen
        let pr = await Pr.find({ googleId: req.params.id });
        //dekrypterer pr og sender den tilbake til klienten
        let uncryptedPr = [{
            __id: pr[0]._id,
            googleId: pr[0].googleId,
            bench: CryptoJS.AES.decrypt(pr[0].bench, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
            deadlift: CryptoJS.AES.decrypt(pr[0].deadlift, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
            squat: CryptoJS.AES.decrypt(pr[0].squat, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
            createdAt: pr[0].createdAt,
            updatedAt: pr[0].updatedAt,
        }];
        res.status(200).json(uncryptedPr);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a users pr
router.put('/update/:id', async (req, res) => {
    try {
        //henter pr fra databasen
        let pr = await Pr.find({ googleId: req.params.id });

        //sjekker om url id og googleId er like
        if (pr[0].googleId === req.body.googleId) {
            try {
                //sjekker om et felt er tomt
                if(req.body.bench !== "") {
                    //fjenrer alle bokstaver fra stringen og legger til kg
                    //ekempel: Skole123 -> 123 kg
                    let tempBench = req.body.bench.replace(/\D/g, "") + " kg";
                    if(tempBench === "") {
                        //hvis stringen er tom, settes den til empty
                        newBench = "empty";
                    } else {
                        //krypterer stringen
                        newBench = CryptoJS.AES.encrypt(tempBench, process.env.SECRET_KEY).toString();
                    }
                } else {
                    newBench = pr[0].bench;
                }
                
                //sjekker om et felt er tomt
                if(req.body.deadlift !== "") {
                    //fjenrer alle bokstaver fra stringen og legger til kg
                    //ekempel: Skole123 -> 123 kg
                    let tempDeadlift = req.body.deadlift.replace(/\D/g, "") + " kg";
                    if(tempDeadlift === "") {
                        //hvis stringen er tom, settes den til empty
                        newDeadlift = "empty";
                    } else {
                        //krypterer stringen
                        newDeadlift = CryptoJS.AES.encrypt(tempDeadlift, process.env.SECRET_KEY).toString();
                    }
                } else {
                    newDeadlift = pr[0].deadlift;
                }
                
                //sjekker om et felt er tomt
                if(req.body.squat !== "") {
                    //fjenrer alle bokstaver fra stringen og legger til kg
                    //ekempel: Skole123 -> 123 kg
                    let tempSquat = req.body.squat.replace(/\D/g, "") + " kg";
                    if(tempSquat === "") {
                        //hvis stringen er tom, settes den til empty
                        newSquat = "empty";
                    } else {
                        //krypterer stringen
                        newSquat = CryptoJS.AES.encrypt(tempSquat, process.env.SECRET_KEY).toString();
                    }
                } else {
                    newSquat = pr[0].squat;
                }

                //oppdaterer pr i databasen og sender den tilbake til klienten
                const updatePr = await Pr.findOneAndUpdate({ googleId: req.params.id }, {
                    bench: newBench,
                    deadlift: newDeadlift,
                    squat: newSquat,
                }, { new: true });
                res.status(200).json(updatePr);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You can only update your own pr");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;