/**
 * States cycled through when retrieving a resource
 * @enum {string}
 */
export const LoadingStates = {
  CLEAN: 'CLEAN',         //// resource retrieval has not begun
  LOADING: 'LOADING',     //// resource retrieval has begun
  LOADED: 'LOADED'        //// resource has been retrieved
};

/**
 * Array of values of LoadingStates for use in React.PropTypes to avoid duplicating logic
 */
export const LoadingStatesValues = Object.keys(LoadingStates).map(key => LoadingStates[key]);
