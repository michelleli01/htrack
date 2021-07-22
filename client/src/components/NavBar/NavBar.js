import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

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
                    <Nav className="mr-auto justify-content-end" style={{ width: "100%"}}>
                        <Nav.Link className="link" href="/">Home</Nav.Link>
                        <Nav.Link className="link" href="/about">About</Nav.Link>
                        <button className="button">
                            <Nav.Link className="button-link" href="/login">Login</Nav.Link>
                        </button>
                        <button className="button">
                            <Nav.Link className="button-link" href="/signup">Signup</Nav.Link>
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}