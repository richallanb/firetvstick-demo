import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";

interface Props {
  onPress: () => void;
  imageSource: string;
  title: string;
  onFocus: () => void;
  focused: boolean;
}

export default class ShowItem extends Component<Props> {
  public static defaultProps = {
    onPress: () => {},
    onFocus: () => {},
    selected: false,
    title: "None",
    imageSource: "https://via.placeholder.com/240x360.png"
  };

  public render() {
    const { onPress, imageSource, title, onFocus, focused } = this.props;
    const onFocusStyleOverrides = focused
      ? {
          elevation: 5,
          backgroundColor: "rgb(80, 88, 88)",
          borderColor: "rgba(255,255,255,0.25)",
          borderWidth: 1
        }
      : {};
    return (
      <TouchableNativeFeedback onPress={onPress} onFocus={onFocus}>
        <View style={{ ...styles.container, ...onFocusStyleOverrides }}>
          <Image style={styles.image} source={{ uri: imageSource }} />
          <Text numberOfLines={1} style={styles.text}>
            {title}
          </Text>
        </View>
      </TouchableNativeFeedback>
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
    width: 200,
    height: 248
  },
  image: {
    width: 120,
    height: 180
  },
  text: {
    color: "white",
    marginTop: 8
  }
});
