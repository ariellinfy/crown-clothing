import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, firestore, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import UserActionTypes from './user-types';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, reSignInStart, reSignInSuccess, reSignInFailure } from './user-actions';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* reSignInGetSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(reSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(reSignInFailure(error));
    }
}

export function* signInAfterSignUp({payload: { user, additionalData }}) {
    try {
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signUp({payload: { displayName, email, password }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: {displayName} }))
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
} 

export function* signOut({ payload: { cartItems, currentUser } }) {
    try {
        const userRef = firestore.doc(`users/${currentUser.id}`);
        try {
            yield userRef.set({
                ...currentUser,
                cartItems: cartItems,
        })} catch (error) {
            yield console.log('error updating user cart');
        }
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* reSignIn({ payload }) {
    try {
        yield reSignInGetSnapshotFromUserAuth(payload);
    } catch (error) {
        yield put(reSignInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield put(reSignInStart(userAuth));
    } catch (error) {
        yield put(reSignInFailure(error));
    }
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onReSignInStart() {
    yield takeLatest(UserActionTypes.RE_SIGN_IN_START, reSignIn);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield all([
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onCheckUserSession),
        call(onReSignInStart)
    ]);
}