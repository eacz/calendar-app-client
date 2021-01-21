import moment from 'moment';

const refactorEventsDate = (events = []) => {
    return events.map((event) => ({
        ...event,
        dateStart: moment(event.dateStart).toDate(),
        dateEnd: moment(event.dateEnd).toDate(),
    }));
};

export default refactorEventsDate;
