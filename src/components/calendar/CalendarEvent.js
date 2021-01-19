import React from 'react'

const CalendarEvent = ({event}) => {
    const {title, user: {name}} = (event);
    return (
        <div>
            <strong>{title}</strong>
            <strong>-{name}</strong>
        </div>
    )
}

export default CalendarEvent
