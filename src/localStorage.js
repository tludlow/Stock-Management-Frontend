
const localStorageName = "cs261group23";

/**
 * Load the local storage state into the application state.
 * 
 * @return {undefined} Returns undefined if the state could not be loaded, otherwise it loads the state.
 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(localStorageName);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

/**
 * Saves the current application state to the local storage state
 * @param {JSON} state The current application state
 */
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(localStorageName, serializedState);
    } catch (err) {
        console.log(err);
    }
}
