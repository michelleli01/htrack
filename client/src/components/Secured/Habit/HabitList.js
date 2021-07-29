import React from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";
import Habit from "./Habit";
import moment from "moment";

import "./HabitList.css";

export default class HabitList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            habits: [],
            showAll: false,
            showCompleted: false,
        };
    }

    componentDidMount() {
        this.setState({ error: "" });
        const user_id = Auth.getToken();

        axios({
            method: "GET",
            data: {
                user_id,
            },
            withCredentials: true,
            url: `/api/users/${user_id}/habits`,
        })
            .then((res) => {
                console.log(res.data.message);
                this.setState({ habits: res.data.habits });
            })
            .catch((err) => {
                this.setState({ error: err.response.data.message });
            });
    }

    createStatus(habit) {
        axios({
            method: "POST",
            withCredentials: true,
            data: {
                date: moment().format("YYYY-MM-DD"),
                complete: false,
            },
            url: `/status/users/${Auth.getToken()}/habits/${habit._id}`,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    render() {
        return (
            <div className="habit-list-container">
                <div className="habit-list">
                    {this.state.error && (
                        <p className="habit-list-error">{this.state.error}</p>
                    )}
                    {this.state.habits.map((habit) => {
                        return (
                            <Habit
                                key={habit._id}
                                habit={habit}
                                showCompleted={this.state.showCompleted}
                                showAll={this.state.showAll}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
