import types from '../types';

export const setActiveEvent = (event) => ({
    type: types.calendarSetActiveEvent,
    payload: event,
});

export const addNewEvent = (event) => ({
    type: types.calendarAddNewEvent,
    payload: event,
});

export const clearActiveEvent = (event) => ({
    type: types.calendarClearActiveEvent,
});

export const updateEvent = (event) => ({
    type: types.calendarUpdateEvent,
    payload: event,
});

export const eventDeleted = () => ({
    type: types.calendarDeleteEvent,
});
