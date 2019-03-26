import {
    ADD_PARAGRAPH, addParagraphAction, Paragraph
} from "../constants/action-types";

export type AppState = {
    paragraphs: Paragraph[];
}

const initialState = {
    paragraphs: []
};

function rootReducer(state: AppState = initialState, action: addParagraphAction) {
    switch (action.type) {
        case ADD_PARAGRAPH:
            return {
                ...state,
                paragraphs: [
                    ...state.paragraphs,
                    action.payload
                ]
            };
        default:
            return state;
    }
};

export default rootReducer;