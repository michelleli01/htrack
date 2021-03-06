const express = require("express");
const router = express.Router();
const Habit = require("../models/habit");

// get all user's habits
router.get("/users/:userId/habits", (req, res, next) => {
    Habit.find({ user_id: req.params.userId })
        .then((habits) => {
            res.status(200).json({
                message: "Successfully retrieved habits",
                habits,
            });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).json({
                message: "Unable to retrieve habits at this time",
            });
        });
});

// create new habit
router.post("/users/:userId/habits", (req, res, next) => {
    const { name, description, frequency, start_date, color } = req.body;
    console.log(req.body);
    if (name.trim() === "" || !frequency || !start_date) {
        res.status(400).json({ message: "Please enter all fields" });
    } else {
        Habit.findOne({ user_id: req.params.userId, name: name }).then(
            (habit) => {
                if (habit) {
                    res.status(400).json({
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
                        color: color,
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
            }
        );
    }
});

// get specific habit
router.get("/users/:userId/habits/:habitId", (req, res, next) => {
    Habit.findOne({ user_id: req.params.userId, _id: req.params.habitId })
        .then((habit) => {
            res.status(200).json({
                message: `Succesfully retrieved ${habit.name} habit`,
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

//delete specific habit
router.delete("/users/:userId/habits/:habitId", (req, res, next) => {
    Habit.deleteOne({ user_id: req.params.userId, _id: req.params.habitId })
        .then((habit) => {
            res.status(200).json({
                message: `${req.params.habitId} removed`,
            });
        })
        .catch((err) => {
            console.error(err.message);
            res.status(400).json({
                message: "Unable to remove habit at this time",
            });
        });
});

// update specific habit
router.put("/users/:userId/habits/:habitId/", (req, res, next) => {
    const { name, frequency, description, color } = req.body;

    const newHabit = {};

    if (name && name.trim() !== "") {
        Habit.findOne({ user_id: req.params.userId, name: name }).then(
            (habit) => {
                if (habit && habit.name !== name) {
                    return res
                        .status(400)
                        .json({
                            message: "Habit with that name already exists",
                        });
                }
            }
        );

        newHabit["name"] = name;
    }

    if (frequency) {
        newHabit["frequency"] = frequency;
    }

    if (description && description.trim() !== "") {
        newHabit["description"] = description;
    }

    if (color) {
        newHabit["color"] = color;
    }

    console.log(newHabit);

    Habit.updateOne(
        { user_id: req.params.userId, _id: req.params.habitId },
        newHabit
    )
        .then(() => {
            return res
                .status(200)
                .json({ message: "Habit updated successfully" });
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ message: "Unable to update habit at this time" });
        });
});

module.exports = router;
