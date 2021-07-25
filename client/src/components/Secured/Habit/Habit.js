import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";

import "./Habit.css";

export default function Habit(props) {
    const [completed, setCompleted] = useState(false);

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
            <button className="habit-edit-button"><RiEditBoxLine/></button>
        </div>
    );
}
