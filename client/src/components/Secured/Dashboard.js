import React, { useState } from "react";
import CreateHabit from "./Habit/CreateHabit";
import HabitList from "./Habit/HabitList";

import "./Dashboard.css";

export default function Dashboard() {
    const date = new Date();
    const [buttonClicked, setButtonClicked] = useState(false);

    return (
        <div className="dashboard">
            <h3 className="dashboard-header">Dashboard</h3>
            <p className="dashboard-subtitle">{date.toLocaleDateString()}</p>
            <div className="dashboard-divider" />
            <div className="dashboard-actions">
                
                <HabitList />
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
                    date={date}
                />
            </div>
        </div>
    );
}
