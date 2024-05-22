
export const setLogs = (logs) => {
    return {
      type: 'set_logs',
      payload: logs
    };
  };

export const setFilteredLogs = (logs) => {
  return {
    type: 'set_filtered_logs',
    payload: logs
  };
};
  const initialState = {
    allLogs: [],
    filteredLogs: [],
  };
  
  const logsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'set_logs':
        return {
          ...state,
          allLogs: action.payload,
        };
      case 'set_filtered_logs':
        return {
          ...state,
          filteredLogs: action.payload
        };
      default:
        return state;
    }
  };
  
  export default logsReducer;
  