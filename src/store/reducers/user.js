import {
  FETCH_USER_LOGIN,
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGIN_FAILURE,
  UPDATE_PREFERENCES,
  UPDATE_PREFERENCES_SUCCESS,
  UPDATE_PREFERENCES_FAILURE
} from "../actions/user.js";

const initialState = {
  user:{
    data:{},
    isloading:false,
    isError:false,
  },
  preferences:{
    data:[],
    isloading:false,
    isError:false,
    isOpen:false,
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
    case UPDATE_PREFERENCES:
      return {
        ...state,
        preferences:{
          ...state.preferences,
          isloading:true,
        }
      };

    case UPDATE_PREFERENCES_SUCCESS:
      
      return {
        ...state,
        user:{
          ...state.user,
          data: {
            ...state.user.data,
            preferences: action.payload.preferences,
          },
          isloading: false,
        },
        preferences:{
          ...state.preferences,
          data: action.payload,
          isloading: false,
          isOpen: action.payload > 0 ? false : true,
        }
      };
    case UPDATE_PREFERENCES_FAILURE:
      return {
        ...state,
        preferences:{
          ...state.preferences,
          isError: action.payload,
          isloading: false,
        }
      };

		
		default:
			return state;
	}
};
