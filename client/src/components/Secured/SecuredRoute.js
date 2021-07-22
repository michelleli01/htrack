import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from '../../auth/Auth';

export default function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={props => {
        return Auth.isUserAuthenticated() ? <Component {...props} /> : <Redirect push to={{
            pathname: '/login',
            from: props.location
        }}/>
      }}
    ></Route>
  )
}