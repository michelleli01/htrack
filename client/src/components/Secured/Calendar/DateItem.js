import React, { useState, useEffect } from "react";
import { done, occurs } from "../../Helpers/habit_helper";
import Auth from "../../../auth/Auth";

export default function DateItem(props) {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        done(Auth.getToken(), props.habit._id, props.date).then((data) =>
            setComplete(data)
        );
    }, []);

    return occurs(props.habit.frequency, props.date) && !complete ? (
        <div className="habit-container">
            <h3
                className="habit-name"
                style={{ backgroundColor: `${props.habit.color}` }}
            >
                {props.habit.name}
            </h3>
        </div>
    ) : (
        <div></div>
    );
}
