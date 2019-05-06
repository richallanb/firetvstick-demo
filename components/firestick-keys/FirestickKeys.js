import React, { Component } from "react";
import { View, DeviceEventEmitter } from "react-native";
import KeyMappings from "./KeyMappings";

function throttle(callback, wait, immediate = false) {
  let timeout = null;
  let initialCall = true;

  return function() {
    const callNow = immediate && initialCall;
    const next = () => {
      callback.apply(this, arguments);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(next, wait);
    }
  };
}

export default class FirestickKeys extends Component {
  constructor() {
    super();
  }

  buildProps() {
    return Object.keys(this.props).reduce((mappings, propName) => {
      if (KeyMappings[propName] && typeof this.props[propName] === "function") {
        const key = KeyMappings[propName].holdDown
          ? `${KeyMappings[propName].keyCode}_hold`
          : KeyMappings[propName].keyCode;

        return {
          ...mappings,
          [key]: {
            action: this.props[propName],
            holdDown: KeyMappings[propName].holdDown
          }
        };
      }
      return mappings;
    }, {});
  }

  render() {
    return <View />;
  }

  componentDidMount() {
    const mappedProps = this.buildProps();
    let throttledKeyDown;
    this.listenerKeyUp = DeviceEventEmitter.addListener(
      "onKeyUp",
      ({ keyCode = 0 }) => {
        console.log(keyCode);
        if (mappedProps && mappedProps[keyCode]) {
          mappedProps[keyCode].action();
        }
        if (throttledKeyDown && throttledKeyDown.keyCode === keyCode) {
          throttledKeyDown = undefined;
        }
      }
    );
    this.listenerKeyDown = DeviceEventEmitter.addListener(
      "onKeyDown",
      ({ keyCode = 0 }) => {
        const heldKeyCode = `${keyCode}_hold`;
        if (mappedProps && mappedProps[heldKeyCode]) {
          if (throttledKeyDown && throttledKeyDown.keyCode === keyCode) {
            throttledKeyDown.action();
          } else {
            throttledKeyDown = {
              keyCode,
              action: throttle(
                mappedProps[heldKeyCode].action,
                this.props.keyPressTimeOut,
                true
              )
            };
          }
        }
      }
    );
  }

  componentWillUnmount() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
    }
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
    }
  }
}

FirestickKeys.defaultProps = {
  keyPressTimeOut: 50
};
