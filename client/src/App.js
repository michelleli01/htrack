import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SecuredRoute from "./components/Secured/SecuredRoute";
import UserHome from "./components/Secured/UserHome";

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
    return (
        <div>
            <Router>
                <div className="main-wrapper">
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <SecuredRoute
                            expact
                            path="/user"
                            component={UserHome}
                        />
                    </Switch>
                    {/* <Footer /> */}
                </div>
            </Router>
        </div>
    );
}

export default App;
