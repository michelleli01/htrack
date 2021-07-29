const express = require("express");
const router = express.Router();
const Status = require("../models/habit");

// get specific status
router.get("/users/:userId/habits/:habitId", (req, res, next) => {
    Status.findOne({ user_id: req.params.userId, habit_id: req.params.habitId })
        .then((statuses) => {
            res.status(200).json({ statuses });
        })
        .catch((err) => {
            res.status(500).json({ message: "Unable to get statuses" });
        });
});

// get status of habits on specific date
router.get("/users/:userId/date/:date", (req, res, next) => {
    Status.find({ user_id: req.params.userId, date: req.params.date })
        .then((statuses) => {
            res.status(200).json({ statuses });
        })
        .catch((err) => {
            res.status(500).json({ message: "Unable to get statuses" });
        });
});

// create status
router.post("/users/:userId/habits/:habitId", (req, res, next) => {
    const { date, complete } = req.body;
    if (!date || complete === null)
        return res.status(400).json({ message: "Not enough information" });
    else {
        Status.findOne({
            user_id: req.params.userId,
            habit_id: req.params.habitId,
            date: date,
        }).then((status) => {
            if (status) {
                res.status(400).json({
                    message: "Status already exists",
                });
            } else {
                const newStatus = new Status({
                    user_id: req.params.userId,
                    habit_id: req.params.habitId,
                    date: date,
                    complete: complete,
                });

                newStatus
                    .save()
                    .then((status) => {
                        res.status(200).json({
                            success: true,
                            message: "Status successfully created",
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                        res.status(400).json({
                            success: false,
                            message: "Unable to create status at this time",
                        });
                    });
            }
        });
    }
});

// get all statuses
router.get("/users/:userId/", (req, res, next) => {
    Status.find({ user_id: req.params.userId })
        .then((statuses) => {
            res.status(200).json({
                message: "Successfully retrieved statuses",
                statuses,
            });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).json({
                message: "Unable to retrieve statuses at this time",
            });
        });
});

// update status
router.put("/:statusId/users/:userId", (req, res, next) => {
    const { complete } = req.body;
    Habit.updateOne(
        { user_id: req.params.userId, _id: req.params.habitId },
        { complete: complete }
    )
        .then(() => {
            return res
                .status(200)
                .json({ message: "Status updated successfully" });
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ message: "Unable to update status at this time" });
        });
});

module.exports = router;
