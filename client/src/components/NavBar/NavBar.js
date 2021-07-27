import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, animateScroll as Scroll } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";

import logo from "../../assets/HTrack_Logo.png";
import "./NavBar.css";

export default function NavBar(props) {
    return props.handleLogout === undefined ? (
        <Navbar
            collapseOnSelect
            fixed="top"
            expand="md"
            className="nav-container"
        >
            <Container>
                <Navbar.Brand
                    onClick={() => {
                        Scroll.scrollToTop();
                    }}
                >
                    <img src={logo} height="100" alt="htrack logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="response-navbar-nav" />
                <Navbar.Collapse id="response-navbar-nav">
                    <Nav
                        className="mr-auto justify-content-end"
                        style={{ width: "100%" }}
                    >
                        <RouteLink
                            onClick={() => {
                                Scroll.scrollToTop();
                            }}
                            className="link"
                            to="/"
                        >
                            Home
                        </RouteLink>
                        <Link
                            className="link"
                            to="about"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={10}
                        >
                            About
                        </Link>
                        <Link
                            className="link"
                            to="contact"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={10}
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
    ) : (
        <Navbar
            collapseOnSelect
            fixed="top"
            expand="md"
            className="nav-container"
        >
            <Container>
                <Navbar.Brand
                    onClick={() => {
                        Scroll.scrollToTop();
                    }}
                >
                    <img src={logo} height="100" alt="htrack logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="response-navbar-nav" />
                <Navbar.Collapse id="response-navbar-nav">
                    <Nav
                        className="mr-auto justify-content-end"
                        style={{ width: "100%" }}
                    >
                        <Link
                            className="link"
                            to="statistics"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={10}
                        >
                            Statistics
                        </Link>
                        <button
                            className="button button-link"
                            onClick={props.handleLogout}
                        >
                            Logout
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
