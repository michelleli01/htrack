import React from "react";
import { Link } from "react-scroll";
import { Container, Row, Col } from "react-bootstrap";

import ABOUT_IMG_1 from "../../assets/ABOUT_IMG_1.jpg";

import "./About.css";

export default function About() {
    return (
        <Container fluid>
            <Row className="about-container">
                <Col className="about-img-container">
                    <img
                        className="about-img"
                        src={ABOUT_IMG_1}
                        alt="about img"
                    />
                </Col>
                <Col>
                    <p className="about-subtitle">ABOUT</p>
                    <h3 className="purpose-header">Purpose</h3>
                    <div className="about-divider" />
                    <div className="about-text-container">
                        <p className="about-text">
                            <b>HTrack</b> is a habit tracking web application
                            meant to help{" "}
                            <b>
                                build productive habits so we all can lead more
                                fulfilling lifestyles.
                            </b>
                        </p>
                        <p className="about-text">
                            I started this project in July 2021 to
                            enhance and expand my knowledge in web development.
                            This is my first major project which I worked on
                            independently and in my free time. I used the
                            ReactJS for frontend programming with ExpressJS
                            and NodeJS for backend progamming in addition
                            to MongoDB for storage.
                        </p>
                        <Link
                            to="contact"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={10}
                        >
                            <button className="contact-button">
                                Contact Me!
                            </button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
