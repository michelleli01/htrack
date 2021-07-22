import React from 'react'
import './ThankYou.css';

export default function ThankYou(props) {
    return (props.messageSent)?(
        <div className="thank-you-popup">
            <div className="thank-you">
                <h3 className="thank-you-header">Thank you for your message!</h3>
                <div className="thank-you-divider"/>
                <p className="thank-you-text">I will get back to you ASAP.</p>
                <button className="thank-you-close-button" onClick={()=>props.setMessageSent(false)}>Close</button>
            </div>
        </div>
    ):"";
}
