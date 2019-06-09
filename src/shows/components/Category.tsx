import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "../../components";

interface Props {
  onPress?: () => void;
  preferredFocus?: boolean;
  onFocus?: () => void;
  title?: string;
  focused?: boolean;
  icon?: string;
}

const Category = (props: Props) => {
  const { onPress, preferredFocus, onFocus, focused, title, icon } = props;
  const styles = StyleSheet.create({
    container: {
      width: 155,
      height: 40,
      alignItems: "flex-start",
      justifyContent: "space-evenly",
      alignSelf: "center"
    },
    text: {
      fontSize: 16,
      color: "white"
    },
    icon: {
      color: "white",
      fontSize: 16
    }
  });
  const stylesFocused = StyleSheet.create({
    container: {},
    text: {
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      fontSize: 22
    },
    icon: {
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      fontSize: 22
    }
  });
  return (
    <Button
      underlayColor="rgba(0,0,0,0)"
      activeOpacity={1}
      hasTVPreferredFocus={preferredFocus}
      onPress={onPress}
      onShowUnderlay={onFocus}
    >
      <View
        style={{
          ...styles.container,
          ...(focused ? stylesFocused.container : {})
        }}
      >
        {icon && (
          <Icon
            name={icon}
            style={{ ...styles.icon, ...(focused ? stylesFocused.icon : {}) }}
          />
        )}
        {title && (
          <Text
            style={{ ...styles.text, ...(focused ? stylesFocused.text : {}) }}
          >
            {title}
          </Text>
        )}
      </View>
    </Button>
  );
};

export default Category;
