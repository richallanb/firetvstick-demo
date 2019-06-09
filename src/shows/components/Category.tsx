import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "../../components";

interface Props {
  onPress?: () => void;
  preferredFocus?: boolean;
  onFocus?: () => void;
  title?: string;
  selected?: boolean;
  icon?: string;
}

const Category = (props: Props) => {
  const { onPress, preferredFocus, onFocus, selected, title, icon } = props;
  const styles = StyleSheet.create({
    button: {
      height: 40,
      paddingRight: 100,
      paddingBottom: 5
    },
    container: {
      flex: 1,
      opacity: 0.3,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderBottomWidth: 2,
      borderColor: "rgba(255,255,255,0)",
    },
    text: {
      fontSize: 16,
      color: "white",
      paddingLeft: 0,
      paddingRight: 6,
      height: 28,
      lineHeight: 33
    },
    icon: {
      color: "white",
      fontSize: 16,
      paddingLeft: 0,
      paddingRight: 6,
      marginTop: -2,
      marginRight: 5,
      height: 28,
      lineHeight: 33,
      textAlignVertical: "center"
    }
  });
  const stylesSelected = StyleSheet.create({
    container: {
      opacity: 1,
      borderColor: "rgba(255,255,255,1)"
    },
    text: {
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10
    },
    icon: {
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10
    }
  });
  return (
    <Button
      underlayColor="rgba(0,0,0,0)"
      activeOpacity={1}
      hasTVPreferredFocus={preferredFocus}
      onPress={onPress}
      onFocus={onFocus}
      focusChildStyle={{
        opacity: 1
      }}
      style={styles.button}
    >
      <View
        style={{
          ...styles.container,
          ...(selected ? stylesSelected.container : {})
        }}
      >
        {icon && (
          <Icon
            name={icon}
            style={{ ...styles.icon, ...(selected ? stylesSelected.icon : {}) }}
          />
        )}
        {title && (
          <Text
            style={{ ...styles.text, ...(selected ? stylesSelected.text : {}) }}
          >
            {title}
          </Text>
        )}
      </View>
    </Button>
  );
};

export default Category;
