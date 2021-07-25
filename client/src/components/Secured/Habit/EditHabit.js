import React, { useState } from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";

import "./EditHabit.css";

export default function EditHabit(props) {
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newFrequency, setNewFrequency] = useState("Daily");

    function handleNewNameChange(e) {
        e.preventDefault();
        setNewName(e.target.value);
    }

    function handleNewDescriptionChange(e) {
        e.preventDefault();
        setNewDescription(e.target.value);
    }

    function handleNewFrequencyChange(e) {
        e.preventDefault();
        setNewFrequency(e.target.value);
    }

    async function handleEditHabit(e) {
        e.preventDefault();
        const editedHabit = {
            name: newName,
            description: newDescription,
            frequency: newFrequency,
        };

        await axios({
            method: "PUT",
            data: editedHabit,
            withCredentials: true,
            url: `/api//users/${Auth.getToken()}/habits/${props.habit._id}`,
        })
            .then((res) => {
                console.log(res);
                props.setEditButtonClicked(false);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function handleDeleteHabit(e) {
        e.preventDefault();
        await axios({
            method: "DELETE",
            withCredentials: true,
            url: `/api/users/${Auth.getToken()}/habits/${props.habit._id}`,
        })
            .then((res) => {
                console.log(res);
                props.setEditButtonClicked(false);
                window.location.reload();
            })

            .catch((err) => {
                console.log(err);
            });
    }

    return props.editButtonClicked ? (
        <div className="edit-habit-popup">
            <div className="edit-habit">
                <h3 className="edit-habit-header">Edit {props.habit.name}</h3>
                <div className="edit-habit-divider" />
                <form className="edit-habit-form">
                    <label className="edit-habit-label">New Name</label>
                    <input
                        type="text"
                        className="edit-habit-input"
                        placeholder="New Name"
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
                        onClick={handleDeleteHabit}
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
