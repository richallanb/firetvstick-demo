import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "../../components";

interface Props {
  onPress?: () => void;
  preferredFocus?: boolean;
  title?: string;
}

export default class SeasonItem extends Component<Props> {
  render() {
    const { onPress, preferredFocus, title } = this.props;
    const styles = StyleSheet.create({
      text: {
        fontSize: 16,
        color: "white"
      },
      container: {
        height: 40
      }
    });
    return (
      <Button
        underlayColor="rgba(0,0,0,0)"
        activeOpacity={1}
        hasTVPreferredFocus={true}
        onPress={() => console.log("pressed")}
        underlayStyle={{ elevation: 0, zIndex: 9999 }}
        focusChildStyle={{
          textShadowColor: "rgba(255, 255, 255, 0.5)",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10,
          transform: [
            { scaleX: 1.5 },
            { scaleY: 1.5 },
            { translateY: 0 },
            { translateX: 0 }
          ]
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </Button>
    );
  }
}
