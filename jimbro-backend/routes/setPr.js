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
                newBench = req.body.bench;
                if(typeof newBench !== "number") {
                    newBench = pr[0].bench;
                }
                
                newDeadlift = req.body.deadlift;
                if(typeof req.body.deadlift !== "number") {
                    newDeadlift = pr[0].deadlift;
                }
                
                newSquat = req.body.squat;
                if(typeof req.body.squat !== "number") {
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