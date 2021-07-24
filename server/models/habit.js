const mongoose = require('mongoose');
const habit = new mongoose.Schema({
    user_id: String,
    name: String, 
    frequency: Number,
    description: String,
    start_date: Date
});

module.exports = mongoose.model("Habit", habit);