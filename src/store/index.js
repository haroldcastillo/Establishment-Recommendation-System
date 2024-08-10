import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index.js";
import { createLogger } from "redux-logger";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
	predicate: (getState, action) => process.env.NODE_ENV === "development",
	// Other options can be added here if needed
});
const store = configureStore({
  reducer:rootReducer,
  middleware:()=>[sagaMiddleware,loggerMiddleware]
})

sagaMiddleware.run(rootSaga);

export default store;
