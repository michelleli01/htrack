import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CreateHabit from "./Habit/CreateHabit";
import GetHabit from "./Habit/GetHabit";

import "./Dashboard.css";

export default function Dashboard() {
    let { path } = useRouteMatch();
    const [buttonClicked, setButtonClicked] = useState(false);

    return (
        <div className="dashboard">
            <h3 className="dashboard-header">Dashboard</h3>
            <div className="dashboard-divider" />
            <div className="dashboard-actions">
                <button
                    className="dashboard-button"
                    onClick={() => {
                        setButtonClicked(true);
                    }}
                >
                    Create New Habit
                </button>
                <CreateHabit
                    buttonClicked={buttonClicked}
                    setButtonClicked={setButtonClicked}
                />
                <Link to={`${path}/get-habits`} className="dashboard-link">
                    <button className="dashboard-button">Get Habits</button>
                </Link>
            </div>
        </div>
    );
}
