import React, { useState } from "react";
import validator from "validator";
import emailjs from "emailjs-com";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

import "./Contact.css";
import ThankYou from "./ThankYou";

export default function Contact() {
    const [name, setName] = useState();
    const [message, setMessage] = useState();
    const [email, setEmail] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [error, setError] = useState("");

    function handleEmailChange(e) {
        e.preventDefault();
        setEmail(e.target.value);
        if (!validator.isEmail(email)) {
            setError("Please enter a valid email address");
        } else {
            setError("");
        }
    }

    function handleSendMessage(e) {
        e.preventDefault();
        if (
            name.trim() === "" ||
            message.trim() === "" ||
            email.trim() === ""
        ) {
            setError("Please fill out required fields");
        }
        if (!validator.isEmail(email)) {
            setError("Please enter valid email.");
        } else {
            setError("");
            emailjs
                .sendForm(
                    process.env.REACT_APP_SERVICE_ID,
                    process.env.REACT_APP_TEMPLATE_ID,
                    e.target,
                    process.env.REACT_APP_USER_ID
                )
                .then((result) => {
                    console.log(result.text);
                    setMessageSent(true);
                })
                .catch((err) => {
                    console.log(err.text);
                    setError(
                        "Sorry, the message could not be send. Please try again."
                    );
                });
        }
    }

    function clearForm(){
        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <div className="contact">
            <div className="contact-container">
                <div className="contact-information">
                    <p className="contact-subtitle">Contact Information</p>
                    <h3 className="contact-header">Let's Get In Touch!</h3>
                    <div className="contact-divider" />
                    <ul className="contact-list">
                        <li className="contact-list-item">
                            <div>
                                <MdEmail className="icon" size="1.5em"/>
                                <a
                                    href="mailto:myl39@cornell.edu"
                                    className="contact-link"
                                >
                                    myl39@cornell.edu
                                </a>
                            </div>
                        </li>
                        <li className="contact-list-item">
                            <div>
                                <AiFillPhone className="icon" size="1.5em"/>
                                +1 (301)-250-0346
                            </div>
                        </li>
                        <li className="contact-list-item">
                            <AiFillLinkedin className="icon" size="1.5em"/>
                            <a
                                href="https://www.linkedin.com/in/michelleli0"
                                className="contact-link"
                            >
                                linkedin.com/in/michelleli0
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="send-message-card">
                    <p className="send-message-subtitle">Contact me here!</p>
                    <p className="send-message-text">
                        I'd love to hear from you! Send me a message and I'll
                        try to response as soon as possible.
                    </p>
                    <form
                        className="send-message-form"
                        onSubmit={handleSendMessage}
                    >
                        {error && <p className="contact-error">{error}</p>}
                        <input
                            className="send-message-form-input"
                            type="text"
                            name="from_name"
                            placeholder="Name"
                            maxLength="50"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required
                        />
                        <input
                            className="send-message-form-input"
                            type="email"
                            name="from_email"
                            placeholder="E-mail"
                            maxLength="50"
                            onChange={handleEmailChange}
                            required
                        />
                        <textarea
                            className="send-message-form-text-area"
                            data-limit-rows="true"
                            type="text"
                            name="message"
                            rows="3"
                            maxLength="200"
                            placeholder="Enter message here"
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            required
                        />
                        <button className="send-message-button">
                            Send Message
                        </button>
                    </form>
                </div>

                <ThankYou messageSent={messageSent} setMessageSent={setMessageSent}/>
                {clearForm}
            </div>
        </div>
    );
}
