import types from '../types';

const initialState = {
    modalOpen: false,
};

const UIReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return { ...state, modalOpen: true };

        case types.uiCloseModal:
            return { ...state, modalOpen: false };

        default:
            return state;
    }
};

export default UIReducer