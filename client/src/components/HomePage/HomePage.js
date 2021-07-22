import About from "./About";
import Contact from "./Contact";

import React from "react";
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";

export default function HomePage() {
    return (
        <Container>
            <Element id="about">
                <About />
            </Element>
            <Element id="contact">
                <Contact />
            </Element>
        </Container>
    );
}
