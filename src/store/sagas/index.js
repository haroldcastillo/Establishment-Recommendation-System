import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import authSaga from "./auth";
import establishmentsSaga from "./establishments";
function* rootSaga() {
	yield all([
		// Add other sagas here if you have more than one
		fork(userSaga),
    fork(authSaga),
    fork(establishmentsSaga)
	]);
}

export default rootSaga;
