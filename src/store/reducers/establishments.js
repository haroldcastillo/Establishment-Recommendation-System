import {
  FETCH_ESTABLISHMENTS,
  FETCH_ESTABLISHMENTS_SUCCESS,
  FETCH_ESTABLISHMENTS_FAILURE,
  SET_SEARCH_VALUE,
  SET_FILTER_VALUE,
  FETCH_ESTABLISHMENT,
  FETCH_ESTABLISHMENT_SUCCESS,
  FETCH_ESTABLISHMENT_FAILURE,
  CREATE_ESTABLISHMENT,
  CREATE_ESTABLISHMENT_FAILURE,
  CREATE_ESTABLISHMENT_SUCCESS,
  UPDATE_ESTABLISHMENT,
  UPDATE_ESTABLISHMENT_SUCCESS,
  UPDATE_ESTABLISHMENT_FAILURE,
  RESET_CREATE_ESTABLISHMENT,
  FETCH_OWNED_ESTABLISHMENTS,
  FETCH_OWNED_ESTABLISHMENTS_SUCCESS,
  FETCH_OWNED_ESTABLISHMENTS_FAILURE,
  RESET_UPDATE_ESTABLISHMENT,
  DELETE_ESTABLISHMENT,
  DELETE_ESTABLISHMENT_SUCCESS,
  DELETE_ESTABLISHMENT_FAILURE,
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
  },
  view:{
    data:{},
    isLoading:false,
    isError:false,
  },
  create:{
    data:{},
    isLoading:false,
    isError:false,
  },
  update:{
    isLoading:false,
    isError:false,
  },
  owned:{
    data:[],
    isLoading:false,
    isError:false,
  },
  delete:{
    data:{},
    isLoading:false,
    isError:false,
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
      alert("ERROR: " + "Something went wrong!")
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
    case SET_FILTER_VALUE:
      return {
        ...state,
        utils:{
          ...state.utils,
          ...action.payload,
        }
      };
    case FETCH_ESTABLISHMENT:
      return {
        ...state,
        view:{
          ...state.view,
          isLoading:true
        }
      }
    case FETCH_ESTABLISHMENT_SUCCESS:
      return {
        ...state,
        view:{
          data:action.payload,
          isLoading:false,
          isError:false
        }
      }
    case FETCH_ESTABLISHMENT_FAILURE:
      alert("ERROR: " + "Something went wrong!")
      return {
        ...state,
        view:{
          ...state.view,
          isLoading:false,
          isError:true
        }
      }

    case CREATE_ESTABLISHMENT:
      return {
        ...state,
        create:{
          isLoading:true,
          isError:false
        }
      }
    case CREATE_ESTABLISHMENT_SUCCESS:
      return {
        ...state,
        create:{
          data:action.payload,
          isLoading:false,
          isError:false
        }
      }
    case CREATE_ESTABLISHMENT_FAILURE:
      alert("ERROR: " + "Something went wrong!")
      return {
        ...state,
        create:{
          isLoading:false,
          isError:true
        }
      }
    case UPDATE_ESTABLISHMENT:
      return {
        ...state,
        update:{
          isLoading:true,
          isError:false
        }
      }
    case UPDATE_ESTABLISHMENT_SUCCESS:
      return {
        ...state,
        update:{
          data:action.payload,
          isLoading:false,
          isError:false
        }
      }
    case UPDATE_ESTABLISHMENT_FAILURE:
      return {
        ...state,
        update:{
          isLoading:false,
          isError:true
        }
      }

    case RESET_UPDATE_ESTABLISHMENT:
      return {
        ...state,
        update:{
          data:{},
          isLoading:false,
          isError:false
        }
      }
    
    case RESET_CREATE_ESTABLISHMENT:
      return {
        ...state,
        create:{
          data:{},
          isLoading:false,
          isError:false
        }
      }

    case FETCH_OWNED_ESTABLISHMENTS:
      return {
        ...state,
        owned:{
          ...state.owned,
          isLoading:true,
          isError:false
        }
      }
    case FETCH_OWNED_ESTABLISHMENTS_SUCCESS:
      return {
        ...state,
        owned:{
          data:action.payload.data,
          isLoading:false,
          isError:false
        }
      }
    case FETCH_OWNED_ESTABLISHMENTS_FAILURE:
      alert("ERROR: " + "Something went wrong!")
      return {
        ...state,
        owned:{
          ...state.owned,
          isError:true
        }
      }
    case DELETE_ESTABLISHMENT:
      return {
        ...state,
        delete:{
          isLoading:true,
          isError:false
        }
      }
    case DELETE_ESTABLISHMENT_SUCCESS:
      return {
        ...state,
        delete:{
          data:action.payload,
          isLoading:false,
          isError:false
        }
      }
    case DELETE_ESTABLISHMENT_FAILURE:
      alert("ERROR: " + "Something went wrong!")
      return {
        ...state,
        delete:{
          isLoading:false,
          isError:true
        }
      }
    default:
      return state;
  }
}