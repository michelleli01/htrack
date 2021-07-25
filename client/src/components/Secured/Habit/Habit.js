import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import EditHabit from "./EditHabit";

import "./Habit.css";

export default function Habit(props) {
    const [completed, setCompleted] = useState(false);
    const [editButtonClicked, setEditButtonClicked] = useState(false);

    function deleteHabit(){

    }

    return (
        <div className="habit">
            <input
                type="checkbox"
                onClick={(e) => {
                    setCompleted(true);
                }}
                className="habit-input"
            />
            <h3 className="habit-header">{props.habit.name}</h3>
            <p className="habit-subtitle">{props.habit.frequency}</p>
            <p className="habit-text">{props.habit.description}</p>
            <button
                className="habit-edit-button"
                onClick={(e) => {
                    setEditButtonClicked(true);
                }}
            >
                <RiEditBoxLine />
            </button>
            <EditHabit
                editButtonClicked={editButtonClicked}
                setEditButtonClicked={setEditButtonClicked}
                habit={props.habit}
                deleteHabit={deleteHabit}
            />
        </div>
    );
}
