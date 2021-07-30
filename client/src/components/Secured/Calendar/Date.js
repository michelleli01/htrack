import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";
import DateItem from "./DateItem";

import "./Date.css";

export default function Date(props) {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `/api/users/${Auth.getToken()}/habits`,
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
            {/* <h3 className="date-header">{props.date.format("dddd")}</h3> */}
            <p className="date-subtitle">{props.title}</p>

            <div className="date-habit-container">
                {habits.map((habit) => {
                    return <DateItem habit={habit} date={props.date} />;
                })}
            </div>
        </div>
    );
}
