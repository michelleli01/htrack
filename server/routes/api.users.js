const express = require("express");
const router = express.Router();
const Habit = require("../models/habit");

router.get("/users/:userId/habits", (req, res, next) => {
    Habit.find({ user_id: req.params.userId })
        .then((habits) => {
            return res.status(200).json({
                message: "Successfully retrieved habits",
                habits,
            });
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(400).json({
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
                return res.status(400).json({
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
                    days: 0,
                    percent_sucess: 0,
                });

                newHabit
                    .save()
                    .then((habit) => {
                        return res.status(200).json({
                            success: true,
                            message: "Habit successfully created",
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                        return res.status(400).json({
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
            return res.status(200).json({
                message: `Succesfully retrieved ${habit.name} habit`,
                habit,
            });
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(400).json({
                message: "Unable to retrieve habit at this time",
            });
        });
});

router.delete("/users/:userId/habits/:habitId", (req, res, next) => {
    Habit.deleteOne({ user_id: req.params.userId, _id: req.params.habitId })
        .then((habit) => {
            return res.status(200).json({
                message: `${req.params.habitId} removed`,
            });
        })
        .catch((err) => {
            console.error(err.message);
            return res.status(400).json({
                message: "Unable to remove habit at this time",
            });
        });
});

router.put("/users/:userId/habits/:habitId", (req, res, next) => {
    const {
        name,
        frequency,
        description,
        days,
        percent_success,
        completed_times,
    } = req.body;

    Habit.findOne({ name: name }).then((habit) => {
        if (habit && habit.name !== name) {
            return res.status(400).json({
                message: "Habit with that name already exists",
            });
        }
    });

    if (name) {
        if (name.trim() !== "") {
            Habit.updateOne(
                {
                    user_id: req.params.userId,
                    _id: req.params.habitId,
                },
                { name: name }
            )
                .then((habit) => {
                    return res.status(200).json({
                        message: "Habit successfully updated",
                        habit,
                    });
                })
                .catch((err) => {
                    return res
                        .status(400)
                        .json({ message: "Unable to update habit" });
                });
        }
    }

    if (frequency) {
        Habit.updateOne(
            {
                user_id: req.params.userId,
                _id: req.params.habitId,
            },
            { frequency: frequency }
        )
            .then((habit) => {
                return res.status(200).json({
                    message: "Habit successfully updated",
                    habit,
                });
            })
            .catch((err) => {
                return res
                    .status(400)
                    .json({ message: "Unable to update habit" });
            });
    }

    if (description) {
        if (description.trim() !== "") {
            Habit.updateOne(
                { user_id: req.params.userId, _id: req.params.habitId },
                {
                    description: description,
                }
            )
                .then((habit) => {
                    return res.status(200).json({
                        message: "Habit successfully updated",
                        habit,
                    });
                })
                .catch((err) => {
                    return res
                        .status(400)
                        .json({ message: "Unable to update habit" });
                });
        }
    }

    if (days) {
        try {
            Habit.updateOne(
                { user_id: req.params.userId, _id: req.params.habitId },
                {
                    days: days,
                }
            )
                .then((habit) => {
                    return res.status(200).json({
                        message: "Habit successfully updated",
                        habit,
                    });
                })
        } catch (err) {
            return res.status(400).json({ message: "Unable to update habit" });
        }
    }

    if (percent_success) {
        Habit.updateOne(
            { user_id: req.params.userId, _id: req.params.habitId },
            {
                percent_success: percent_success,
            }
        )
            .then((habit) => {
                return res.status(200).json({
                    message: "Habit successfully updated",
                    habit,
                });
            })
            .catch((err) => {
                return res
                    .status(400)
                    .json({ message: "Unable to update habit" });
            });
    }

    if (completed_times) {
        Habit.updateOne(
            { user_id: req.params.userId, _id: req.params.habitId },
            {
                completed_times: completed_times,
            }
        )
            .then((habit) => {
                return res.status(200).json({
                    message: "Habit successfully updated",
                    habit,
                });
            })
            .catch((err) => {
                return res
                    .status(400)
                    .json({ message: "Unable to update habit" });
            });
    }
});

module.exports = router;
