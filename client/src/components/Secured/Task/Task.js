import React, { useState } from "react";
import TaskPopup from "./TaskPopup";
import { RiEditBoxLine } from "react-icons/ri";
import axios from "axios";

import "./Task.css";

export default function Task({ task, completeTask }) {
    const [editTask, setEditTask] = useState(false);

    function handleToggle(e) {
        completeTask(task._id);
    }

    return (
        <div
            className='task-container'
            style={{ borderColor: `${task.color}` }}
        >
            <input
                className='task-checkbox'
                type='checkbox'
                onChange={handleToggle}
            />
            <h3 style={{ color: `${task.color}` }} className='task-header'>
                {task.name}
            </h3>
            <p className='task-subtitle'>Priority: {task.priority}</p>
            <p className='task-text'>{task.comments}</p>
            <button
                style={{ color: `${task.color}` }}
                className='task-edit-button'
                onClick={(e) => {
                    setEditTask(true);
                }}
            >
                <RiEditBoxLine />
            </button>
            <TaskPopup
                trigger={editTask}
                setTrigger={setEditTask}
                task={task}
            />
        </div>
    );
}
