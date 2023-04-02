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
                if(req.body.bench === "") {
                    newBench = pr[0].bench;
                } else {
                    newBench = req.body.bench + "kg";
                }
        
                if(req.body.deadlift === "") {
                    newDeadlift = pr[0].deadlift;
                } else {
                    newDeadlift = req.body.deadlift + "kg";
                }
        
                if(req.body.squat === "") {
                    newSquat = pr[0].squat;
                } else {
                    newSquat = req.body.squat + "kg";
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