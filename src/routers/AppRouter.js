import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startChecking } from '../redux/actions/auth';

const AppRouter = () => {
    const dispatch = useDispatch();
    const checking = useSelector(state => state.auth.checking)

    useEffect(() => {
        dispatch(startChecking())
        
    }, [dispatch])

    //TODO: do a properly loading page
    if(checking){
        return (<div>Loading...</div>)
    }
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/" component={CalendarScreen}  />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
