import React from "react";
import Pie from './Pie';
import "./Statistics.css";

export default function Statistics() {
    return (
        <div className="statistics-container">
            <h3 className="statistics-header">Statistics</h3>
            <Pie/>
        </div>
    );
}
