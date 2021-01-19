import React from 'react';
import { useDispatch } from 'react-redux';
import { openModalAction } from '../../redux/actions/ui';

const AddNewFab = () => {
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(openModalAction())}
            className="btn btn-primary fab">
            <i className="fas fa-plus"></i>
        </button>
    );
};

export default AddNewFab;
