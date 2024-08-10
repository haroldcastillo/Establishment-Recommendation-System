export const FETCH_USERS_LIST_START = "FETCH_USERS_LIST_START";
export const FETCH_USERS_LIST_SUCCESS = "FETCH_USERS_LIST_SUCCESS";
export const FETCH_USERS_LIST_FAILURE = "FETCH_USERS_LIST_FAILURE";

export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"



export const fetchUsersList = () => {
  return {
    type: FETCH_USERS_LIST_START,
  };
};

export const fetchUsersListSuccess = (payload) => ({
	type: FETCH_USERS_LIST_SUCCESS,
	payload
});

export const fetchUsersListFailure = ({ error }) => ({
	type: FETCH_USERS_LIST_FAILURE,
	payload: {
		error,
	},
});



export const createUser = ({name,email}) => ({
	type: CREATE_USER,
  payload: {
    name,
    email
  },
});

export const createUserSuccess = ({_id,name,email}) => ({
	type: CREATE_USER_SUCCESS,
  payload: {
    _id,
    name,
    email
  },
});

export const deleteUser = ({id}) => ({
	type: DELETE_USER,
  payload: {
    id
  },
});

export const deleteUserSuccess = ({_id}) => ({
	type: DELETE_USER_SUCCESS,
  payload: {
    _id,  
  },
});

export const updateUser = ({id,name,email}) => ({
	type: UPDATE_USER,
  payload: {
    id,
    name,
    email
  },
});
export const updateUserSuccess = ({_id,name,email}) => ({
  type: UPDATE_USER_SUCCESS,
  payload: {
    _id,
    name,
    email
  }
})
