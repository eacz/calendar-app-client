import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import types from '../types';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const res = await fetchWithoutToken(
            'auth',
            { email, password },
            'POST'
        );
        const body = await res.json();
        if (body.ok) {
            localStorage.setItem('c-token', body.token);
            localStorage.setItem('c-token-init-date', new Date().getTime());

            dispatch(login({ uid: body.uid, name: body.name }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    };
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const res = await fetchWithoutToken(
            'auth/new',
            { email, password, name },
            'POST'
        );
        const body = await res.json();
        if (body.ok) {
            const { uid, name, token } = body;
            localStorage.setItem('c-token', token);
            localStorage.setItem('c-token-init-date', new Date().getTime());
            dispatch(login({ uid, name }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    };
};

export const startChecking = () => {
    return async (dispatch) => {
        const res = await fetchWithToken('auth/renew');
        const body = await res.json();
        if (body.ok) {
            const { uid, name, token } = body;
            localStorage.setItem('c-token', token);
            localStorage.setItem('c-token-init-date', new Date().getTime());
            dispatch(login({ uid, name }));
        } else {
            dispatch(checkingFinish());
        }
    };
};

const checkingFinish = () => ({
    type: types.authCheckingFinish,
});

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('c-token');
        localStorage.removeItem('c-token-init-date');
        dispatch(logout());
    };
};

export const logout = () => ({ type: types.authLogout });
