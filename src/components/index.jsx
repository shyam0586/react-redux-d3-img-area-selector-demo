import React, { Component } from "react";
import {
  select as d3Select,
  drag as d3Drag,
  event as d3Event,
  max as d3Max,
  min as d3Min,
  mouse as d3Mouse
} from "d3";
import Header from './Header.jsx';
import NamePanel from "./NamePanel.jsx";
import bgimage from "../aurora.jpg"; // Tell Webpack this JS file uses this image

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseCount: 0,
      tmpArr: [],
      tmpCounter: 0,
      clippedCoordinates: []
    };
  }
  updateRect(selection) {
    selection
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", d => d.width)
      .attr("height", d => d.height);
  }
  componentDidMount() {
    let that = this;
    that.renderImage();

    d3Select("svg").on("click", function () {
      let mouse = d3Mouse(this);
      that.incrementMouseClick();
      that.addClickedCoordinates(mouse);
      that.drawClickCircle(mouse[0], mouse[1]);

      if (that.state.mouseCount === 4) {
        that.refineValuesForRectangle();
        that.drawSquare();
        that.resetMouseCount();
        that.updateObjCounter();
        that.resetCoordinatesTmpArray();

        that.removeClickCircles();
      }
    });
  }
  resetCoordinatesTmpArray() {
    this.setState({
      tmpArr: []
    });
  }
  updateObjCounter() {
    let tmpCounter = this.state.tmpCounter + 1;
    this.setState({
      tmpCounter: tmpCounter
    });
  }
  resetMouseCount() {
    this.setState({
      mouseCount: 0
    });
  }
  removeClickCircles() {
    d3Select("svg")
      .selectAll("circle")
      .remove();
  }
  addClickedCoordinates(mouse) {
    let tmpArr = this.state.tmpArr;
    tmpArr.push(mouse);
    this.setState({
      tmpArr: tmpArr
    });
  }
  refineValuesForRectangle() {
    let xmin = d3Min([
      this.state.tmpArr[0][0],
      this.state.tmpArr[1][0],
      this.state.tmpArr[2][0],
      this.state.tmpArr[3][0]
    ]);
    let xmax = d3Max([
      this.state.tmpArr[0][0],
      this.state.tmpArr[1][0],
      this.state.tmpArr[2][0],
      this.state.tmpArr[3][0]
    ]);
    let ymin = d3Min([
      this.state.tmpArr[0][1],
      this.state.tmpArr[1][1],
      this.state.tmpArr[2][1],
      this.state.tmpArr[3][1]
    ]);
    let ymax = d3Max([
      this.state.tmpArr[0][1],
      this.state.tmpArr[1][1],
      this.state.tmpArr[2][1],
      this.state.tmpArr[3][1]
    ]);

    let currentSelection = {
      name: "clipped-path-" + this.state.tmpCounter,
      x: xmin,
      y: ymin,
      width: xmax - xmin,
      height: ymax - ymin
    };

    this.setState({
      clippedCoordinates: [currentSelection, ...this.state.clippedCoordinates]
    });
  }
  resetCanvasSelection() {
    d3Select("svg")
      .selectAll("defs")
      .remove();
    d3Select("svg")
      .selectAll(".opaque-obj")
      .remove();
    d3Select("svg")
      .selectAll(".opaque-container")
      .remove();
  }
  drawSquare() {
    this.props.addSelectionNames(this.state.clippedCoordinates[0].name);

    let svg = d3Select("svg");
    this.resetCanvasSelection();
    let mask = svg
      .append("defs")
      .append("mask")
      .attr("id", "myMask");

    mask
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "none")
      .style("fill", "white")
      .style("opacity", 0.7);

    mask
      .selectAll(".opaque-obj")
      .data(this.state.clippedCoordinates)
      .enter()
      .append("rect")
      .attr("class", "opaque-obj")
      .attr("id", function (d) {
        return d.name;
      })
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .style("fill", "#000")
      .attr("width", function (d) {
        return d.width;
      })
      .attr("height", function (d) {
        return d.height;
      });

    svg
      .append("rect")
      .attr("class", "opaque-container")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "none")
      .attr("mask", "url(#myMask)")
      .style("fill", "grey")
      .style("opacity", 0.9);

    svg
      .append("g")
      .selectAll(".opaque-obj")
      .data(this.state.clippedCoordinates)
      .enter()
      .append("rect")
      .attr("class", "opaque-obj")
      .style("fill", "transparent")
      .style("cursor", "grab")
      .call(this.updateRect)
      .call(
        d3Drag().on("drag", function (d) {
          d3Select(this)
            .attr("x", (d.x = d3Event.x))
            .attr("y", (d.y = d3Event.y));

          d3Select("#" + d3Event.subject.name)
            .attr("x", (d.x = d3Event.x))
            .attr("y", (d.y = d3Event.y));
        })
      );
  }
  incrementMouseClick() {
    let mouseCount = this.state.mouseCount + 1;
    this.setState({
      mouseCount: mouseCount
    });
  }
  renderImage() {
    d3Select("svg")
      .append("g")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "none")
      .append("image")
      .attr("xlink:href", bgimage)
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("preserveAspectRatio", "none");
  }

  drawClickCircle(x, y) {
    d3Select("svg")
      .append("circle")
      .attr("class", "click-circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 4)
      .attr("fill", "transparent")
      .attr("stroke", "cyan")
      .attr("stroke-width", 2);
  }

  render() {
    return (
      <div>
        <Header></Header>
        <div className="svg-holder">
          <svg
            style={{
              width: this.props.svgWidth,
              height: this.props.svgHeight,
            }}
          />
        </div>
        <NamePanel imageGrabNames={this.props.imageGrabNames} />
      </div>
    );
  }
}

export default App;
