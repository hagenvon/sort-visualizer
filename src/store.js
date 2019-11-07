import {createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { watchSortingActions } from './sagas'
import reducer from "./reducers";


const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

);
sagaMiddleware.run(watchSortingActions);


export default store
