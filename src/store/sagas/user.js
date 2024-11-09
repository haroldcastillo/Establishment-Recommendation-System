import { takeLatest, put, call, all, fork } from "redux-saga/effects";
import {
    FETCH_USER_LOGIN,
    fetchUserLoginSuccess,
    fetchUserLoginFailure,
    UPDATE_PREFERENCES,
    updatePreferencesSuccess,
    updatePreferencesFailure,
    UPDATE_USER,
    updateUserSuccess,
    updateUserFailure,
    UPDATE_PASSWORD,
    updatePasswordSuccess,
    updatePasswordFailure,
    FETCH_ALL_USERS,
    fetchAllUsersSuccess,
    fetchAllUsersFailure,
} from "../actions/user";

import {
    getUserLogin,
    updatePreferences,
    updateUser,
    updatePassword,
    getAllUsers,
} from "../apis/user";

{
    /* ====== Async Function SAGA ====== */
}

function* fetchUserLoginSaga({ payload }) {
    try {
        const response = yield call(getUserLogin, payload);
        yield put(fetchUserLoginSuccess(response));
    } catch (error) {
        yield put(fetchUserLoginFailure(error));
    }
}

function* updatePreferencesSaga({ payload }) {
    try {
        const response = yield call(updatePreferences, payload);
        yield put(updatePreferencesSuccess(response));
    } catch (error) {
        yield put(updatePreferencesFailure(error));
    }
}
function* updateUserSaga({ payload }) {
    try {
        const response = yield call(updateUser, payload);
        yield put(updateUserSuccess(response));
    } catch (error) {
        yield put(updateUserFailure(error));
    }
}

function* updatePasswordSaga({ payload }) {
    try {
        const response = yield call(updatePassword, payload);
        console.log(response);
        yield put(updatePasswordSuccess(response));
    } catch (error) {
        yield put(updatePasswordFailure(error.message));
    }
}

function* fetchAllUsersSaga() {
    try {
        const response = yield call(getAllUsers);
        yield put(fetchAllUsersSuccess(response));
    } catch (error) {
        yield put(fetchAllUsersFailure(error));
    }
}

{
    /* ====== WATCHER SAGA ====== */
}

function* watchFetchUserLogin() {
    yield takeLatest(FETCH_USER_LOGIN, fetchUserLoginSaga);
}

function* watchUpdatePreferences() {
    yield takeLatest(UPDATE_PREFERENCES, updatePreferencesSaga);
}

function* watchUpdateUser() {
    yield takeLatest(UPDATE_USER, updateUserSaga);
}

function* watchUpdatePassword() {
    yield takeLatest(UPDATE_PASSWORD, updatePasswordSaga);
}

function* watchFetchAllUsers() {
    yield takeLatest(FETCH_ALL_USERS, fetchAllUsersSaga);
}

{
    /* ====== COMBINED SAGA ====== */
}

export default function* userSaga() {
    yield all([
        fork(watchFetchUserLogin),
        fork(watchUpdatePreferences),
        fork(watchUpdateUser),
        fork(watchUpdatePassword),
        fork(watchFetchAllUsers),
    ]);
}
