import {
    PUBLISHING_LIST_REQUEST,
    PUBLISHING_LIST_SUCCESS,
    PUBLISHING_LIST_FAIL,
} from '../constants/publishingConstants'


export const publishingListReducer = (state = { publishing: [] }, action) => {
    switch (action.type) {
        case PUBLISHING_LIST_REQUEST:
            return { loading: true, publishing: [] };

        case PUBLISHING_LIST_SUCCESS:
            return { loading: false, publishing: action.payload };

        case PUBLISHING_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}