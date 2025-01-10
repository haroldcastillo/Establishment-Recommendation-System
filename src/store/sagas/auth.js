import { takeLatest, put, call, all, fork } from "redux-saga/effects";
import {
    LOGIN_USER_START,
    loginUserSuccess,
    loginUserFailure,
    LOGOUT_USER_START,
    logoutUserSuccess,
    logoutUserFailure,
    STATUS_CHECKER_START,
    statusCheckerSuccess,
    statusCheckerFailure,
    REGISTER_USER_START,
    registerUserSuccess,
    registerUserFailure,
} from "../actions/auth";

import { register, login, logout, checkstatus } from "../apis/auth";

{
    /* ====== Async Function SAGA ====== */
}
function* registerUserSaga(props) {
    try {
        const response = yield call(register, props.payload);
        yield put(
            registerUserSuccess({
                token: response.accessToken,
                userId: response.userId,
            })
        );
    } catch (error) {
        yield put(registerUserFailure({ error: error.toString() }));
    }
}

function* loginUserSaga(props) {
    try {
        const response = yield call(login, props.payload);
        yield put(
            loginUserSuccess({
                token: response.accessToken,
                userId: response.userId,
            })
        );
        localStorage.removeItem("failedLoginCount");
    } catch (error) {
        if (error.response.data.message === "Invalid Password") {
            if (
                localStorage.getItem("failedLoginCount") === null ||
                localStorage.getItem("failedLoginCount") === undefined
            ) {
                localStorage.setItem("failedLoginCount", 1);
            }
            if (localStorage.getItem("failedLoginCount") >= 3) {
                alert(
                    "You have reached the maximum number of login attempts. Please try again later."
                );
                localStorage.removeItem("failedLoginCount");

                const failedLoginTime = new Date();
                failedLoginTime.setMinutes(failedLoginTime.getMinutes() + 1);
                localStorage.setItem(
                    "failedLoginTime",
                    failedLoginTime.getTime()
                );
            } else {
                localStorage.setItem(
                    "failedLoginCount",
                    parseInt(localStorage.getItem("failedLoginCount")) + 1
                );
            }
        }
        alert(error.response.data.message);
        // yield put(loginUserFailure({ error: error.toString() }));
    }
}

function* logoutUserSaga() {
    try {
        const response = yield call(logout);
        yield put(logoutUserSuccess());
    } catch (error) {
        yield put(logoutUserFailure({ error: error.toString() }));
    }
}

function* statusCheckerSaga() {
    try {
        const response = yield call(checkstatus);
        yield put(statusCheckerSuccess(response));
    } catch (error) {
        yield put(statusCheckerFailure({ error: error.toString() }));
    }
}

{
    /* ====== Watcher SAGA ====== */
}
function* watchRegisterUserSaga() {
    yield takeLatest(REGISTER_USER_START, registerUserSaga);
}

function* watchLoginUserSaga() {
    yield takeLatest(LOGIN_USER_START, loginUserSaga);
}

function* watchLogoutUserSaga() {
    yield takeLatest(LOGOUT_USER_START, logoutUserSaga);
}

function* watchStatusCheckerSaga() {
    yield takeLatest(STATUS_CHECKER_START, statusCheckerSaga);
}

export default function* authSaga() {
    yield all([
        fork(watchRegisterUserSaga),
        fork(watchLoginUserSaga),
        fork(watchLogoutUserSaga),
        fork(watchStatusCheckerSaga),
    ]);
}
