import React, { useState } from "react";
import TaskPopup from "../Task/TaskPopup";

import "./DateItem.css";

export default function TaskItem(props) {
    const [editButtonClicked, setEditButtonClicked] = useState(false);

    function toggleItem() {
        props.completeTask(props.item._id);
    }

    return !props.item.done ? (
        <div
            className='task-item-container'
        >
            <button
                className='task-item'
                style={{ backgroundColor: `${props.item.color}` }}
                onClick={(e) => {
                    setEditButtonClicked(true);
                }}
            >
                <input
                    type='checkbox'
                    className='task-item-checkbox'
                    onChange={toggleItem}
                />
                {props.item.name}
            </button>
            <TaskPopup
                trigger={editButtonClicked}
                setTrigger={setEditButtonClicked}
                task={props.item}
            />
        </div>
    ) : (
        <div></div>
    );
}
