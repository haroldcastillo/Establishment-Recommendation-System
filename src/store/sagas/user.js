import { takeLatest, put, call, all, fork } from "redux-saga/effects";
import {
  FETCH_USER_LOGIN,
  fetchUserLoginSuccess,
  fetchUserLoginFailure
} from "../actions/user";

import {
  getUserLogin
} from "../apis/user";


{/* ====== Async Function SAGA ====== */ }

function* fetchUserLoginSaga({ payload }) {
  try {
    const response = yield call(getUserLogin, payload);
    console.warn(response);
    yield put(fetchUserLoginSuccess(response));
  } catch (error) {
    yield put(fetchUserLoginFailure(error));
  }
}


{/* ====== WATCHER SAGA ====== */ }

function* watchFetchUserLogin() {
  yield takeLatest(FETCH_USER_LOGIN, fetchUserLoginSaga);
}


export default function* userSaga() {
	yield all([
    fork(watchFetchUserLogin),
	]);
}
