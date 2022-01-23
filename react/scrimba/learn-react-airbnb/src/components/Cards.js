import React from 'react';
import star from '../images/star.png';
import Katie from '../images/Katie.png';

export default function Cards() {
    return (
        <section className="cards">
            <div className="card">
                <img src={Katie} alt="Katie" />
                <small className="card--tag">Sold Out</small>
                <div className="card--meta">
                    <img src={star} alt="rating star" />
                    <span className="card--meta-rating">5.0</span>
                    <span className="card--meta-count">(6)</span>
                    <span className="card--meta-country">USA</span>
                </div>
                <p className="card--title">Life lessons with Katie</p>
                <p classname="card--price"><strong>From $136</strong> / person</p>
            </div>
        </section>
    )
}