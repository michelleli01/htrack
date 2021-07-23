import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Navbar, Container } from "react-bootstrap";

import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer-container">
            <footer>
                <p className="footer-copyright">
                    © 2021 Michelle Li . myl39@cornell.edu . (301)-250-0346
                </p>
                <div className="footer-icons">
                    <a href="https://www.github.com/michelleli01">
                        <AiFillGithub size="1.5em" />
                    </a>
                    <a href="https://www.linkedin.com/in/michelleli0">
                        <AiFillLinkedin size="1.5em" />
                    </a>
                    <a href="mailto:myl39@cornell.edu">
                        <MdEmail size="1.5em" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
