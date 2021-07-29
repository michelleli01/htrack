const mongoose = require("mongoose");
const status = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    habit_id: {
        type: mongoose.Types.ObjectId,
        ref: "Habit",
    },
    date: Date,
    complete: Boolean,
});

module.exports = mongoose.model("Status", status);
