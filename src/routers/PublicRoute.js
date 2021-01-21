import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

const PublicRoute = ({component: Component, isAuthenticated, ...rest}) => {
    return (
        <Route 
        {...rest}
        component={props  => (
            !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />  
        )}
        
        />
    )
}

export default PublicRoute

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}