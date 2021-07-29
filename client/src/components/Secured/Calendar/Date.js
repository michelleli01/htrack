import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";

import "./Date.css";

export default function Date(props) {
    const [habits, setHabits] = useState([]);

    

    return (
        <div>
            <h3 className="date-header">{ props.date.format('dddd')}</h3>
            <p className="date-subtitle">{props.date.format('MM/DD')}</p>

            {habits.map((habit) => {
                return (
                    <div className="habit-container">
                        <h3
                            className="habit-name"
                            style={{ backgroundColor: `${habit.color}` }}
                        >
                            {habit.name}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}
