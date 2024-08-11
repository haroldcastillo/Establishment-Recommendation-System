export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const FETCH_USER_LOGIN_FAILURE = "FETCH_USER_LOGIN_FAILURE"



export const fetchUserLogin = (payload) => {
  return {
    type: FETCH_USER_LOGIN,
    payload
  };
};

export const fetchUserLoginSuccess = (payload) => ({
	type: FETCH_USER_LOGIN_SUCCESS,
	payload
});

export const fetchUserLoginFailure = ({ error }) => ({
	type: FETCH_USER_LOGIN_FAILURE,
	payload: {
		error,
	},
});

