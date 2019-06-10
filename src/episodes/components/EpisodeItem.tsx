import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "../../components";
import { DISPLAY_CONST } from "../../constants";

interface Props {
  onPress: () => void;
  preferredFocus?: boolean;
  imageSource?: string;
  title?: string;
  description?: string;
  episodeNumber?: number;
  onFocus: () => void;
}

let winSize = Dimensions.get("window");

export default class EpisodeItem extends Component<Props> {
  public static defaultProps = {
    onPress: () => {},
    preferredFocus: false,
    onFocus: () => {},
    selected: false,
    title: "None",
    description: "No description...",
    episodeNumber: -1,
    imageSource: "https://via.placeholder.com/240x360.png"
  };

  public render() {
    const {
      onPress,
      preferredFocus,
      imageSource,
      title,
      description,
      episodeNumber,
      onFocus
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.episodeNumber}>{episodeNumber}</Text>
        <Button
          underlayColor="rgba(60,60,60,0)"
          activeOpacity={1}
          hasTVPreferredFocus={preferredFocus}
          underlayStyle={{ elevation: 0, zIndex: 9999 }}
          focusChildStyle={{
            elevation: 4,
            backgroundColor: "rgba(90,90,90,1)",
            opacity: 1
          }}
          onPress={onPress}
          onFocus={onFocus}
          style={styles.button}
        >
          <View style={styles.buttonContainer}>
            <Image style={styles.image} source={imageSource && { uri: imageSource }} />
          </View>
        </Button>
        <View style={styles.descriptionTextContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.description}
          >
            {description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "auto"
  },
  episodeNumber: {
    opacity: 1,
    color: "white",
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    width: 40,
    textAlign: "center"
  },
  descriptionTextContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  description: {
    opacity: 1,
    color: "white",
    fontSize: 11
  },
  title: {
    opacity: 1,
    color: "white",
    fontSize: 16,
    marginBottom: 10
  },
  buttonContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5
  },
  image: {
    width: DISPLAY_CONST.EPISODE_ITEM.ITEM_WIDTH * 0.55,
    height: DISPLAY_CONST.EPISODE_ITEM.ITEM_HEIGHT * 0.55
  },
  text: {
    color: "white",
    marginTop: 8,
    fontSize: 14
  },
  button: {
    paddingTop: 8.5,
    paddingBottom: 8.5
  }
});
