import FormContainer from "./js/components/container/FormContainer";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import store from "./js/redux/mainStore"

ReactDOM.render(
    <Provider store={store}>
        <FormContainer />
    </Provider>,
    document.getElementById("app")
);