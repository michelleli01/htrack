import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import EditHabit from "./EditHabit";
import axios from "axios";
import Auth from "../../../auth/Auth";
import moment from "moment";

import "./Habit.css";

export default function Habit(props) {
    const [editButtonClicked, setEditButtonClicked] = useState(false);

    function handleCompleted(e) {
        var completed = e.target.checked;

        axios({
            method: "GET",
            withCredentials: true,
            url: `/api/users/${Auth.getToken()}/habits/${props.habit._id}`,
        })
            .then((res) => {
                const habit = res.data.habit;
                console.log(habit);

                var days =
                    moment.duration(moment().diff(habit.start_date, "days")) +
                    1;
                var completed_times = habit.completed_times;
                if(completed){
                    console.log(completed_times)
                    completed_times = completed_times+1;
                    console.log(completed_times)
                }
                else{
                    completed_times = completed_times-1;
                }
                var percent_success = (completed_times / days) * 100;

                const updatedHabit = {
                    completed_times,
                    days,
                    percent_success,
                };
                console.log(completed_times)

                updateHabitStatistics(updatedHabit, habit._id);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateHabitStatistics(updatedHabit, habit_id) {
        console.log(updatedHabit)
        axios({
            method: "PUT",
            withCredentials: true,
            data: updatedHabit,
            url: `/api/users/${Auth.getToken()}/habits/${habit_id}`,
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="habit">
            <input
                type="checkbox"
                onChange={handleCompleted}
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
            />
        </div>
    );
}
