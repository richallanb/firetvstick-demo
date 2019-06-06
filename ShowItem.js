import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";
import styled from 'styled-components'

const ShowContainer = styled.View`
  border-width: 1;
  border-color: #ddd;
  elevation: 5;
  margin: 5px 5px;
  background-color: rgb(80, 88, 88);
  align-items: center;
  justify-content: center;
  padding: 8px 8px;
`

export default class ShowItem extends Component {
  render() {
    const { onPress, imageSource, title } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <ShowContainer>
          <Image style={styles.image} source={{ uri: imageSource }} />
          <Text>{title}</Text>
        </ShowContainer>
      </TouchableNativeFeedback>
    );
  }
}

ShowItem.defaultProps = {
  onPress: () => {},
  title: "None",
  imageSource: "https://via.placeholder.com/240x360.png"
};



const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#000',
    borderBottomWidth: 0,
    shadowColor: '#000',
    backgroundColor: "rgb(80, 88, 88)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  image: {
    width: 120,
    height: 180
  }
});
