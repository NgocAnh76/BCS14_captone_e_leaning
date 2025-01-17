import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAILURE,
    COURSE_DETAIL_REQUEST,
    COURSE_DETAIL_SUCCESS,
    COURSE_DETAIL_FAILURE
} from "../constant/constant";

// Initial States
const authInitialState = {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
};

const courseInitialState = {
    loading: false,
    courses: [],
    courseDetails: null,
    error: null,
};

// Authentication Reducer
export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return {...state, loading: false, user: action.payload, isAuthenticated: true };
        case LOGIN_FAILURE:
            return {...state, loading: false, error: action.payload };
        case LOGOUT:
            return {...authInitialState };
        default:
            return state;
    }
};

// Course Reducer
export const courseReducer = (state = courseInitialState, action) => {
    switch (action.type) {
        case COURSE_LIST_REQUEST:
        case COURSE_DETAIL_REQUEST:
            return {...state, loading: true, error: null };
        case COURSE_LIST_SUCCESS:
            return {...state, loading: false, courses: action.payload };
        case COURSE_DETAIL_SUCCESS:
            return {...state, loading: false, courseDetails: action.payload };
        case COURSE_LIST_FAILURE:
        case COURSE_DETAIL_FAILURE:
            return {...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Combine Reducers
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    courses: courseReducer,
});

export default rootReducer;