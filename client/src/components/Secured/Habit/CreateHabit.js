import React, { useState } from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";

import "./CreateHabit.css";

export default function CreateHabit(props) {
    const [habitName, setHabitName] = useState("");
    const [habitDescription, setHabitDescription] = useState("");
    const [frequency, setFrequency] = useState("Daily");
    const [error, setError] = useState("");

    async function handleCreateHabit(e) {
        e.preventDefault();
        setError("");

        const newHabit = {
            name: habitName,
            description: habitDescription,
            frequency: frequency,
            start_date: props.date.toJSON(),
        };

        await axios({
            method: "POST",
            data: newHabit,
            withCredentials: true,
            url: `/api/users/${Auth.getToken()}/habits`,
        })
            .then((res) => {
                console.log(res);
                props.setCreateButtonClicked(false);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
            });
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

    return props.createButtonClicked ? (
        <div className="create-habit-popup">
            <div className="create-habit">
                <h3 className="create-habit-header">
                    {props.date.toLocaleDateString()}
                </h3>
                <div className="create-habit-divider" />
                <form className="create-habit-form">
                    {error && <p className="create-habit-error">{error}</p>}
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
                        <option className="create-habit-option" value="Daily">
                            Daily
                        </option>
                        <option className="create-habit-option" value="Weekly">
                            Weekly
                        </option>
                        <option className="create-habit-option" value="Monthly">
                            Monthly
                        </option>
                        <option className="create-habit-option" value="Yearly">
                            Yearly
                        </option>
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
                        onClick={() => props.setCreateButtonClicked(false)}
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
