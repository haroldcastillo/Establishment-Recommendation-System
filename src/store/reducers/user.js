import {
  FETCH_USER_LOGIN,
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGIN_FAILURE,
} from "../actions/user.js";

const initialState = {
  user:{
    data:{},
    isloading:false,
    isError:false,
  },
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        user:{
          ...state.user,
          isloading:true,
        }
      };
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        user:{
          ...state.user,
          data: action.payload,
          isloading: false,
        }
      };
    case FETCH_USER_LOGIN_FAILURE:
      return {
        ...state,
        user:{
          ...state.user,
          isError: action.payload,
          isloading: false,
        }
      };

		
		default:
			return state;
	}
};
