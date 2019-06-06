import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { FirestickKeys } from "./components/firestick-keys";

export default class FocusManager extends Component {
  state = {
    childMap: {},
    focusX: this.props.initialFocusX,
    focusY: this.props.initialFocusY
  };

  constructor(props) {
    super(props);

    const buildDefaultMatrix = () => {
      const { children, verticalButtons, horizontalButtons } = this.props;
      if (horizontalButtons) {
        return [children.map(child => child.key)];
      } else if (verticalButtons) {
        return children.map(child => [child.key]);
      }
    };

    if (this.props.focusMatrix) {
      this.keyMatrix = this.props.focusMatrix;
    } else {
      this.keyMatrix = buildDefaultMatrix();
    }
    console.log(this.keyMatrix);
  }

  componentDidMount() {
    const { children } = this.props;
    let childMap = {};
    children.forEach(child => {
      if (!child.key && !child.noFocus) {
        console.error("Child component has no key property", child);
      }
      childMap[child.key] = child;
      // clonedChildren.push(React.cloneElement(child, { ref: ref => (childMap[child.key] = ref) }));
    });
    this.setState({ childMap });
  }

  _handleMoveLeft = () => {
    this._handleUnfocus();
    if (this.state.focusX > 0) {
      this.setState({ focusX: this.state.focusX - 1 });
    }
    this._handleFocus();
  };

  _handleMoveRight = () => {
    this._handleUnfocus();
    if (this.state.focusX < this.keyMatrix[this.state.focusY].length - 1) {
      this.setState({ focusX: this.state.focusX + 1 });
    }
    this._handleFocus();
  };

  _handleMoveUp = () => {
    this._handleUnfocus();
    if (this.state.focusY > 0) {
      this.setState({ focusY: this.state.focusY - 1 });
    }
    this._handleFocus();
  };

  _handleMoveDown = () => {
    this._handleUnfocus();
    if (this.state.focusY < this.keyMatrix.length - 1) {
      this.setState({ focusY: this.state.focusY + 1 });
    }
    this._handleFocus();
  };

  _selectElement = () => {
    const { childMap, focusY, focusX } = this.state;
    const focusKey = this.keyMatrix[focusY][focusX];
    return focusKey && childMap && childMap[focusKey];
  };

  _handleUnfocus = () => {
    const selectedElement = this._selectElement();
    console.log(selectedElement);
    selectedElement && selectedElement.props.onBlur && selectedElement.props.onBlur();
  };

  _handleFocus = () => {
    const selectedElement = this._selectElement();
    console.log(selectedElement);
    selectedElement && selectedElement.props.onFocus && selectedElement.props.onFocus();
  };

  _handlePress = () => {
    const selectedElement = this._selectElement();
    selectedElement && selectedElement.props.onPress && selectedElement.props.onPress();
  }

  _focusHandler = (
    <FirestickKeys
      onSelect={this._handlePress}
      onLeft={this._handleMoveLeft}
      onRight={this._handleMoveRight}
      onUp={this._handleMoveUp}
      onDown={this._handleMoveDown}
    />
  );
  render() {
    const { focusX, focusY, childMap } = this.state;
    const focusKey = this.keyMatrix[focusY][focusX];
    console.log(focusKey);
    const { children } = this.props;
    return (
      <View>
        {children}
        {this._focusHandler}
      </View>
    );
  }
}

FocusManager.defaultProps = {
  verticalButtons: true,
  horizontalButtons: false,
  initialFocusX: 0,
  initialFocusY: 0,
  focusMatrix: undefined
};
