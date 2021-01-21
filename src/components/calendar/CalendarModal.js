import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../redux/actions/ui';
import customStyles from '../../helpers/modalCustomStyles';
import { clearActiveEvent, StartAddNewEvent, startUpdateEvent } from '../../redux/actions/calendar';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endM = now.clone().add(1, 'hours');
const initEvent = {
        title: '',
        notes: '',
        dateStart: now.toDate(),
        dateEnd: endM.toDate(),
    };

const CalendarModal = () => {
    
    //redux
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.ui.modalOpen);
    const activeEvent = useSelector((state) => state.calendar.activeEvent);

    const [initStart, setInitDateStart] = useState(now.toDate());
    const [initEnd, setInitDateEnd] = useState(endM.toDate());
    const [isTitleValid, setIsTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);
    const { title, notes, dateStart, dateEnd } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const closeModal = () => {
        setFormValues(initEvent);
        dispatch(clearActiveEvent());
        dispatch(closeModalAction());
    };

    const handleStartDateChange = (e) => {
        setInitDateStart(e);
        setFormValues({ ...formValues, dateStart: e });
    };

    const handleEndDateChange = (e) => {
        setInitDateEnd(e);
        setFormValues({ ...formValues, dateEnd: e });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const momentStart = moment(dateStart);
        const momentEnd = moment(dateEnd);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'The end date must be greater than the start date', 'error');
            return;
        }

        if (title.trim() < 2) {
            setIsTitleValid(false);
            return;
        }
        setIsTitleValid(true);
        closeModal();
        if (activeEvent) {
            dispatch(startUpdateEvent(formValues));
        } else {
            dispatch(StartAddNewEvent(formValues));
        }
    };

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent]);

    return (
        <Modal
            isOpen={modalOpen}
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
                        value={activeEvent ? dateStart : initStart}
                        maxDate={initEnd}
                    />
                </div>

                <div className="form-group">
                    <label>End date and hour</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleEndDateChange}
                        value={activeEvent ? dateEnd : initEnd}
                        minDate={initStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title and notes</label>
                    <input
                        value={title}
                        onChange={handleInputChange}
                        type="text"
                        className={`form-control ${!isTitleValid && 'is-invalid'}`}
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

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    );
};

export default CalendarModal;
