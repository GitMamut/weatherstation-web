import React, { Dispatch } from "react";
import Input from "../presentational/Input";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { Paragraph, addParagraphAction, Actions } from "../../constants/action-types";
import { AppState } from "../../redux/rootReducer";
import { addParagraph, addParagraphTimedout } from "../../redux/actions";
import { ThunkDispatch, ThunkAction } from "redux-thunk";

type DispatchProps = {
    addParagraph: (paragraph: Paragraph) => void,
    addParagraphAsync: (paragraph: Paragraph) => void
};
type OwnProps = { paragraphs: Paragraph[] };
type Props = OwnProps & DispatchProps;
type State = { paragraph: string };

class FormContainerConnected extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            paragraph: ""
        };
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ paragraph: event.currentTarget.value });
    }

    private handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        const { paragraph } = this.state;
        this.props.addParagraph({ paragraph, id: uuidv1() });
        this.setState({ paragraph: "" });
    }

    private handleSubmitAsync = (event: React.FormEvent): void => {
        event.preventDefault();
        const { paragraph } = this.state;
        this.props.addParagraphAsync({ paragraph, id: uuidv1() });
        this.setState({ paragraph: "" });
    }

    public render() {
        const { paragraph } = this.state;
        return (
            <form id="paragraph-form" onSubmit={this.handleSubmit}>
                <h1 style={{ margin: 0 }}>react redux thunk typescript babel webpack</h1>
                <h3 style={{ marginTop: 0 }}>
                    sample boilerplate initial code project
                    - <i><a href="http://tech.mintfrost.com">mintfrost.com</a></i>
                </h3>
                <div style={{ display: "flex" }}>
                    <Input
                        text="Paragraph"
                        label="paragraph"
                        type="text"
                        id="paragraph"
                        value={paragraph}
                        handleChange={this.handleChange}
                    />
                    <button type="submit">Add</button>
                    <button onClick={this.handleSubmitAsync}>Add async</button>
                </div>
                {this.props.paragraphs.map(art => <p key={art.id}>{art.paragraph}</p>)}
            </form>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return { paragraphs: state.paragraphs };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions | ThunkAction<void, AppState, undefined, Actions>>) => {
    return {
        addParagraph: (paragraph: Paragraph) => dispatch(addParagraph(paragraph)),
        addParagraphAsync: (paragraph: Paragraph) => dispatch(addParagraphTimedout(paragraph))
    };
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerConnected);
export default FormContainer;
