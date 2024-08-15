import { takeLatest, put, call, all, fork } from "redux-saga/effects";
import {
  FETCH_USER_LOGIN,
  fetchUserLoginSuccess,
  fetchUserLoginFailure,
  UPDATE_PREFERENCES,
  updatePreferencesSuccess,
  updatePreferencesFailure
} from "../actions/user";

import {
  getUserLogin,
  updatePreferences
} from "../apis/user";


{/* ====== Async Function SAGA ====== */ }

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



{/* ====== WATCHER SAGA ====== */ }

function* watchFetchUserLogin() {
  yield takeLatest(FETCH_USER_LOGIN, fetchUserLoginSaga);
}

function* watchUpdatePreferences() {
  yield takeLatest(UPDATE_PREFERENCES, updatePreferencesSaga);
}


export default function* userSaga() {
	yield all([
    fork(watchFetchUserLogin),
    fork(watchUpdatePreferences)
	]);
}
