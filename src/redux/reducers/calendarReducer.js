import moment from 'moment';
import types from '../types';
const initialState = {
    events: [
        {
            title: 'test title',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'ay no c',
            user: { id: 123, name: 'Pepe' },
            id: new Date().getTime(),
        },
    ],
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
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };
        case types.calendarDeleteEvent:
            return {
                ...state,
                events: state.events.filter(
                    (event) => event.id !== state.activeEvent.id
                ),
                activeEvent: null,
            };
        default:
            return state;
    }
};

export default calendarReducer;
