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
        default:
            return state;
    }
};

export default calendarReducer;
