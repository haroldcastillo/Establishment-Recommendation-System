import { 
  takeLatest,
  put,
  call,
  all,
  fork 
} 
from "redux-saga/effects";
import {
  FETCH_ESTABLISHMENTS,
  fetchEstablishmentsSuccess,
  fetchEstablishmentsFailure,
  FETCH_ESTABLISHMENT,
  fetchEstablishmentSuccess,
  fetchEstablishmentFailure,
  CREATE_ESTABLISHMENT,
  createEstablishmentSuccess,
  createEstablishmentFailure,
  FETCH_OWNED_ESTABLISHMENTS,
  fetchOwnedEstablishmentsSuccess,
  fetchOwnedEstablishmentsFailure,
  UPDATE_ESTABLISHMENT,
  updateEstablishmentSuccess,
  updateEstablishmentFailure,
  DELETE_ESTABLISHMENT,
  deleteEstablishmentSuccess,
  deleteEstablishmentFailure,
} 
from "../actions/establishments";


import {
  getEstablishments,
  getEstablishment,
  createEstablishment,
  getEstablishmentByUser,
  addViews,
  updateEstablishment,
  deleteEstablishment
}
from "../apis/establishments";

{/* ====== Async Function SAGA ====== */ }

function* createEstablishmentSaga(props){
  try{
    const response = yield call(createEstablishment,props.payload);
    yield put(createEstablishmentSuccess(response.data));
  }catch(error){
    yield put(createEstablishmentFailure({error:error.toString()}));
  }
}


function* fetchEstablishmentsSaga(props){
  try{
    const response = yield call(getEstablishments,props.payload);
    yield put(fetchEstablishmentsSuccess(response));
  }catch(error){
    yield put(fetchEstablishmentsFailure({error:error.toString()}));
  }
}

function* fetchEstablishmentSaga(props){
  try{
    const response = yield call(getEstablishment,props.payload);
    yield put(fetchEstablishmentSuccess(response));
    yield call(addViews,props.payload);
  }catch(error){
    yield put(fetchEstablishmentFailure({error:error.toString()}));
  }
}

function* fetchOwnedEstablishmentsSaga(props){
  try{
    const response = yield call(getEstablishmentByUser,props.payload.userId);
    yield put(fetchOwnedEstablishmentsSuccess(response));
  }catch(error){
    yield put(fetchOwnedEstablishmentsFailure({error:error.toString()}));
  }
}

function* updateEstablishmentSaga(props){
  try{
    const response = yield call(updateEstablishment,props.payload);
    yield put(updateEstablishmentSuccess(response.data));
  }catch(error){
    yield put(updateEstablishmentFailure({error:error.toString()}));
  }
}

function* deleteEstablishmentSaga(props){
  try{
    const response = yield call(deleteEstablishment,props.payload);
    yield put(deleteEstablishmentSuccess(response.data));
  }catch(error){
    yield put(deleteEstablishmentFailure({error:error.toString()}));
  }
}




{/* ====== Watcher SAGA ====== */ }

function* watchCreateEstablishmentSaga() {
  yield takeLatest(CREATE_ESTABLISHMENT, createEstablishmentSaga);
}

function* watchUpdateEstablishmentSaga() {
  yield takeLatest(UPDATE_ESTABLISHMENT, updateEstablishmentSaga);
}

function* watchFetchEstablishmentsSaga() {
  yield takeLatest(FETCH_ESTABLISHMENTS, fetchEstablishmentsSaga);
}

function* watchFetchEstablishmentSaga() {
  yield takeLatest(FETCH_ESTABLISHMENT, fetchEstablishmentSaga);
}

function* watchFetchOwnedEstablishmentsSaga() {
  yield takeLatest(FETCH_OWNED_ESTABLISHMENTS, fetchOwnedEstablishmentsSaga);
}

function* watchDeleteEstablishmentSaga() {
  yield takeLatest(DELETE_ESTABLISHMENT, deleteEstablishmentSaga);
}

{/* ====== Establishments SAGA ====== */ }

export default function* establishmentsSaga() {
  yield all([
    fork(watchCreateEstablishmentSaga),
    fork(watchFetchEstablishmentsSaga),
    fork(watchFetchEstablishmentSaga),
    fork(watchFetchOwnedEstablishmentsSaga),
    fork(watchUpdateEstablishmentSaga),
    fork(watchDeleteEstablishmentSaga),
  ]);
}