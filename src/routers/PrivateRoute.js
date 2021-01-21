import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
    localStorage.setItem('lastPath',rest.location.pathname);
    return (
        <Route 
        {...rest}
        component={props  => (
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />  
        )}
        
        />
    )
}

export default PrivateRoute

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}