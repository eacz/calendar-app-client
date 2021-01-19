import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../redux/actions/ui';
import customStyles from '../../helpers/modalCustomStyles';
import {
    addNewEvent,
    clearActiveEvent,
    updateEvent,
} from '../../redux/actions/calendar';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endM = now.clone().add(1, 'hours');
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endM.toDate(),
};

const CalendarModal = () => {
    //redux
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.ui.modalOpen);
    const activeEvent = useSelector((state) => state.calendar.activeEvent);

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endM.toDate());
    const [isTitleValid, setIsTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { title, notes, start, end } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const closeModal = () => {
        dispatch(closeModalAction());
        setFormValues(initEvent);
        dispatch(clearActiveEvent());
    };

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({ ...formValues, start: e });
    };

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({ ...formValues, end: e });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire(
                'Error',
                'The end date must be greater than the start date',
                'error'
            );
            return;
        }

        if (title.trim() < 2) {
            setIsTitleValid(false);
            return;
        }
        setIsTitleValid(true);
        closeModal();
        if (activeEvent) {
            dispatch(updateEvent(formValues));
        } else {
            dispatch(
                addNewEvent({
                    ...formValues,
                    //temporal
                    id: new Date().getTime(),
                    user: { _id: 'dsadsf', name: 'Pepe' },
                })
            );
        }
    };

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent)
        }
    }, [activeEvent]);

    return (
        <Modal
            isOpen={modalOpen}
            //onAfterOpen={}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="ola"
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background">
            <h1>{activeEvent ? 'Edit event' : 'New Event'} </h1>
            <hr />
            <form onSubmit={handleSubmit} className="container">
                <div className="form-group">
                    <label>Start date and hour</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={dateStart}
                        maxDate={dateEnd}
                    />
                </div>

                <div className="form-group">
                    <label>End date and hour</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title and notes</label>
                    <input
                        value={title}
                        onChange={handleInputChange}
                        type="text"
                        className={`form-control ${
                            !isTitleValid && 'is-invalid'
                        }`}
                        placeholder="Event's title"
                        name="title"
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Short Description
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        value={notes}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Aditional Info
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    );
};

export default CalendarModal;
