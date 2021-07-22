import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import HabitPage from "./components/Habit/HabitPage";
import SecuredRoute from "./components/SecuredRoute";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <SecuredRoute exact path="/" component={Home} />
                    <Route exact path="/habits" component={HabitPage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
