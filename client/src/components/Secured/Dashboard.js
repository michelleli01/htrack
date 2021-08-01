import React, { useState } from "react";
import CreateHabit from "./Habit/CreateHabit";
import HabitList from "./Habit/HabitList";
import { Container, Row, Col } from "react-bootstrap";
import Calendar from "./Calendar/Calendar";

import "./Dashboard.css";

export default function Dashboard() {
    const [createButtonClicked, setCreateButtonClicked] = useState(false);

    return (
        <Container fluid className="dashboard">
            <h3 className="dashboard-header">Dashboard</h3>
            <p className="dashboard-subtitle">Today</p>
            <div className="dashboard-divider" />
            <Row>
                <Col sm={2} className="dashboard-actions">
                    <HabitList />
                    <button
                        className="dashboard-button"
                        onClick={() => {
                            setCreateButtonClicked(true);
                        }}
                    >
                        Create New Habit
                    </button>
                    <CreateHabit
                        createButtonClicked={createButtonClicked}
                        setCreateButtonClicked={setCreateButtonClicked}
                    />
                </Col>
                <Col md={9}>
                    <Calendar />
                </Col>
            </Row>
            
        </Container>
    );
}
