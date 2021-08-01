import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";
import HabitItem from "./HabitItem";
import TaskItem from "./TaskItem";
import moment from "moment";

import "./Date.css";

export default function Date(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        if (props.type === "task") {
            axios({
                method: "GET",
                withCredentials: true,
                url: `/tasks/users/${Auth.getToken()}/date/${props.date.format(
                    "YYYY-MM-DD"
                )}`,
            })
                .then((res) => {
                    setList(res.data.tasks);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios({
                method: "GET",
                withCredentials: true,
                url: `/api/users/${Auth.getToken()}/habits`,
            })
                .then((res) => {
                    setList(res.data.habits);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    function completeItem(id) {
        var item = list.find((item) => item._id === id);
        item.done = !item.done;

        axios({
            method: "PUT",
            withCredentials: true,
            data: item,
            url: `/tasks/users/${Auth.getToken()}/${id}`,
        })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <p className='date-subtitle'>{props.title}</p>
            <div className='date-container'>
                {list.map((listItem) => {
                    if (props.type === "task") {
                        return (
                            <TaskItem
                                item={listItem}
                                key={listItem._id}
                                completeTask={completeItem}
                            />
                        );
                    } else {
                        return (
                            <HabitItem
                                key={listItem._id}
                                habit={listItem}
                                date={moment()}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}
