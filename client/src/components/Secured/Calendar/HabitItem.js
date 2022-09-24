import React, { useState, useEffect } from "react";
import { done, occurs } from "../../Helpers/habit_helper";
import Auth from "../../../auth/Auth";
import EditHabit from "../Habit/EditHabit";

import "./DateItem.css";

export default function HabitItem(props) {
    const [complete, setComplete] = useState(false);
    const [editButtonClicked, setEditButtonClicked] = useState(false);

    useEffect(() => {
        done(Auth.getToken(), props.habit._id, props.date).then((data) =>{
            console.log(props.habit.frequency);
            console.log(props.date);

            console.log(occurs(props.habit.frequency, props.date));
            setComplete(data)
        }
        );
    }, []);

    return occurs(props.habit.frequency, props.date) && !complete ? (
        <div className="habit-container">
            <button
                className="habit-name"
                style={{ backgroundColor: `${props.habit.color}` }}
                onClick={(e) => {
                    setEditButtonClicked(true);
                }}
            >
                {console.log("props")}
                {props.habit.name}
            </button>
            <EditHabit
                editButtonClicked={editButtonClicked}
                setEditButtonClicked={setEditButtonClicked}
                habit={props.habit}
            />
        </div>
    ) : (
        <div></div>
    );
}