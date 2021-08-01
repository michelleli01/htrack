import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import DatePicker from "react-date-picker";
import axios from "axios";
import moment from "moment";
import Auth from "../../../auth/Auth";

import "./TaskPopup.css";

export default function TaskPopup(props) {
    const [name, setName] = useState("Untitled");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [doDate, setDoDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [comments, setComments] = useState("");
    const [error, setError] = useState("");
    const done = false;

    function handleTrigger(e) {
        e.preventDefault();
        setError("");

        var newTask = {
            name, //required
            priority, //required
            category, //optional
            doDate, //required
            dueDate, //optional, make sure due date is after do date
            comments, //optional
            done, //required
        };

        if (newTask.doDate) {
            const doDateMoment = moment(newTask.doDate);
            newTask["doDate"] = doDateMoment.format("YYYY-MM-DD");
        }

        if (newTask.dueDate) {
            const dueDateMoment = moment(newTask.dueDate);
            newTask["dueDate"] = dueDateMoment.format("YYYY-MM-DD");
        }

        var color = Math.floor(Math.random() * 16777215).toString(16);
        newTask["color"] = `#${color}`;

        if (doDate > dueDate) {
            setError("Do date must be before due date");
        } else {
            if (props.createTask === true) {
                axios({
                    method: "POST",
                    data: newTask,
                    withCredentials: true,
                    url: `/tasks/users/${Auth.getToken()}`,
                })
                    .then((res) => {
                        console.log(res.data.message);
                        window.location.reload();
                        props.setTrigger(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err.response.data.message);
                    });
            } else {
                console.log(newTask);
                axios({
                    method: "PUT",
                    data: newTask,
                    withCredentials: true,
                    url: `/tasks/users/${Auth.getToken()}/${props.task._id}`,
                })
                    .then((res) => {
                        console.log(res.data.message);
                        window.location.reload();
                        props.setTrigger(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err.response.data.message);
                    });
            }
        }
    }

    function handleDeleteTask(e) {
        e.preventDefault();
        axios({
            method: "DELETE",
            withCredentials: true,
            url: `/tasks/users/${Auth.getToken()}/${props.task._id}`,
        })
            .then((res) => {
                console.log(res.data.message);
                window.location.reload();
                props.setTrigger(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleNameChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handlePriorityChange(e) {
        setPriority(e.target.value);
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value);
    }

    function handleCommentsChange(e) {
        e.preventDefault();
        setComments(e.target.value);
    }

    return props.trigger ? (
        <div className='task-popup-container'>
            <div className='task-popup'>
                <form className='task-popup-form'>
                    {error && <p className='task-popup-error'>{error}</p>}
                    <input
                        type='text'
                        className='task-popup-input task-popup-name'
                        placeholder='Untitled'
                        onChange={handleNameChange}
                    />
                    <label className='task-popup-label'>Priority</label>
                    <select
                        onChange={handlePriorityChange}
                        className='task-popup-input'
                        required
                    >
                        <option value='' disabled selected>
                            ---Select---
                        </option>
                        <option value='1st'>1st Priority</option>
                        <option value='2nd'>2nd Priority</option>
                        <option value='3rd'>3rd Priority</option>
                        <option value='scheduled'>Scheduled</option>
                        <option value='quick'>Quick</option>
                        <option value='remember'>Remember</option>
                        <option value='immediate'>Immediate</option>
                    </select>
                    <label className='task-popup-label'>Category</label>
                    <select
                        onChange={handleCategoryChange}
                        className='task-popup-input'
                    >
                        <option value='' disabled selected>
                            ---Select---
                        </option>
                        <option value='personal'>Personal</option>
                        <option value='school'>School</option>
                        <option value='extracurricular'>Extracurricular</option>
                        <option value='work'>Work</option>
                        <option value='misc'>Miscellaneous</option>
                    </select>
                    <label className='task-popup-label'>Do Date</label>
                    <DatePicker
                        value={doDate}
                        onChange={setDoDate}
                        className='task-popup-date-picker'
                        format='y-MM-dd'
                        required
                    />
                    <label className='task-popup-label'>Due Date</label>
                    <DatePicker
                        value={dueDate}
                        onChange={setDueDate}
                        className='task-popup-date-picker'
                        format='y-MM-dd'
                    />
                    <label className='task-popup-label'>Comments</label>
                    <textarea
                        type='text'
                        maxLength='200'
                        className='task-popup-input'
                        onChange={handleCommentsChange}
                    />
                </form>
                <button className='task-popup-button' onClick={handleTrigger}>
                    Done
                </button>
                {props.handleDeleteTask !== null ? (
                    <button
                        className='task-popup-button task-popup-delete-button'
                        onClick={handleDeleteTask}
                    >
                        Delete
                    </button>
                ) : (
                    <div></div>
                )}

                <button
                    className='task-popup-close-button'
                    onClick={(e) => props.setTrigger(false)}
                >
                    <AiOutlineClose />
                </button>
            </div>
        </div>
    ) : (
        <div></div>
    );
}
