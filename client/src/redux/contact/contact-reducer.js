import ContactActionTypes from './contact-types';

const INITIAL_STATE = {
    errorMessage: undefined
};

const contactReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ContactActionTypes.CONTACT_SUCCESS:
            return {
                ...state,
            };
        case ContactActionTypes.CONTACT_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default contactReducer;