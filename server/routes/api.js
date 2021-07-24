const express = require("express");
const router = express.Router();
const Habit = require("../models/habit");

router.post("/create-habit", (req, res, next) => {
    const { user_id, name, description, frequency, start_date } = req.body;
    console.log(req.body);
    if (!user_id) {
        res.json({ success: false, message: "User not signed in" });
    }

    if (!name || !frequency || !start_date) {
        res.json({ success: false, message: "Please enter all fields" });
    } else {
        Habit.findOne({ name: name }).then((habit) => {
            if (habit) {
                res.json({ success: false, message: "Habit already exists" });
            } else {
                const newHabit = new Habit({
                    user_id: user_id,
                    name: name,
                    frequency: frequency,
                    description: description,
                    start_date: start_date,
                });

                newHabit
                    .save()
                    .then((habit) => {
                        res.status(200).json({
                            success: true,
                            message: "Habit successfully created",
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                        res.status(400).json({
                            success: false,
                            message: "Unable to create habit at this time",
                        });
                    });
            }
        });
    }
});

router.post("/get-habits", (req, res, next) => {
    const { user_id } = req.body;
    if (!user_id) {
        res.status(400).json({ message: "User not signed in" });
    }

    Habit.find({ user_id: user_id })
        .then((habits) => {
            console.log(habits);
            res.status(200).json({
                message: "Successfully retrieved habits",
            });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).json({
                message: "Unable to retrieve habits at this time",
            });
        });
});

router.post("/get-specific-habit", (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: "Must provide name of habit to get" });
    }

    Habit.findOne({ name: name })
        .then((habit) => {
            res.status(200).json({
                message: `Succesfully retreived ${name}`,
                habit,
            });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).json({
                message: "Unable to retrieve habit at this time",
            });
        });
});

router.delete("delete-specific-habit", (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json("Must provide name of habit to delete");
    }

    Habit.remove({ name: name })
        .then((habit) => {
            res.status(200).json({ message: `${name} removed` });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Unable to remove habit at this time",
            });
        });
});

router.post("/update-habit-frequency", (req, res, next) => {
    const { name, frequency } = req.body;

    if (!name) {
        res.status(400).json({
            message: "Must provide name of habit to update",
        });
    }

    Habit.updateOne({ name: name }, { frequency: frequency })
        .then((habit) => {
            res.status(200).json({
                message: "Habit successfully updated",
                habit
            });
        })
        .catch((err) => {
            res.status(400).json({ message: "Unable to update habit" });
        });
});

module.exports = router;
