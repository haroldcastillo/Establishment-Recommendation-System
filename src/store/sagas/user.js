import { takeLatest, put, call, all, fork } from "redux-saga/effects";
import {
  FETCH_USERS_LIST_START,
  fetchUsersListSuccess,
  fetchUsersListFailure,
  DELETE_USER,
  deleteUserSuccess,
  UPDATE_USER,
  updateUserSuccess,
} from "../actions/user";

import {
  getUserList,
  updateUser,
  deleteUser 
} from "../apis/user";


{/* ====== Async Function SAGA ====== */ }

function* fetchUsersListSaga() {
  try {
    const response = yield call(getUserList);
    yield put(fetchUsersListSuccess(response )); 
  } catch (error) {
    yield put(fetchUsersListFailure({ error: error.toString() }));
  }
}


function* updateUserSaga(props) {
  try{
    const response = yield updateUser(props.payload);
    yield put(updateUserSuccess(response))
  }catch(error){
    console.log(error)
  }
}

function* deleteUserSaga(props) {
  try{
    const response = yield deleteUser(props.payload)
    yield put(deleteUserSuccess({_id:props.payload.id}))
  }catch(error){
    console.log(error)
  }
}


{/* ====== WATCHER SAGA ====== */ }
function* watchFetchUsersSaga() {
	yield takeLatest(FETCH_USERS_LIST_START, fetchUsersListSaga);
}

function* watchDeleteUserSaga() {
	yield takeLatest(DELETE_USER, deleteUserSaga);
}
function* watchUpdateUserSaga() {
  yield takeLatest(UPDATE_USER, updateUserSaga);
}

export default function* userSaga() {
	yield all([
		fork(watchFetchUsersSaga),
    fork(watchDeleteUserSaga),
    fork(watchUpdateUserSaga),
	]);
}
