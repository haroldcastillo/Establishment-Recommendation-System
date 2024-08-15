import { 
  takeLatest,
  put,
  call,
  all,
  fork 
} 
from "redux-saga/effects";

import {
  FETCH_FAVORITE_USERS,
  fetchFavoriteUsersSuccess,
  fetchFavoriteUsersFailure,
  ADD_FAVORITE,
  addFavoriteSuccess,
  addFavoriteFailure,
  REMOVE_FAVORITE,
  removeFavoriteSuccess,
  removeFavoriteFailure,
  FETCH_MY_FAVORITES,
  fetchMyFavorites,
  fetchMyFavoritesSuccess,
  fetchMyFavoritesFailure
}
from "../actions/favorite";

import {
  getFavoriteByUser,
  addFavorite,
  removeFavorite,
  getMyFavorites
}
from "../apis/favorite";


function* fetchFavoriteUsersSaga(props) {
  try {
    const response = yield call(getFavoriteByUser,props.payload.userId);
    yield put(fetchFavoriteUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchFavoriteUsersFailure(error));
  }
}

function* addFavoriteSaga(props) { 
  try {
    const response = yield call(addFavorite, props.payload);
    yield put(addFavoriteSuccess(response.data));
  } catch (error) {
    yield put(addFavoriteFailure(error));
  }
}
function* removeFavoriteSaga(props) {
  try {
    const response = yield call(removeFavorite, props.payload.id);
    yield put(removeFavoriteSuccess(response.data));
    yield put(fetchMyFavorites({ userId: response.data.userId }));

  } catch (error) {
    yield put(removeFavoriteFailure(error));
  }
}

function* fetchMyFavoritesSaga(props) {
  try {
    const response = yield call(getMyFavorites, props.payload.userId);
    yield put(fetchMyFavoritesSuccess(response.data));
  } catch (error) {
    yield put(fetchMyFavoritesFailure(error));
  }
}






function* watchFetchFavoriteUsers() {
  yield takeLatest(FETCH_FAVORITE_USERS, fetchFavoriteUsersSaga);
}

function* watchAddFavorite() {
  yield takeLatest(ADD_FAVORITE, addFavoriteSaga);
}

function* watchRemoveFavorite() {
  yield takeLatest(REMOVE_FAVORITE, removeFavoriteSaga);
}

function* watchFetchMyFavorites() {
  yield takeLatest(FETCH_MY_FAVORITES, fetchMyFavoritesSaga);
}



export default function* establishmentsSaga() {
  yield all([
    fork(watchFetchFavoriteUsers),
    fork(watchAddFavorite),
    fork(watchRemoveFavorite),
    fork(watchFetchMyFavorites),
  ]);
}
