import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import NavBar from "./components/NavBar/NavBar";
import SecuredRoute from './components/Secured/SecuredRoute';
import UserHome from './components/Secured/UserHome'
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <SecuredRoute expact path="/user" component={UserHome}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
