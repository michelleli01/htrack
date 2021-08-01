import React, { useState } from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";
import moment from "moment";

import "./CreateHabit.css";

export default function CreateHabit(props) {
    const [habitName, setHabitName] = useState("");
    const [habitDescription, setHabitDescription] = useState("");
    const [frequency, setFrequency] = useState([]);
    const [error, setError] = useState("");

    async function handleCreateHabit(e) {
        e.preventDefault();
        setError("");

        var newHabit = {
            name: habitName,
            description: habitDescription,
            frequency: frequency,
            start_date: moment().format("YYYY-MM-DD"),
        };

        var color = Math.floor(Math.random() * 16777215).toString(16);
        newHabit["color"] = `#${color}`;

        await axios({
            method: "POST",
            data: newHabit,
            withCredentials: true,
            url: `/api/users/${Auth.getToken()}/habits`,
        })
            .then((res) => {
                console.log(res);
                window.location.reload();
                props.setCreateButtonClicked(false);
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
        var target = e.target;
        var value = Array.from(target.selectedOptions, (option) => option.value);
        setFrequency(value);
    }

    return props.createButtonClicked ? (
        <div className="create-habit-popup">
            <div className="create-habit">
                <h3 className="create-habit-header">
                    {new Date().toLocaleDateString()}
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
                    <b>use the ctrl key to select multiple days</b>
                    <br />
                    <select
                        className="create-habit-select"
                        multiple={true}
                        onChange={handleFrequencyChange}
                    >
                        <option className="create-habit-option" value="Monday">
                            Monday
                        </option>
                        <option className="create-habit-option" value="Tuesday">
                            Tuesday
                        </option>
                        <option
                            className="create-habit-option"
                            value="Wednesday"
                        >
                            Wednesday
                        </option>
                        <option
                            className="create-habit-option"
                            value="Thursday"
                        >
                            Thursday
                        </option>
                        <option
                            className="create-habit-option"
                            value="Friday"
                        >
                            Friday
                        </option>
                        <option
                            className="create-habit-option"
                            value="Saturday"
                        >
                            Saturday
                        </option>
                        <option
                            className="create-habit-option"
                            value="Sunday"
                        >
                            Sunday
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
