import {
    FETCH_USER_LOGIN,
    FETCH_USER_LOGIN_SUCCESS,
    FETCH_USER_LOGIN_FAILURE,
    UPDATE_PREFERENCES,
    UPDATE_PREFERENCES_SUCCESS,
    UPDATE_PREFERENCES_FAILURE,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
} from "../actions/user.js";

const initialState = {
    user: {
        data: {},
        isloading: false,
        isError: false,
    },
    preferences: {
        data: [],
        isloading: false,
        isError: false,
        isOpen: false,
    },
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
                user: {
                    ...state.user,
                    isloading: true,
                },
            };
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload,
                    isloading: false,
                },
            };
        case FETCH_USER_LOGIN_FAILURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    isError: action.payload,
                    isloading: false,
                },
            };
        case UPDATE_PREFERENCES:
            return {
                ...state,
                preferences: {
                    ...state.preferences,
                    isloading: true,
                },
            };

        case UPDATE_PREFERENCES_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: {
                        ...state.user.data,
                        preferences: action.payload.preferences,
                    },
                    isloading: false,
                },
                preferences: {
                    ...state.preferences,
                    data: action.payload,
                    isloading: false,
                    isOpen: action.payload > 0 ? false : true,
                },
            };
        case UPDATE_PREFERENCES_FAILURE:
            return {
                ...state,
                preferences: {
                    ...state.preferences,
                    isError: action.payload,
                    isloading: false,
                },
            };

        case UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    isloading: true,
                },
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload,
                    isloading: false,
                },
            };
        case UPDATE_USER_FAILURE:
            console.log("Error: ", action.payload);
            return {
                ...state,
                user: {
                    ...state.user,
                    isError: action.payload,
                    isloading: false,
                },
            };

        case UPDATE_PASSWORD:
            return {
                ...state,
            };
        case UPDATE_PASSWORD_SUCCESS:
            alert("Password updated successfully");
            return {
                ...state,
            };
        case UPDATE_PASSWORD_FAILURE:
            alert("Error: Wrong Current Password");
            return {
                ...state,
            };

        default:
            return state;
    }
};
