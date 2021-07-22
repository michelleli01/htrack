import React, { useRef, useState, useEffect } from "react";
import HabitList from "./HabitList";
import uuidv4 from "uuid/v4";

export default function HabitForm() {
    const [habits, setHabits] = useState([]);
    const name = useRef();
    const frequency = useRef();
    const date = new Date().toLocaleDateString();

    const TOKEN = "HTracker.habitList";

    useEffect(() => {
        setHabits(JSON.parse(localStorage.getItem(TOKEN)));
    }, []);

    useEffect(() => {
        localStorage.setItem(TOKEN, JSON.stringify(habits));
    }, [habits]);

    function handleToggleHabit(id) {
        const newHabits = [...habits];
        const habit = newHabits.find((habit) => habit.id === id);
        habit.complete = !habit.complete;
        setHabits(newHabits.filter((habit) => habit.complete === false));
        console.log(habits);
    }

    function handleAddHabit(e) {
        e.preventDefault();
        const habit = {
            id: uuidv4(),
            name: name.current.value,
            frequency: frequency.current.value,
            startDate: date,
            complete: false,
        };
        console.log(habit);
        const newHabits = [...habits, habit];
        setHabits(newHabits);
    }

    return (
        <div>
            <h3>{date}</h3>
            <label>Name</label>
            <input ref={name} />
            <label>Frequency</label>
            <select ref={frequency}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
            </select>
            <button onClick={handleAddHabit}>Add Habit</button>
            <HabitList habits={habits} toggleHabit={handleToggleHabit} />
        </div>
    );
}
