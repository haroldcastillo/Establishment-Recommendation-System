import { 
  takeLatest,
  put,
  call,
  all,
  fork 
} 
from "redux-saga/effects";
import { useSelector } from "react-redux";
import {
  FETCH_ESTABLISHMENTS,
  fetchEstablishmentsSuccess,
  fetchEstablishmentsFailure
} 
from "../actions/establishments";

import {
  getEstablishments
}
from "../apis/establishments";

{/* ====== Async Function SAGA ====== */ }

function* fetchEstablishmentsSaga(props){
  try{
    const response = yield call(getEstablishments,props.payload);
    yield put(fetchEstablishmentsSuccess(response));
  }catch(error){
    yield put(fetchEstablishmentsFailure({error:error.toString()}));
  }
}

{/* ====== Watcher SAGA ====== */ }

function* watchFetchEstablishmentsSaga() {
  yield takeLatest(FETCH_ESTABLISHMENTS, fetchEstablishmentsSaga);
}



export default function* establishmentsSaga() {
  yield all([
    // fork(watchFetchEstablishmentsSaga)
    fork(watchFetchEstablishmentsSaga)
  ]);
}