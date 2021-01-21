const types = {
    //ui
    uiOpenModal: '[UI] open modal',
    uiCloseModal: '[UI] close modal',

    //calendar
    calendarEventsLoaded : '[calendar] events loaded',
    calendarStartNewEvent : '[calendar] start add new',
    calendarAddNewEvent: '[calendar] add new event',
    calendarSetActiveEvent: '[calendar] set active event',
    calendarClearActiveEvent: '[calendar] clear active event',
    calendarUpdateEvent: '[calendar] update event',
    calendarDeleteEvent: '[calendar] delete event',
    calendarLogout: '[calendar] logout clear state',

    //auth
    authChecking: '[auth] checking login state',
    authCheckingFinish: '[auth] finish login state',
    authStartLogin: '[auth] start login',
    authLogin: '[auth] login',
    authStartRegister: '[auth] start register',
    authStartTokenRenew: '[auth] start token renew',
    authLogout: '[auth] logout',
};

export default types;
