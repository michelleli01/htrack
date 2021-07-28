const mongoose = require("mongoose");
const habit = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    name: String,
    frequency: String,
    description: String,
    start_date: Date,
    completed_times: Number,
    days: Number,
    percent_success: Number,
    next_week: Array,
    color: String
});

module.exports = mongoose.model("Habit", habit);
