const defaultState = {
  timepoints: [],
  measurements: [],
};

const timepointManager = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TIMEPOINTS':
      console.log("inside state", action.type);
      return Object.assign({}, state, { timepoints: action.state });
    case 'SET_MEASUREMENTS':
      console.log("inside state", action.type, action.state);
      return Object.assign({}, state, { measurements: action.state });
    default:
      return state;
  }
};

export default timepointManager;
