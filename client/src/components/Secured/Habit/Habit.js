import React, { useState, useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import EditHabit from "./EditHabit";
import axios from "axios";
import Auth from "../../../auth/Auth";
import moment from "moment";

import "./Habit.css";

export default function Habit(props) {
    const [editButtonClicked, setEditButtonClicked] = useState(false);


    return (
        <div className="habit">
            <input
                type="checkbox"
                className="habit-input"
            />
            <h3
                className="habit-header"
                style={{ color: `${props.habit.color}` }}
            >
                {props.habit.name}
            </h3>
            <p className="habit-subtitle">{props.habit.frequency}</p>
            <p className="habit-text">{props.habit.description}</p>
            <button
                style={{ color: `${props.habit.color}` }}
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
            />
        </div>
    );
}
