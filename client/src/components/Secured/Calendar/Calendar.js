import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import Date from "./Date";

import "./Calendar.css";

export default function Calendar() {
    return (
        <Container >
            <Row >
                <Col className="calendar-date"><Date date={moment()}/></Col>
                <Col className="calendar-date"><Date date={moment().add(1, 'day')}/></Col>
                <Col className="calendar-date"><Date date={moment().add(2,'day')}/></Col>
                <Col className="calendar-date"><Date date={moment().add(3,'day')}/></Col>
                <Col className="calendar-date"><Date date={moment().add(4,'day')}/></Col>
                <Col className="calendar-date"><Date date={moment().add(5,'day')}/></Col>
                <Col className="calendar-date"><Date date={moment().add(6,'day')}/></Col>
            </Row>
        </Container>
    );
}
