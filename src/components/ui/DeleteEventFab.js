import React from 'react';
import { useDispatch } from 'react-redux';
import { startDeleteEvent } from '../../redux/actions/calendar';

const DeleteEventFab = () => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(startDeleteEvent());
    };
    return (
        <button onClick={handleDelete} className="btn btn-danger fab-danger">
            <i className="fas fa-trash"></i>
            <span> Delete event</span>
        </button>
    );
};

export default DeleteEventFab;
