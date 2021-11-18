const router = require("express").Router();
const Workout = require("../models/workout.js");
const mongoose = require('mongoose');

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)

        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        {
            $push: {exercises: req.body}
        },
        {
            new: true
        }
    )
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
        Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate(
        [{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }]
    )
        .sort({ date: -1 }).limit(7)
        //need a limit structured the same as sort
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
module.exports = router;