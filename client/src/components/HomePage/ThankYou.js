import React from 'react'
import './ThankYou.css';

export default function ThankYou(props) {
    return (props.messageSent)?(
        <div className="thank-you-popup">
            <div className="thank-you">
                <h3>Thank you for your message!</h3>
                <div className="divider"/>
                <p>I will get back to you ASAP.</p>
                <button className="close-button" onClick={()=>props.setMessageSent(false)}>Close</button>
            </div>
        </div>
    ):"";
}
