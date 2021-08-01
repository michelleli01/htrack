const mongoose = require("mongoose");

const task = new mongoose.Schema({
    user_id: mongoose.Types.ObjectId,
    name: String,
    doDate: Date,
    dueDate: Date,
    comments: String,
    priority: String,
    category: String,
    done: Boolean,
    color: String
});

module.exports = mongoose.model("Task", task);