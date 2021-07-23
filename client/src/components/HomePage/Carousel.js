import {  Carousel } from "react-bootstrap";
import { Link } from "react-scroll";
import React from "react";

import img_1 from "../../assets/carousel/CAROUSEL_IMG_1.jpeg";
import img_2 from "../../assets/carousel/CAROUSEL_IMG_2.jpeg";
import img_3 from "../../assets/carousel/CAROUSEL_IMG_3.jpeg";

import "./Carousel.css";

export default function CarouselSlides() {
    return (
        <div className="carousel">
            <div className="carousel-container">
                <div className="carousel-section">
                    <div className="carousel-header">
                        Habit Tracking Web Application
                    </div>
                    <div className="carousel-text">
                        HTrack is a web application that creates your habits and
                        allows you to create new routines.
                    </div>
                    <Link
                        to="contact"
                        spy={true}
                        smooth={true}
                        offset={-10}
                        duration={10}
                    >
                        <button className="contact-button">Contact Me!</button>
                    </Link>
                </div>
                <Carousel
                    controls={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={5000}
                >
                    <Carousel.Item>
                        <img
                            className="d-block w-100 min-vh-100 scarousel-img"
                            src={img_1}
                            alt="first slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 min-vh-100 carousel-img"
                            src={img_2}
                            alt="second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 min-vh-100 carousel-img"
                            src={img_3}
                            alt="third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}
