import types from '../types';

export const setActiveEvent = (event) => ({
    type: types.calendarSetActiveEvent,
    payload: event,
});

export const addNewEvent = (event) => ({
    type: types.calendarAddNewEvent,
    payload: event,
});
