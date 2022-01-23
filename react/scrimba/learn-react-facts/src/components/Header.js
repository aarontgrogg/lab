import React from 'react';
import Logo from '../images/logo192.png';

export default function Header() {
    return (
        <header>
            <img src={Logo} width="40" alt="React logo" />
            <h2>React Facts</h2>
            <h3>React Course - Project 1</h3>
        </header>
    )
}