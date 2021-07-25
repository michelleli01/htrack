const mongoose = require('mongoose');
const habit = new mongoose.Schema({
    user_id: String,
    name: String, 
    frequency: String,
    description: String,
    start_date: Date
});

module.exports = mongoose.model("Habit", habit);