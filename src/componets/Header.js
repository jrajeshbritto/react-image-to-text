import React from 'react'
import './Header.css';
export default function Header({message}) {
    return (
        <div className="header-container">
            <h1>{message}</h1>
        </div>
    )
}
