import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import Calendar from "../Calendar/Calendar";
import TaskList from "../Task/TaskList";

import "./Planner.css";

export default function Planner() {
    const date = moment();

    return (
        <Container fluid className='planner-container'>
            <Row>
                <Col>
                    <h3 className='planner-header'>Weekly Planner</h3>
                    <div className='planner-subtitle'>Today</div>
                    <div className='planner-divider' />
                </Col>
            </Row>
            <Row>
                <Col md={2} className='planner-actions'>
                    <TaskList date={date} />
                </Col>
                <Col md={9}>
                    <Calendar type='task' />
                </Col>
            </Row>
        </Container>
    );
}
