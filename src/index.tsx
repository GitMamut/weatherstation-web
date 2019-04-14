import DashboardContainer from "./js/components/container/DashboardContainer";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import store from "./js/redux/mainStore"


// initDb(dbConfig);
// fetchLatestValues();

ReactDOM.render(
    <Provider store={store}>
        <DashboardContainer />
    </Provider>,
    document.getElementById("app")
);