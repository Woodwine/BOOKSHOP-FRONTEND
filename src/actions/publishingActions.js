import {
    PUBLISHING_LIST_REQUEST,
    PUBLISHING_LIST_SUCCESS,
    PUBLISHING_LIST_FAIL,
} from '../constants/publishingConstants'
import axios from 'axios'


export const listPublishing = () => async (dispatch) => {
    try {
        dispatch({ type: PUBLISHING_LIST_REQUEST });

        const { data } = await axios.get('/api/v1/publishing-houses/');

        dispatch({
            type: PUBLISHING_LIST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PUBLISHING_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}