import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectAuthRoute = ({ component: Component, ...rest}) => (
  <Route 
    {...rest}
    render={props => localStorage.getItem("token") ? (
      <Redirect to ="/dashboard" />
    ) : (
      <Component {...props} />
      )
    }
  />
);

export default RedirectAuthRoute;