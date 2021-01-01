import { all, call, takeLatest, put } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import UserActionTypes from '../user/user-types';
import { loadUserCartItems, clearCart } from './cart-actions';

export function* loadCartOnSignIn({ payload }) {
    try {
        const userRef = firestore.doc(`users/${payload.id}`);
        const userSnapshot = yield userRef.get();
        const items = userSnapshot.data().cartItems;
        yield put(loadUserCartItems(items));
    } catch (error) {
        yield console.log('error loading cart items');
    }
}

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignInSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, loadCartOnSignIn);
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onSignInSuccess)
    ]);
}