import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import Date from "./Date";

import "./Calendar.css";

export default function Calendar(props) {
    return (
        <Container className='calendar-container'>
            <Row>
                <Col className='calendar-date'>
                    <Date
                        date={moment().add(1, "day")}
                        title={moment().add(1, "day").format("MM/DD")}
                        type={props.type}
                    />
                </Col>
                <Col className='calendar-date'>
                    <Date
                        date={moment().add(2, "day")}
                        title={moment().add(2, "day").format("MM/DD")}
                        type={props.type}
                    />
                </Col>
                <Col className='calendar-date'>
                    <Date
                        date={moment().add(3, "day")}
                        title={moment().add(3, "day").format("MM/DD")}
                        type={props.type}
                    />
                </Col>
                <Col className='calendar-date'>
                    <Date
                        date={moment().add(4, "day")}
                        title={moment().add(4, "day").format("MM/DD")}
                        type={props.type}
                    />
                </Col>
                <Col className='calendar-date'>
                    <Date
                        date={moment().add(5, "day")}
                        title={moment().add(5, "day").format("MM/DD")}
                        type={props.type}
                    />
                </Col>
                <Col className='calendar-date'>
                    <Date
                        date={moment().add(6, "day")}
                        title={moment().add(6, "day").format("MM/DD")}
                        type={props.type}
                    />
                </Col>
            </Row>
        </Container>
    );
}