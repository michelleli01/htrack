import React, { useState } from "react";

import "./EditHabit.css";

export default function EditHabit(props) {
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newFrequency, setNewFrequency] = useState("Daily");
    const [error, setError] = useState("");

    function handleNewNameChange(e) {
        e.preventDefault();
    }

    function handleNewDescriptionChange(e) {
        e.preventDefault();
    }

    function handleNewFrequencyChange(e) {
        e.preventDefault();
    }

    function handleEditHabit(e) {
        e.preventDefault();
    }

    return props.editButtonClicked ? (
        <div className="edit-habit-popup">
            <div className="edit-habit">
                <h3 className="edit-habit-header">Edit {props.name}</h3>
                <div className="edit-habit-divider" />
                <form className="edit-habit-form">
                    {error && <p className="edit-habit-error">{error}</p>}
                    <label className="edit-habit-label">New Name</label>
                    <input
                        type="text"
                        className="edit-habit-input"
                        placeholder="Name"
                        onChange={handleNewNameChange}
                    />
                    <label className="edit-habit-label">New Frequency</label>
                    <select
                        className="edit-habit-select"
                        onChange={handleNewFrequencyChange}
                    >
                        <option className="edit-habit-option" value="Daily">
                            Daily
                        </option>
                        <option className="edit-habit-option" value="Weekly">
                            Weekly
                        </option>
                        <option className="edit-habit-option" value="Monthly">
                            Monthly
                        </option>
                        <option className="edit-habit-option" value="Yearly">
                            Yearly
                        </option>
                    </select>
                    <label className="edit-habit-label">New Description</label>
                    <textarea
                        type="text"
                        maxLength="200"
                        className="edit-habit-text-area"
                        onChange={handleNewDescriptionChange}
                    />
                    <button
                        onClick={handleEditHabit}
                        className="edit-habit-button"
                    >
                        Edit Habit
                    </button>
                    <button
                        onClick={handleEditHabit}
                        className="delete-habit-button"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => props.setEditButtonClicked(false)}
                        className="edit-habit-close-button"
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
