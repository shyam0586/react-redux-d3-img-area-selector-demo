//Right Panel with List of names
import React, { Component } from "react";
import { select as d3Select } from "d3";

class NamePanel extends Component {
  createList() {
    let names = [];
    let list = this.props.imageGrabNames;

    for (let j = 0; j < list.length; j++) {
      names.push(
        <p key={list[j]} onClick={this.toggleVisibility}>
          {list[j]}
        </p>
      );
    }
    return names;
  }
  toggleVisibility(e) {
    let name = e.target.innerText;
    let currentStatus = d3Select("#" + name).style("visibility");
    let updateStatus = currentStatus === "hidden" ? "visible" : "hidden";
    d3Select("#" + name).style("visibility", updateStatus);
  }
  render() {
    return <div className="text-holder">{this.createList()}</div>;
  }
}

export default NamePanel;
