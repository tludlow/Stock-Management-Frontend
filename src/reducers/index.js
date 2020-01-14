import {combineReducers} from 'redux';
//Stores the state information for the browser history
import {routerReducer} from 'react-router-redux'; 

/*
 * Reducers handle an action and create a new state, replacing the old.
 * As redux state is immutable the need for reducers is ever more present.
 */
    

/*
 *  Reducersa must be combined into a singular reducer before they can be used in the application, this is done below.
 *   An example of multiple reducers combined is provided below, you must import the reducer first.
 *   EXAMPLE: const rootReducer = combineReducers({routing: routerReducer, userState, userReducer});
 */
const rootReducer = combineReducers({routing: routerReducer});

export default rootReducer;