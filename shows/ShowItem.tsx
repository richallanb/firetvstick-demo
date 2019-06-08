import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { DISPLAY } from '../constants';

interface Props {
  onPress: () => void;
  preferredFocus?: boolean;
  imageSource: string;
  title: string;
  onFocus: () => void;
  focused: boolean;
}

export default class ShowItem extends Component<Props> {
  public static defaultProps = {
    onPress: () => {},
    preferredFocus: false,
    onFocus: () => {},
    selected: false,
    title: "None",
    imageSource: "https://via.placeholder.com/240x360.png"
  };

  public render() {
    const { onPress, preferredFocus, imageSource, title, onFocus, focused } = this.props;
    const onFocusStyleOverrides = focused
      ? {
          elevation: 5,
          backgroundColor: "rgb(80, 88, 88)",
          borderColor: "rgba(255,255,255,0.25)",
          borderWidth: 1
        }
      : {};
    return (
      <TouchableHighlight underlayColor="rgba(0,0,0,0)" activeOpacity={1} hasTVPreferredFocus={preferredFocus} onPress={onPress} onFocus={onFocus}>
        <View style={{ ...styles.container, ...onFocusStyleOverrides }}>
          <Image style={styles.image} source={{ uri: imageSource }} />
          <Text numberOfLines={1} style={styles.text}>
            {title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "rgba(0,0,0,0)",
    elevation: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    width: DISPLAY.SHOW_ITEM.ITEM_WIDTH,
    height: DISPLAY.SHOW_ITEM.ITEM_HEIGHT
  },
  image: {
    width: DISPLAY.SHOW_ITEM.ITEM_WIDTH * 0.8,
    height: DISPLAY.SHOW_ITEM.ITEM_HEIGHT * 0.8
  },
  text: {
    color: "white",
    marginTop: 8,
    fontSize: 14
  }
});
