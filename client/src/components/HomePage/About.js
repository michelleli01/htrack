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
                            HTrack is a habit tracking web application meant to
                            help build productive habits so we all can lead more
                            fulfilling lifestyles.
                        </p>
                        <p className="about-text">
                            This project was largely inspired by the book Atomic
                            Habits by James Clear. After reading this book I was
                            determined to create something that allowed me to
                            use some of the tips provided towards my own life.
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
