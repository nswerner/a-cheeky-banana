export const setAuthUser = (user) => {
  return {
    type: 'set_auth_user',
    payload: user
  };
};

export const resetAuthUser = () => ({
  type: 'reset_auth_user',
});

const initialState = {
  authUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set_auth_user':
      return {
        ...state,
        authUser: action.payload,
      };
    case 'reset_auth_user':
      return {
        ...state,
        authUser: null,
      };
    default:
      return state;
  }
};

export default authReducer;
