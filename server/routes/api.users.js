const express = require("express");
const router = express.Router();
const Habit = require("../models/habit");

router.get("/users/:userId/habits", (req, res, next) => {
    Habit.find({ user_id: req.params.userId })
        .then((habits) => {
            res.status(200).send({
                message: "Successfully retrieved habits",
                habits,
            });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).send({
                message: "Unable to retrieve habits at this time",
            });
        });
});

router.post("/users/:userId/habits", (req, res, next) => {
    const { name, description, frequency, start_date } = req.body;

    if (name.trim() === "" || frequency.trim() === "" || !start_date) {
        res.status(400).json({ message: "Please enter all fields" });
    } else {
        console.log(req.body);

        Habit.findOne({ name: name }).then((habit) => {
            if (habit) {
                res.status(400).send({
                    success: false,
                    message: "Habit already exists",
                });
            } else {
                const newHabit = new Habit({
                    user_id: req.params.userId,
                    name: name,
                    frequency: frequency,
                    description: description,
                    start_date: start_date,
                    completed_times: 0,
                    num_dates: 0,
                    percent_sucess: 0
                });

                newHabit
                    .save()
                    .then((habit) => {
                        res.status(200).send({
                            success: true,
                            message: "Habit successfully created",
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                        res.status(400).send({
                            success: false,
                            message: "Unable to create habit at this time",
                        });
                    });
            }
        });
    }
});

router.get("/users/:userId/habits/:habitId", (req, res, next) => {
    Habit.findOne({ user_id: req.params.userId, _id: req.params.habitId })
        .then((habit) => {
            res.status(200).send({
                message: `Succesfully retrieved ${habit.name} habit`,
                habit,
            });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).send({
                message: "Unable to retrieve habit at this time",
            });
        });
});

router.delete("/users/:userId/habits/:habitId", (req, res, next) => {
    Habit.deleteOne({ user_id: req.params.userId, _id: req.params.habitId })
        .then((habit) => {
            res.status(200).send({
                message: `${req.params.habitId} removed`,
            });
        })
        .catch((err) => {
            console.error(err.message);
            res.status(400).send({
                message: "Unable to remove habit at this time",
            });
        });
});

router.put("/users/:userId/habits/:habitId", (req, res, next) => {
    const { name, frequency, description, num_dates, percent_sucess, completed_times } = req.body;
    
    Habit.findOne({ name: name }).then((habit) => {
        if (habit && habit.name !== name)
            res.status(400).send({
                message: "Habit with that name already exists",
            });
    });

    Habit.updateOne(
        { user_id: req.params.userId, _id: req.params.habitId },
        { name: name, frequency: frequency, description: description }
    )
        .then((habit) => {
            res.status(200).send({
                message: "Habit successfully updated",
                habit,
            });
        })
        .catch((err) => {
            res.status(400).send({ message: "Unable to update habit" });
        });
});

module.exports = router;
