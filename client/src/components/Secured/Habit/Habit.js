import React, { useState, useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import EditHabit from "./EditHabit";
import axios from "axios";
import Auth from "../../../auth/Auth";
import moment from "moment";

import "./Habit.css";

export default function Habit(props) {
    const [editButtonClicked, setEditButtonClicked] = useState(false);

    useEffect(() => {
        const next_week = [];
        if (props.habit.frequency === "Daily") {
            for (let i = 0; i < 7; i++) {
                next_week.push(moment().add(i, "day").format("YYYY-MM-DD"));
            }
        }

        axios({
            method: "PUT",
            data: { next_week: next_week },
            withCredentials: true,
            url: `/api/users/${Auth.getToken()}/habits/${props.habit._id}`,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCompleted(e) {
        console.log(props.habit);
        var completed = e.target.checked;

        var days =
            moment.duration(moment().diff(props.habit.start_date, "days")) + 1;

        const next_week = props.habit.next_week;
        const index = next_week.indexOf(moment.format("YYYY-MM-DD"));
        if (index > -1) {
            next_week.splice(index, 1);
        }

    }

    return (
        <div className="habit">
            <input
                type="checkbox"
                // onChange={handleCompleted}
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
