const express = require("express");
const router = express.Router();
const Status = require("../models/status");

// get specific status
router.get("/users/:userId/habits/:habitId/date/:date", (req, res, next) => {
    Status.findOne({
        user_id: req.params.userId,
        habit_id: req.params.habitId,
        date: req.params.date,
    })
        .then((status) => {
            res.status(200).json({ status });
        })
        .catch((err) => {
            res.status(500).json({ message: "Unable to get status" });
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
    console.log(req.body);
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
                            status,
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
router.put("/users/:userId/habits/:habitId", (req, res, next) => {
    const { complete } = req.body;
    Status.updateOne(
        { user_id: req.params.userId, habit_id: req.params.habitId },
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

router.delete("/users/:userId/habits/:habitId", (req, res, next) => {
    Status.deleteOne({
        user_id: req.params.userId,
        habit_id: req.params.habitId,
    })
        .then((data) => {
            res.status(200).json({ message: "Delete status successfully" });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
});

module.exports = router;
