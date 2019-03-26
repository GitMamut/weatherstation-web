export const ADD_PARAGRAPH = "ADD_PARAGRAPH";

export type Paragraph = {
    paragraph: string;
    id: string;
};

export type addParagraphAction = {
    type: typeof ADD_PARAGRAPH;
    payload: Paragraph;
}

export type Actions = addParagraphAction;