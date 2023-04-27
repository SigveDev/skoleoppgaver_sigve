const router = require('express').Router();
const Pr = require('../models/pr');

//create a user pr
router.post('/create/:id', async (req, res) => {
    try {
        const newPr = new Pr({
            googleId: req.params.id,
            bench: req.body.bench,
            deadlift: req.body.deadlift,
            squat: req.body.squat,
        });
        const pr = await newPr.save();
        res.status(200).json(pr);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a users pr
router.get('/get/:id', async (req, res) => {
    try {
        let pr = await Pr.find({ googleId: req.params.id });
        res.status(200).json(pr);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a users pr
router.put('/update/:id', async (req, res) => {
    try {
        let pr = await Pr.find({ googleId: req.params.id });

        if (pr[0].googleId === req.body.googleId) {
            try {
                if(req.body.bench !== "") {
                    let tempBench = req.body.bench.replace(/\D/g, "");
                    if(tempBench === "") {
                        newBench = "0 kg";
                    } else {
                        newBench = tempBench + " kg";
                    }
                } else {
                    newBench = pr[0].bench;
                }
                
                if(req.body.deadlift !== "") {
                    let tempDeadlift = req.body.deadlift.replace(/\D/g, "");
                    if(tempDeadlift === "") {
                        newDeadlift = "0 kg";
                    } else {
                        newDeadlift = tempDeadlift + " kg";
                    }
                } else {
                    newDeadlift = pr[0].deadlift;
                }
                
                if(req.body.squat !== "") {
                    let tempSquat = req.body.squat.replace(/\D/g, "");
                    if(tempSquat === "") {
                        newSquat = "0 kg";
                    } else {
                        newSquat = tempSquat + " kg";
                    }
                } else {
                    newSquat = pr[0].squat;
                }

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