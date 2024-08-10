import { takeLatest,put,call,all,fork } from "redux-saga/effects";
import {
  LOGIN_USER_START,
  loginUserSuccess,
  loginUserFailure,
  LOGOUT_USER_START,
  logoutUserSuccess,
  logoutUserFailure,
  STATUS_CHECKER_START,
  statusCheckerSuccess,
  statusCheckerFailure
} from "../actions/auth";

import{
  login,
  logout,
  checkstatus
} from "../apis/auth";

{/* ====== Async Function SAGA ====== */ }
function* loginUserSaga(props){
  try{
    const response = yield call(login,props.payload);
    yield put(loginUserSuccess({
      token: response.accessToken,
      userId: response.userId
    }))
  }catch(error){
    yield put(loginUserFailure({error:error.toString()}));
  }
}

function* logoutUserSaga(){
  try{
    const response = yield call(logout);
    yield put(logoutUserSuccess());
  }catch(error){
    yield put(logoutUserFailure({error:error.toString()}));
  }
}


function* statusCheckerSaga(){
  try{
    const response = yield call(checkstatus);
    yield put(statusCheckerSuccess(response));
  }catch(error){
    yield put(statusCheckerFailure({error:error.toString()}));
  }
}





{/* ====== Watcher SAGA ====== */ }
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
    fork(watchLoginUserSaga),
    fork(watchLogoutUserSaga),
    fork(watchStatusCheckerSaga)
  ]);
}