import React, { useState, useEffect } from "react";
import TaskPopup from "./TaskPopup";
import Task from "./Task";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import Auth from '../../../auth/Auth';

import "./TaskList.css";

export default function TaskList(props) {
    const [createTask, setCreateTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `/tasks/users/${Auth.getToken()}/date/${props.date.format("YYYY-MM-DD")}`,
        })
            .then((res) => {
                setTasks(res.data.tasks);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function completeTask(id) {
        var task = tasks.find((task) => task._id === id);
        task.done = !task.done;

        axios({
            method: "PUT",
            withCredentials: true,
            data: task,
            url: `/tasks/users/${Auth.getToken()}/${id}`,
        })
            .then((res) => {
                console.log(res.data.message);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='task-list-container'>
            <div className='task-list'>
                {tasks.map((task) => {
                    if (task.done === false) {
                        return (
                            <Task
                                key={task._id}
                                task={task}
                                completeTask={completeTask}
                            />
                        );
                    }
                })}

                <button
                    onClick={(e) => {
                        setCreateTask(true);
                    }}
                    className='task-list-button'
                >
                    <GrAdd />
                </button>
                <TaskPopup
                    trigger={createTask}
                    setTrigger={setCreateTask}
                    date={props.date}
                    createTask={true}
                />
            </div>
        </div>
    );
}
