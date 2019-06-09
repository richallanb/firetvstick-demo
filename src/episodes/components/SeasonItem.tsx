import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "../../components";

interface Props {
  onPress?: () => void;
  preferredFocus?: boolean;
  title?: string;
  selected?: boolean;
}

export default class SeasonItem extends Component<Props> {
  render() {
    const { onPress, preferredFocus, title, selected } = this.props;
    const textSelectedStyle = {
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10
    };
    return (
      <Button
        style={styles.button}
        underlayColor="rgba(0,0,0,0)"
        activeOpacity={1}
        hasTVPreferredFocus={true}
        onPress={() => console.log("pressed")}
        underlayStyle={{ }}
        focusChildStyle={{
          opacity: 1,
          textShadowColor: "rgba(255, 255, 255, 0.5)",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10,
        }}
      >
        <Text
          style={{ ...styles.text, ...(selected ? textSelectedStyle : {}) }}
        >
          {title}
        </Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "white",
    opacity: 0.5
  },
  container: {
    height: 40
  },
  button: {
    paddingTop: 13.5,
    paddingBottom: 13.5
  }
});
