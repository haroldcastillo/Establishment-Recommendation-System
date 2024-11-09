import {
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    STATUS_CHECKER_START,
    STATUS_CHECKER_SUCCESS,
    STATUS_CHECKER_FAILURE,
    LOGOUT_USER_START,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
} from "../actions/auth.js";

const initialState = {
    login: {
        data: {},
        isloading: false,
        isError: false,
    },
    status: {
        data: {},
        isloading: false,
        isError: false,
    },
    logout: {
        data: {},
        isloading: false,
        isError: false,
    },
    register: {
        data: {},
        isloading: false,
        isError: false,
    },
    utils: {
        accessToken: "",
        userId: "",
    },
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_START:
            return {
                ...state,
                register: {
                    ...state.register,
                    isloading: true,
                },
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    data: action.payload,
                    isloading: false,
                },
                // utils: {
                //     ...state.utils,
                //     accessToken: action.payload.token,
                //     userId: action.payload.userId,
                // },
            };
        case REGISTER_USER_FAILURE:
            alert("ERROR: " + "Something went wrong!");
            return {
                ...state,
                register: {
                    ...state.register,
                    isloading: false,
                    isError: action.payload.error,
                },
            };
        case LOGIN_USER_START:
            return {
                ...state,
                login: {
                    ...state.login,
                    isloading: true,
                },
            };
        case LOGIN_USER_SUCCESS:
            console.log("LOGIN SUCCESS", action.payload);
            return {
                ...state,
                login: {
                    ...state.login,
                    data: action.payload,
                    isloading: false,
                },
                utils: {
                    ...state.utils,
                    accessToken: action.payload.token,
                    userId: action.payload.userId,
                },
            };
        case LOGIN_USER_FAILURE:
            alert("ERROR: " + "Invalid Credential");
            return {
                ...state,
                login: {
                    ...state.login,
                    isloading: false,
                    isError: action.payload.error,
                },
            };
        case LOGOUT_USER_START:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    isloading: true,
                },
            };
        case LOGOUT_USER_FAILURE:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    isloading: false,
                    isError: action.payload.error,
                },
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    isloading: false,
                },
                utils: {
                    ...state.utils,
                    accessToken: "",
                    userId: "",
                },
            };
        case STATUS_CHECKER_START:
            return {
                ...state,
                status: {
                    ...state.status,
                    isloading: true,
                },
            };
        case STATUS_CHECKER_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    data: action.payload,
                    isloading: false,
                    isError: false,
                },
                utils: {
                    ...state.utils,
                    accessToken: action.payload.accessToken,
                    userId: action.payload.userId,
                },
            };
        case STATUS_CHECKER_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    isloading: false,
                    isError: action.payload.error,
                },
                utils: {
                    ...state.utils,
                    accessToken: "",
                    userId: "",
                },
            };
        default:
            return state;
    }
};
