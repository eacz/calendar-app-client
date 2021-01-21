import Swal from 'sweetalert2';
import { fetchWithToken } from '../../helpers/fetch';
import refactorEventsDate from '../../helpers/refactorEventsDate';
import types from '../types';

export const setActiveEvent = (event) => ({
    type: types.calendarSetActiveEvent,
    payload: event,
});

export const StartAddNewEvent = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;
        try {
            const res = await fetchWithToken('events', event, 'POST');
            const body = await res.json();
            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    uid,
                    name,
                };
                dispatch(addNewEvent(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const addNewEvent = (event) => ({
    type: types.calendarAddNewEvent,
    payload: event,
});

export const clearActiveEvent = () => ({
    type: types.calendarClearActiveEvent,
});

export const startUpdateEvent = (event) => {
    return async (dispatch) => {
        try {
            const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await res.json();
            if (body.ok) {
                dispatch(updateEvent(event));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Something went wrong. Please try again', 'error');
        }
    };
};

const updateEvent = (event) => ({
    type: types.calendarUpdateEvent,
    payload: event,
});

export const eventDeleted = () => ({
    type: types.calendarDeleteEvent,
});

export const StartEventsLoading = () => {
    return async (dispatch) => {
        try {
            const res = await fetchWithToken('events');
            const body = await res.json();
            const events = refactorEventsDate(body.events);

            if (body.ok) {
                dispatch(eventsLoaded(events));
            } else {
                Swal.fire('error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Something Went wrong, please refresh the page', 'error');
        }
    };
};

const eventsLoaded = (events) => ({
    type: types.calendarEventsLoaded,
    payload: events,
});
