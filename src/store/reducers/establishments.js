import {
  FETCH_ESTABLISHMENTS,
  FETCH_ESTABLISHMENTS_SUCCESS,
  FETCH_ESTABLISHMENTS_FAILURE,
  SET_SEARCH_VALUE
} from '../actions/establishments';

const initialState = {
  recommendations: {
    data: [],
    isLoading: false,
    isError: false,
  },
  utils:{
    search:'',
    type:[],
    barangay:[],
    currentPage:1,
    totalPage:1,
    result:0
  }
};

export const establishmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ESTABLISHMENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ESTABLISHMENTS_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        recommendations: {
          data: action.payload.data,
          isLoading: false,
          isError: false,
        },
        utils:{
          ...state.utils,
          currentPage:action.payload.currentPage,
          totalPage:action.payload.totalPages,
          result:action.payload.total
        }
      };
    case FETCH_ESTABLISHMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case SET_SEARCH_VALUE:
      return {
        ...state,
        utils:{
          ...state.utils,
          search: action.payload,
        }
      };
    default:
      return state;
  }
}