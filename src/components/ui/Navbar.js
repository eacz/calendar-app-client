import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';

const Navbar = () => {
    const Username = useSelector((state) => state.auth.name);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">{Username}</span>
            <button onClick={handleLogout} className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Logout</span>
            </button>
        </div>
    );
};

export default Navbar;
