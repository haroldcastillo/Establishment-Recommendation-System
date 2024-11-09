import { takeLatest, put, call, all, fork } from "redux-saga/effects";
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
    FETCH_ALL_ESTABLISHMENTS,
    fetchAllEstablishmentsSuccess,
    fetchAllEstablishmentsFailure,
    VERIFY_ESTABLISHMENT,
    verifyEstablishmentSuccess,
    verifyEstablishmentFailure,
} from "../actions/establishments";

import {
    getEstablishments,
    getEstablishment,
    createEstablishment,
    getEstablishmentByUser,
    addViews,
    updateEstablishment,
    deleteEstablishment,
    getAllEstablishments,
    verifyEstablishment,
} from "../apis/establishments";

{
    /* ====== Async Function SAGA ====== */
}

function* createEstablishmentSaga(props) {
    try {
        const response = yield call(createEstablishment, props.payload);
        yield put(createEstablishmentSuccess(response.data));
    } catch (error) {
        yield put(createEstablishmentFailure({ error: error.toString() }));
    }
}

function* fetchEstablishmentsSaga(props) {
    try {
        const response = yield call(getEstablishments, props.payload);
        yield put(fetchEstablishmentsSuccess(response));
    } catch (error) {
        yield put(fetchEstablishmentsFailure({ error: error.toString() }));
    }
}

function* fetchAllEstablishmentsSaga() {
    try {
        const response = yield call(getAllEstablishments);
        yield put(fetchAllEstablishmentsSuccess(response));
    } catch (error) {
        yield put(fetchAllEstablishmentsFailure({ error: error.toString() }));
    }
}

function* fetchEstablishmentSaga(props) {
    try {
        const response = yield call(getEstablishment, props.payload);
        yield put(fetchEstablishmentSuccess(response));
        yield call(addViews, props.payload);
    } catch (error) {
        yield put(fetchEstablishmentFailure({ error: error.toString() }));
    }
}

function* fetchOwnedEstablishmentsSaga(props) {
    try {
        const response = yield call(
            getEstablishmentByUser,
            props.payload.userId
        );
        yield put(fetchOwnedEstablishmentsSuccess(response));
    } catch (error) {
        yield put(fetchOwnedEstablishmentsFailure({ error: error.toString() }));
    }
}

function* updateEstablishmentSaga(props) {
    try {
        const response = yield call(updateEstablishment, props.payload);
        yield put(updateEstablishmentSuccess(response.data));
    } catch (error) {
        yield put(updateEstablishmentFailure({ error: error.toString() }));
    }
}

function* deleteEstablishmentSaga(props) {
    try {
        const response = yield call(deleteEstablishment, props.payload);
        yield put(deleteEstablishmentSuccess(response.data));
    } catch (error) {
        yield put(deleteEstablishmentFailure({ error: error.toString() }));
    }
}

function* verifyEstablishmentSaga(props) {
    try {
        const response = yield call(verifyEstablishment, props.payload);
        yield put(verifyEstablishmentSuccess(response.data));
    } catch (error) {
        yield put(verifyEstablishmentFailure({ error: error.toString() }));
    }
}

{
    /* ====== Watcher SAGA ====== */
}

function* watchCreateEstablishmentSaga() {
    yield takeLatest(CREATE_ESTABLISHMENT, createEstablishmentSaga);
}

function* watchFetchAllEstablishmentsSaga() {
    yield takeLatest(FETCH_ALL_ESTABLISHMENTS, fetchAllEstablishmentsSaga);
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

function* watchVerifyEstablishmentSaga() {
    yield takeLatest(VERIFY_ESTABLISHMENT, verifyEstablishmentSaga);
}

{
    /* ====== Establishments SAGA ====== */
}

export default function* establishmentsSaga() {
    yield all([
        fork(watchCreateEstablishmentSaga),
        fork(watchFetchEstablishmentsSaga),
        fork(watchFetchEstablishmentSaga),
        fork(watchFetchOwnedEstablishmentsSaga),
        fork(watchUpdateEstablishmentSaga),
        fork(watchDeleteEstablishmentSaga),
        fork(watchFetchAllEstablishmentsSaga),
        fork(watchVerifyEstablishmentSaga),
    ]);
}
