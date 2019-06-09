import { TouchableHighlight } from "react-native";

class Button extends TouchableHighlight {
  _showUnderlay = function() {
    /* $FlowFixMe(>=0.89.0 site=react_native_fb) This comment suppresses an
     * error found when Flow v0.89 was deployed. To see the error, delete this
     * comment and run Flow. */
    if (!this._isMounted || !this._hasPressHandler()) {
      return;
    }
    this.setState({
      extraChildStyle: {
        opacity: this.props.activeOpacity,
        ...this.props.focusChildStyle
      },
      extraUnderlayStyle: {
        backgroundColor: this.props.underlayColor,
        ...this.props.underlayStyle
      }
    });
    this.props.onShowUnderlay && this.props.onShowUnderlay();
  };
}

export default Button;
