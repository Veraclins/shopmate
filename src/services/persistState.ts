import storage from 'helpers/storage';

/**
 * @description Loads the state from  If no state is found,
 * return undefined so that reducers can instantiate the state.
 */
export const loadState = () => {
  try {
    const serializedState = storage.getItem('state');
    if (serializedState === null || serializedState === 'undefined')
      return undefined;
    const state = JSON.parse(serializedState);
    return state;
  } catch (err) {
    return undefined;
  }
};

/**
 * @description Saves a copy of the state to the browser's localStorage
 * @param {object} state The state object
 */
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    return storage.setItem('state', serializedState);
  } catch (error) {
    return null;
  }
};
