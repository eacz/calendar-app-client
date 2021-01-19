import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { messages } from '../../helpers/calendarConfig';

//components
import CalendarEvent from './CalendarEvent';
import Navbar from '../ui/Navbar';
import CalendarModal from './CalendarModal';

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#ffffff',
        };
        return {
            style,
        };
    };

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const events = [
        {
            title: 'test title',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'ay no c',
            user: { id: 123, name: 'Pepe' },
        },
    ];

    const onDoubleClick = (e) => {
        console.log(e);
    };

    const onSelectEvent = (e) => {
        console.log(e);
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
            />
            <CalendarModal /> 
        </div>
    );
};

export default CalendarScreen;
