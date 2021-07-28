import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";

import "./Date.css";

export default function Date(props) {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        axios({
            method: "POST",
            withCredentials: true,
            data: {
                date: props.date.format("YYYY-MM-DD"),
            },
            url: `/api/users/${Auth.getToken()}/habits/date`,
        })
            .then((res) => {
                setHabits(res.data.habits);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h3 className="date-header">{props.date.format("MM/DD/YYYY")}</h3>
            <div className="date-divider" />
            {habits.map((habit) => {
                return (
                    <div className="habit-container">
                        <h3
                            className="habit-name"
                            style={{ color: `#${habit.color}` }}
                        >
                            {habit.name}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}
