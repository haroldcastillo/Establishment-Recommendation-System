export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const FETCH_USER_LOGIN_FAILURE = "FETCH_USER_LOGIN_FAILURE"

export const UPDATE_PREFERENCES = "UPDATE_PREFERENCES";
export const UPDATE_PREFERENCES_SUCCESS = "UPDATE_PREFERENCES_SUCCESS";
export const UPDATE_PREFERENCES_FAILURE = "UPDATE_PREFERENCES_FAILURE";

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

export const updatePreferences = (payload) => {
  return {
    type: UPDATE_PREFERENCES,
    payload
  };
}

export const updatePreferencesSuccess = (payload) => {
  return {
    type: UPDATE_PREFERENCES_SUCCESS,
    payload
  }
}

export const updatePreferencesFailure = (payload) => {
  return {
    type: UPDATE_PREFERENCES_FAILURE,
    payload
  }
}
