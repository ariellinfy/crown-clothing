import ContactActionTypes from './contact-types';

export const contactStart = userMessage => ({
    type: ContactActionTypes.CONTACT_START,
    payload: userMessage
});

export const contactSuccess = () => ({
    type: ContactActionTypes.CONTACT_SUCCESS,
});

export const contactFailure = error => ({
    type: ContactActionTypes.CONTACT_FAILURE,
    payload: error
});