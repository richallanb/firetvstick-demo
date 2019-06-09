import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Button } from "../../components";
import { DISPLAY_CONST } from "../../constants";

interface Props {
  onPress: () => void;
  preferredFocus?: boolean;
  imageSource: string;
  title: string;
  onFocus: () => void;
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
    const { onPress, preferredFocus, imageSource, onFocus } = this.props;

    return (
      <Button
        underlayColor="rgba(60,60,60,0)"
        activeOpacity={1}
        hasTVPreferredFocus={preferredFocus}
        underlayStyle={{ elevation: 0, zIndex: 9999 }}
        focusChildStyle={{
          transform: [
            { scaleX: 1.35 },
            { scaleY: 1.35 },
            { translateY: 0 },
            { translateX: 0 }
          ],
          elevation: 4,
          backgroundColor: "rgba(90,90,90,1)"
        }}
        onPress={onPress}
        onFocus={onFocus}
        style={styles.button}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: imageSource }} />
        </View>
      </Button>
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
    alignItems: "center"
  },
  image: {
    width: DISPLAY_CONST.SHOW_ITEM.ITEM_WIDTH * 0.75,
    height: DISPLAY_CONST.SHOW_ITEM.ITEM_HEIGHT * 0.75
  },
  text: {
    color: "white",
    marginTop: 8,
    fontSize: 14
  },
  button: {
    paddingTop: DISPLAY_CONST.SHOW_ITEM.ITEM_HEIGHT / 3,
    paddingBottom: DISPLAY_CONST.SHOW_ITEM.ITEM_HEIGHT / 3,
    marginLeft: 15,
    marginRight: 15
  }
});
