import React, { useState, useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import EditHabit from "./EditHabit";
import axios from "axios";
import Auth from "../../../auth/Auth";
import moment from "moment";
import { occurs } from "./habit_helper";

import "./Habit.css";

export default function Habit(props) {
    const [editButtonClicked, setEditButtonClicked] = useState(false);

    useEffect(() => {
        if (occurs(props.habit.frequency, moment())) {
            axios({
                method: "GET",
                withCredentials: true,
                url: `/status/users/${Auth.getToken()}/habits/${
                    props.habit._id
                }`,
            })
                .then((res) => {
                    if (res.data.status === null) {
                        createStatus();
                    } else {
                        console.log(res.data.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    function createStatus() {
        axios({
            method: "POST",
            withCredentials: true,
            data: {
                date: moment().format("YYYY-MM-DD"),
                complete: false,
            },
            url: `/status/users/${Auth.getToken()}/habits/${props.habit._id}`,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    function handleComplete(e) {
        axios({
            method: "PUT",
            data: {
                complete: e.target.checked,
            },
            withCredentials: true,
            url: `status/users/${Auth.getToken()}/habits/${props.habit._id}`,
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    return (
        <div className="habit">
            <input
                type="checkbox"
                className="habit-input"
                onChange={handleComplete}
            />
            <h3
                className="habit-header"
                style={{ color: `${props.habit.color}` }}
            >
                {props.habit.name}
            </h3>
            <p className="habit-subtitle">
                {props.habit.frequency.map((habit) => {
                    if (habit === "Thursday") {
                        return "Th ";
                    }
                    if (habit === "Sunday") {
                        return "Su ";
                    } else {
                        return habit[0] + " ";
                    }
                })}
            </p>
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
