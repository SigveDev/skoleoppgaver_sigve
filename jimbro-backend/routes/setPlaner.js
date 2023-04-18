const router = require('express').Router();
const Plan = require('../models/planer');

//create a plan
router.post('/create/:id', async (req, res) => {
    try {
        let tempDays = [];

        for (let i = 0; i < req.body.days.Length; i++) {
            tempDays.push({
                day: req.body.days[i].day,
                exercises: req.body.days[i].exercises,
            });
        }

        const newPr = new Plan({
            googleId: req.params.id,
            days: tempDays,
        });
        const day = await newPr.save();
        res.status(200).json(day);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get plans
router.get('/get/:id', async (req, res) => {
    try {
        let day = await Plan.find({ googleId: req.params.id });
        res.status(200).json(day);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a users plans
router.put('/update/:id', async (req, res) => {
    try {
        let plan = await Plan.find({ googleId: req.params.id });

        if (plan[0].googleId === req.body.googleId) {
            try {
                const updatePlan = await Plan.findOneAndUpdate({ googleId: req.params.id }, {
                    days: req.body.days,
                }, { new: true });
                res.status(200).json(updatePlan);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You can only update your own plans");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;