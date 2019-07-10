import { connect } from "react-redux";
import React, { Component } from "react";

import {
    addSelectionNames
} from "../actions";

import App from "../components";


class AppContainer extends Component {
    render() {
        const { svgWidth, svgHeight, addSelectionNames, imageGrabNames } = this.props;
        return (
            <App
                svgWidth={svgWidth}
                svgHeight={svgHeight}
                addSelectionNames={addSelectionNames}
                imageGrabNames={imageGrabNames}
            />
        );
    }
}

const mapStateToProps = ({
    svgWidth,
    svgHeight,
    imageGrabNames
}) => ({
    svgWidth,
    svgHeight,
    imageGrabNames
});

const mapDispatchToProps = {
    addSelectionNames
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);