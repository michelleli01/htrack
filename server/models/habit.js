const mongoose = require("mongoose");
const habit = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    name: String,
    frequency: Array,
    description: String,
    start_date: Date,
    color: String,
});

module.exports = mongoose.model("Habit", habit);
