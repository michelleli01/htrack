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
    date_next: Date
});

module.exports = mongoose.model("Habit", habit);
