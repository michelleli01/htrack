const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// get all tasks
router.get("/users/:userId", (req, res, next) => {
    Task.find()
        .then((tasks) => {
            res.status(200).json({ tasks });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});

// get specific task
router.get("/users/:userId/:taskId", (req, res, next) => {
    Task.find({ user_id: req.params.userId, _id: req.params.taskId })
        .then((task) => {
            res.status(200).json({ task });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});

// create task
router.post("/users/:userId", (req, res, next) => {
    const { name, comments, doDate, dueDate, priority, category, color, done } =
        req.body;
    const newTask = new Task({
        user_id: req.params.userId,
        name,
        comments,
        doDate,
        dueDate,
        priority,
        category,
        color,
        done,
    });

    if (!name || !doDate || !priority) {
        return res
            .status(400)
            .json({ message: "Please provide all necessary information" });
    }

    newTask
        .save()
        .then((task) => {
            res.status(200).json({ message: "Task successfully created" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});

// delete task
router.delete("/users/:userId/:taskId", (req, res, next) => {
    Task.deleteOne({ user_id: req.params.userId, _id: req.params.taskId })
        .then(res.status(200).json({ message: "Task deleted successfully." }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});

// update task
router.put("/users/:userId/:taskId", (req, res, next) => {
    const { name, comments, priority, category, doDate, dueDate, done } =
        req.body;

    var updatedTask = {};
    if (name && name.trim() !== "" && name != "Untitled") {
        updatedTask["name"] = name;
    }

    if (comments && comments.trim() !== "") {
        updatedTask["comments"] = comments;
    }

    if (priority) {
        updatedTask["priority"] = priority;
    }

    if (category) {
        updatedTask["category"] = category;
    }

    if (doDate) {
        updatedTask["doDate"] = doDate;
    }

    if (dueDate) {
        updatedTask["dueDate"] = dueDate;
    }

    if (done !== null) {
        updatedTask["done"] = done;
    }
    console.log(updatedTask);
    Task.updateOne(
        { user_id: req.params.userId, _id: req.params.taskId },
        updatedTask
    )
        .then(() => {
            res.status(200).json({ message: "Successfully updated task" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});

// get task from certain day
router.get("/users/:userId/date/:doDate", (req, res, next) => {
    Task.find({ user_id: req.params.userId, doDate: req.params.doDate })
        .then((tasks) => {
            res.status(200).json({ tasks });
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
});

module.exports = router;
