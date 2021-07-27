import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import axios from 'axios';
import Auth from '../../../auth/Auth';

import "./Calendar.css";

export default function Calendar(props) {
    
    const [oneDay, setOneDay] = useState([]);
    const [twoDay, setTwoDay] = useState([]);

    useEffect(() => {
        axios({
            method:"GET",
            withCredentials: true,
            url: `/api/users/${Auth.getToken()}/habits/${moment().format()}`
        })
    }, []);

    return (
        <Container className="calendar">
            <Row className="calendar-header-container">
                <Col>
                    <h3 className="calendar-header">
                        {moment().format("MM/DD/YYYY")}
                    </h3>
                    <div className="calendar-divider" />
                </Col>
                <Col>
                    <h3 className="calendar-header">{moment().add(1,'day').format("MM/DD/YYYY")}</h3>
                    <div className="calendar-divider" />
                </Col>
                <Col>
                    <h3 className="calendar-header">{moment().add(2,'day').format("MM/DD/YYYY")}</h3>
                    <div className="calendar-divider" />
                </Col>
                <Col>
                    <h3 className="calendar-header">{moment().add(3,'day').format("MM/DD/YYYY")}</h3>
                    <div className="calendar-divider" />
                </Col>
                <Col>
                    <h3 className="calendar-header">{moment().add(4,'day').format("MM/DD/YYYY")}</h3>
                    <div className="calendar-divider" />
                </Col>
                <Col>
                    <h3 className="calendar-header">{moment().add(5,'day').format("MM/DD/YYYY")}</h3>
                    <div className="calendar-divider" />
                </Col>
                <Col>
                    <h3 className="calendar-header">{moment().add(6,'day').format("MM/DD/YYYY")}</h3>
                    <div className="calendar-divider" />
                </Col>
            </Row>
            <Row>
                <Col>Monday's Habits</Col>
                <Col>Tuesday's Habits</Col>
                <Col>Wednesday's Habits</Col>
                <Col>Thursday's Habits</Col>
                <Col>Friday's Habits</Col>
                <Col>Saturday's Habits</Col>
                <Col>Sunday's Habits</Col>
            </Row>
        </Container>
    );
}
