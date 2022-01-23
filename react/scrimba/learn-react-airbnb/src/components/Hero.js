import React from 'react';
import Image from '../images/Airbnb_Experiences.png';

export default function Hero() {
    return (
        <section className="hero">
            <img src={Image} alt="AirBnB Experiences" width="100%" />
            <h1>Online Experiences</h1>
            <p>Join unique interactive activites led by...</p>
        </section>
    )
}