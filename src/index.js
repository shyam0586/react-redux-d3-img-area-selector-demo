import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { select as d3Select } from "d3";
import canvasDragApp from "./reducers";
import AppContainer from "./containers/AppContainer";
import { resizeScreen } from "./actions";
import './index.css';
let store = createStore(canvasDragApp);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelectorAll("#root")[0]
);

let onResize = function() {
    store.dispatch(resizeScreen(window.innerWidth * 0.8, window.innerHeight * .85));
};
onResize();

d3Select(window).on("resize", onResize);