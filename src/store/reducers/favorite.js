import {
  ADD_FAVORITE,
  ADD_FAVORITE_FAILURE,
  ADD_FAVORITE_SUCCESS,
  FETCH_FAVORITE_USERS,
  FETCH_FAVORITE_USERS_FAILURE,
  FETCH_FAVORITE_USERS_SUCCESS,
  REMOVE_FAVORITE_FAILURE,
  REMOVE_FAVORITE_SUCCESS,
  FETCH_MY_FAVORITES,
  FETCH_MY_FAVORITES_SUCCESS,
  FETCH_MY_FAVORITES_FAILURE,

} from '../actions/favorite';

const initialState = {
  establishments: {
    data: [],
    isLoading: false,
    isError: false,
  },
  users: {
    data: [],
    isLoading: false,
    isError: false,
  },
  remove: {
    data: {},
    isLoading: false,
    isError: false,
  },
  myFavorites: {
    data: [],
    isLoading: false,
    isError: false,
  },
};

export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          isLoading: true,
          isError: false,
        },
      };
    case FETCH_FAVORITE_USERS_SUCCESS:
      return {
        ...state,
        users: {
          data: action.payload,
          isLoading: false,
          isError: false,
        },
      };
    case FETCH_FAVORITE_USERS_FAILURE:
      return {
        ...state,
        users: {
          ...state.users,
          isLoading: false,
          isError: true,
        },
      };

    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        users:{
          data: [...state.users.data, action.payload],
          isLoading: false,
          isError: false,
        },
        add: {
          data: action.payload,
          isLoading: false,
          isError: false,
        },
      };
    case ADD_FAVORITE_FAILURE:
      return {
        ...state,
        add: {
          isLoading: false,
          isError: true,
        },
      };

    case REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        users: {
          data: state.users.data.filter((fav) => fav._id !== action.payload._id),
          isLoading: false,
          isError: false,
        },
        remove: {
          data: action.payload,
          isLoading: false,
          isError: false,
        }
      };
    case REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        remove: {
          isLoading: false,
          isError: true,
        },
      };
    
    case FETCH_MY_FAVORITES:
      return {
        ...state,
        myFavorites: {
          ...state.myFavorites,
          isLoading: true,
          isError: false,
        },
      };
    case FETCH_MY_FAVORITES_SUCCESS:
      return {
        ...state,
        myFavorites: {
          data: action.payload,
          isLoading: false,
          isError: false,
        },
      };
    case FETCH_MY_FAVORITES_FAILURE:
      return {
        ...state,
        myFavorites: {
          ...state.myFavorites,
          isLoading: false,
          isError: true,
        },
      };
    default:
      return state;
  }
}