import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";

import "./NavBar.css";

export default function NavBar() {
    return (
        <Navbar
            collapseOnSelect
            fixed="top"
            expand="md"
            className="nav-container"
        >
            <Container>
                <Navbar.Brand href="/">HTrack</Navbar.Brand>
                <Navbar.Toggle aria-controls="response-navbar-nav" />
                <Navbar.Collapse id="response-navbar-nav">
                    <Nav
                        className="mr-auto justify-content-end"
                        style={{ width: "100%" }}
                    >
                        <RouteLink className="link" to="/">
                            Home
                        </RouteLink>
                        <Link
                            className="link"
                            to="about"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-50}
                            duration={500}
                        >
                            About
                        </Link>
                        <Link
                            className="link"
                            to="contact"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-50}
                            duration={500}
                        >
                            Contact
                        </Link>
                        <button className="button">
                            <Nav.Link className="button-link" href="/login">
                                Login
                            </Nav.Link>
                        </button>
                        <button className="button">
                            <Nav.Link className="button-link" href="/signup">
                                Signup
                            </Nav.Link>
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
