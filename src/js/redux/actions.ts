import {
    ADD_PARAGRAPH,
    Paragraph,
    addParagraphAction,
    Actions,
} from "../constants/action-types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "./rootReducer";

export function addParagraph(payload: Paragraph): addParagraphAction {
    return {
        type: ADD_PARAGRAPH,
        payload
    }
};

export function addParagraphTimedout(payload: Paragraph): ThunkAction<void, AppState, undefined, Actions> {
    return dispatch => {
        setTimeout(() => dispatch(addParagraph(payload)), 1000);
    }
};