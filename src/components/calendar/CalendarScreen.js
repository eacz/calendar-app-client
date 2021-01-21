import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { messages } from '../../helpers/calendarConfig';

//components
import CalendarEvent from './CalendarEvent';
import Navbar from '../ui/Navbar';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../../redux/actions/ui';
import {
    clearActiveEvent,
    setActiveEvent,
    StartEventsLoading,
} from '../../redux/actions/calendar';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
    const uid = useSelector(state => state.auth.uid)
    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor: uid.toString() === event.user._id ? '#367CF7' : '#465660' ,
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#ffffff',
        };
        return {
            style,
        };
    };
    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const { events, activeEvent } = useSelector((state) => state.calendar);

    const onDoubleClick = (e) => {
        dispatch(openModalAction());
    };

    const onSelectEvent = (e) => {
        dispatch(setActiveEvent(e));
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    const onSelectSlot = (e) => {
        dispatch(clearActiveEvent());
    };

    useEffect(() => {
        dispatch(StartEventsLoading());
    }, [dispatch]);

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="dateStart"
                endAccessor="dateEnd"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
            />
            {activeEvent && <DeleteEventFab />}
            <AddNewFab />

            <CalendarModal />
        </div>
    );
};

export default CalendarScreen;
