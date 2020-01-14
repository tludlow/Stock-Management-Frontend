import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router'
import rootReducer from './reducers/index';
import thunk from "redux-thunk";
import throttle from 'lodash/throttle';

//Local storage functions to save/load the application state to and from localStorage
import {loadState, saveState} from "./localStorage";


//In development it's useful to have some debugging for the state, this enables that
const enhancers = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f);

//The starting state of a user if they have no locally saved state, this is defined as development progresses
const initialState = {
};

const persistedState = loadState();

//const store = createStore(rootReducer, persistedState, enhancers);
const store = createStore(rootReducer, {...initialState, ...persistedState}, enhancers);

//we export history because we need it in `index.js` to feed into <Router>
export const history = syncHistoryWithStore(browserHistory, store);


//Enable Hot Reloading for the reducers, We re-require() the reducers whenever any new code has been written. 
//Webpack handles most of the reloading stuff for us.
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

//Interval (in milliseconds) that the application state is stored to the localStorage
const stateRefreshLength = 1000;

store.subscribe(throttle(() => {
    //const state = store.getState();
    let stateToSave = {
        //You can construct the state in here which you want to save in the format you desire.
    }
    saveState(stateToSave);
}, stateRefreshLength));

export default store;
