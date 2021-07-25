import React from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";
import Habit from "./Habit";

import "./HabitList.css";

export default class HabitList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            habits: [],
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

    render() {
        return (
            <div className="habit-list-container">
                <div className="habit-list">
                    {this.state.error && (
                        <p className="habit-list-error">{this.state.error}</p>
                    )}
                    {this.state.habits.map((habit) => {
                        return <Habit key={habit._id} habit={habit} />;
                    })}
                </div>
            </div>
        );
    }
}
