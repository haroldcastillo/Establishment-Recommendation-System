export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const LOGOUT_USER_START = "LOGOUT_USER_START";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";

export const STATUS_CHECKER_START = "STATUS_CHECKER_START";
export const STATUS_CHECKER_SUCCESS = "STATUS_CHECKER_SUCCESS";
export const STATUS_CHECKER_FAILURE = "STATUS_CHECKER_FAILURE";


export const loginUser = ({ email, password }) => {
  return {
    type: LOGIN_USER_START,
    payload: {
      email,
      password,
    },
  };
}

export const loginUserSuccess = (payload) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload
  };
};

export const loginUserFailure = ({ error }) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      error,
    },
  };
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER_START,
  };
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
}


export const logoutUserFailure = ({ error }) => {
  return {
    type: LOGOUT_USER_FAILURE,
    payload: {
      error,
    },
  };
}

export const statusChecker = () => {
  return {
    type: STATUS_CHECKER_START,
  };
}

export const statusCheckerSuccess = (payload) => {
  return {
    type: STATUS_CHECKER_SUCCESS,
    payload
  };
}

export const statusCheckerFailure = ({ error }) => {
  return {
    type: STATUS_CHECKER_FAILURE,
    payload: {
      error,
    },
  };
}

