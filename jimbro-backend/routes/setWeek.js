const router = require('express').Router();
const Week = require('../models/thisWeek');

//create a week
router.post('/new/:name', async (req, res) => {
    try {
        let weeks = await Week.find();
        for(let i = 0; i < weeks.length; i++) {
            if(weeks[i].weekName === req.params.name) {
                res.status(401).json("Week name taken");
                return;
            }
        }

        const newWeek = new Week({
            weekName: req.params.name,
            access: { uid: req.body.uid },
        });
        const week = await newWeek.save();
        res.status(200).json(week);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get week by name
router.get('/get/:name', async (req, res) => {
    try {
        let week = await Week.find({ weekName: req.params.name });
        res.status(200).json(week);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a day from a week
router.get('/get/:name/:day', async (req, res) => {
    try {
        let week = await Week.find({ weekName: req.params.name });
        let day = week[0][req.params.day];
        res.status(200).json(day);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a week
router.put('/update/:name', async (req, res) => {
    try {
        let week = await Week.find({ weekName: req.params.name });

        let monday = [];
        let tuesday = [];
        let wednesday = [];
        let thursday = [];
        let friday = [];
        let saturday = [];
        let sunday = [];

        if(week.monday === req.body.monday) {
            monday = week.monday;
        } else {
            monday = req.body.monday;
        }

        if(week.tuesday === req.body.tuesday) {
            tuesday = week.tuesday;
        } else {
            tuesday = req.body.tuesday;
        }
        
        if(week.wednesday === req.body.wednesday) {
            wednesday = week.wednesday;
        } else {
            wednesday = req.body.wednesday;
        }
        
        if(week.thursday === req.body.thursday) {
            thursday = week.thursday;
        } else {
            thursday = req.body.thursday;
        }

        if(week.friday === req.body.friday) {
            friday = week.friday;
        } else {
            friday = req.body.friday;
        }

        if(week.saturday === req.body.saturday) {
            saturday = week.saturday;
        } else {
            saturday = req.body.saturday;
        }

        if(week.sunday === req.body.sunday) {
            sunday = week.sunday;
        } else {
            sunday = req.body.sunday;
        }

        const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
        }, { new: true });
        res.status(200).json(updateWeek);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a week
router.put('/remove/:name/:day/:id', async (req, res) => {
    try {
        if(req.params.day === "monday") {
            let week = await Week.find({ weekName: req.params.name });
            let tempMonday = [];
            for(let i = 0; i < week[0].monday.length; i++) {
                if(week[0].monday[i].ownerId !== req.params.id) {
                    tempMonday.push(week[0].monday[i]);
                }
            }
            try{
                const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
                    monday: tempMonday,
                }, { new: true });
                res.status(200).json(updateWeek);
            } catch (err) {
                res.status(500).json(err);
            }
        } else if(req.params.day === "tuesday") {
            let week = await Week.find({ weekName: req.params.name });
            let tempTuesday = [];
            for(let i = 0; i < week[0].tuesday.length; i++) {
                if(week[0].tuesday[i].ownerId !== req.params.id) {
                    tempTuesday.push(week[0].tuesday[i]);
                }
            }
            try{
                const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
                    tuesday: tempTuesday,
                }, { new: true });
                res.status(200).json(updateWeek);
            } catch (err) {
                res.status(500).json(err);
            }
        } else if(req.params.day === "wednesday") {
            let week = await Week.find({ weekName: req.params.name });
            let tempWednesday = [];
            for(let i = 0; i < week[0].wednesday.length; i++) {
                if(week[0].wednesday[i].ownerId !== req.params.id) {
                    tempWednesday.push(week[0].wednesday[i]);
                }
            }
            try{
                const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
                    wednesday: tempWednesday,
                }, { new: true });
                res.status(200).json(updateWeek);
            } catch (err) {
                res.status(500).json(err);
            }
        } else if(req.params.day === "thursday") {
            let week = await Week.find({ weekName: req.params.name });
            let tempThursday = [];
            for(let i = 0; i < week[0].thursday.length; i++) {
                if(week[0].thursday[i].ownerId !== req.params.id) {
                    tempThursday.push(week[0].thursday[i]);
                }
            }
            try{
                const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
                    thursday: tempThursday,
                }, { new: true });
                res.status(200).json(updateWeek);
            } catch (err) {
                res.status(500).json(err);
            }
        } else if(req.params.day === "friday") {
            let week = await Week.find({ weekName: req.params.name });
            let tempFriday = [];
            for(let i = 0; i < week[0].friday.length; i++) {
                if(week[0].friday[i].ownerId !== req.params.id) {
                    tempFriday.push(week[0].friday[i]);
                }
            }
            try{
                const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
                    friday: tempFriday,
                }, { new: true });
                res.status(200).json(updateWeek);
            } catch (err) {
                res.status(500).json(err);
            }
        } else if(req.params.day === "saturday") {
            let week = await Week.find({ weekName: req.params.name });
            let tempSaturday = [];
            for(let i = 0; i < week[0].saturday.length; i++) {
                if(week[0].saturday[i].ownerId !== req.params.id) {
                    tempSaturday.push(week[0].saturday[i]);
                }
            }
            try{
                const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
                    saturday: tempSaturday,
                }, { new: true });
                res.status(200).json(updateWeek);
            } catch (err) {
                res.status(500).json(err);
            }
        } else if(req.params.day === "sunday") {
            let week = await Week.find({ weekName: req.params.name });
            let tempSunday = [];
            for(let i = 0; i < week[0].sunday.length; i++) {
                if(week[0].sunday[i].ownerId !== req.params.id) {
                    tempSunday.push(week[0].sunday[i]);
                }
            }
            try{
                const updateWeek = await Week.findOneAndUpdate({ weekName: req.params.name }, {
                    sunday: tempSunday,
                }, { new: true });
                res.status(200).json(updateWeek);
            } catch (err) {
                res.status(500).json(err);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;