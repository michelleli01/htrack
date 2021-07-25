import React, { useState } from "react";

import "./CreateHabit.css";

export default function CreateHabit(props) {
    const date = new Date();
    const [habitName, setHabitName] = useState();
    const [habitDescription, setHabitDescription] = useState();
    const [frequency, setFrequency] = useState();

    function handleCreateHabit(e) {
        e.preventDefault();
        const newHabit = {
            name: habitName,
            description: habitDescription,
            frequency: frequency,
            date: date.toISOString
        };
    }

    function handleNameChange(e) {
        e.preventDefault();
        setHabitName(e.target.value);
    }

    function handleDescriptionChange(e) {
        e.preventDefault();
        setHabitDescription(e.target.value);
    }

    function handleFrequencyChange(e) {
        e.preventDefault();
        setFrequency(e.target.value);
    }

    return props.buttonClicked ? (
        <div className="create-habit-popup">
            <div className="create-habit">
                <h3 className="create-habit-header">
                    {date.toLocaleDateString()}
                </h3>
                <div className="create-habit-divider" />
                <form className="create-habit-form">
                    <label className="create-habit-label">Name</label>
                    <input
                        type="text"
                        className="create-habit-input"
                        placeholder="Name"
                        onChange={handleNameChange}
                    />
                    <label className="create-habit-label">Frequency</label>
                    <select
                        className="create-habit-select"
                        onChange={handleFrequencyChange}
                    >
                        <option className="create-habit-option">Daily</option>
                        <option className="create-habit-option">Weekly</option>
                        <option className="create-habit-option">Monthly</option>
                        <option className="create-habit-option">Yearly</option>
                    </select>
                    <label className="create-habit-label">Description</label>
                    <textarea
                        type="text"
                        maxLength="200"
                        className="create-habit-text-area"
                        onChange={handleDescriptionChange}
                    />
                    <button
                        onClick={handleCreateHabit}
                        className="create-habit-button"
                    >
                        Create Habit
                    </button>
                    <button
                        onClick={() => props.setButtonClicked(false)}
                        className="create-habit-close-button"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <div></div>
    );
}
