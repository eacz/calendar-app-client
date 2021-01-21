import types from '../types';
const initialState = {
    events: [],
    activeEvent: null,
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.calendarSetActiveEvent:
            return { ...state, activeEvent: action.payload };
        case types.calendarAddNewEvent:
            console.log(action.payload);
            return { ...state, events: [action.payload, ...state.events] };
        case types.calendarClearActiveEvent:
            return { ...state, activeEvent: null };
        case types.calendarUpdateEvent:
            console.log(action.payload);
            return {
                ...state,
                events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)),
            };
        case types.calendarDeleteEvent:
            return {
                ...state,
                events: state.events.filter((event) => event.id !== state.activeEvent.id),
                activeEvent: null,
            };
        case types.calendarEventsLoaded:
            return { ...state, events: [...action.payload] };
        case types.calendarLogout:
            return { ...initialState };
        default:
            return state;
    }
};

export default calendarReducer;
