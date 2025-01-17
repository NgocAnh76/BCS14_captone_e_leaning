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
import { api } from "../../api/api";
import { localService } from "../../api/localService";

// Authentication Actions
export const login = (credentials) => async(dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await api.login(credentials);

        localService.setAccessToken(data.accessToken);
        localService.setUser(data);

        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response ? .data ? .message || "Login failed",
        });
    }
};

export const logout = () => (dispatch) => {
    localService.removeAccessToken();
    localService.removeUser();
    dispatch({ type: LOGOUT });
};

// Course Actions
export const fetchCourseList = () => async(dispatch) => {
    try {
        dispatch({ type: COURSE_LIST_REQUEST });
        const { data } = await api.getCourseList();
        dispatch({ type: COURSE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COURSE_LIST_FAILURE,
            payload: error.response ? .data ? .message || "Failed to load courses",
        });
    }
};

export const fetchCourseDetails = (courseId) => async(dispatch) => {
    try {
        dispatch({ type: COURSE_DETAIL_REQUEST });
        const { data } = await api.getCourseDetails(courseId);
        dispatch({ type: COURSE_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COURSE_DETAIL_FAILURE,
            payload: error.response ? .data ? .message || "Failed to load course details",
        });
    }
};