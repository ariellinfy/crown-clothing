import { takeLatest, call, put, all } from 'redux-saga/effects';
import { createContactMessageDocument } from '../../firebase/firebase.utils';
import ContactActionTypes from './contact-types';
import { contactSuccess, contactFailure } from './contact-actions';

export function* sendMessage(userMessage) {
    try {
        yield call(createContactMessageDocument, userMessage);
        yield put(contactSuccess());
    } catch (error) {
        yield put(contactFailure(error));
    }
}

export function* onContactStart() {
    yield takeLatest(ContactActionTypes.CONTACT_START, sendMessage);
}

export function* contactSagas() {
    yield all([
        call(onContactStart)
    ]);
}