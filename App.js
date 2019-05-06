/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter
} from "react-native";
import VideoPlayer from "react-native-video";
import { FirestickKeys } from "./components/firestick-keys";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    color: "white",
    paused: false,
    fastForward: 0,
    fastReverse: 0
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          title="Button 1"
          onPress={() =>
            this.setState({ color: "red", paused: !this.state.paused })
          }
          color="red"
        />
        <Button
          title="Button 2"
          onPress={() => this.setState({ color: "green" })}
          color="green"
        />
        <Button
          title="Button 3"
          onPress={() => this.setState({ color: "blue" })}
          color="blue"
        />
        <Text>{this.state.color}</Text>
        <VideoPlayer
          source={{
            uri:
              "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_30mb.mp4"
          }} // Can be a URL or a local file.
          style={styles.backgroundVideo}
          paused={this.state.paused}
          onProgress={progress => this.setState({ video: { progress } })}
          ref={ref => {
            this.player = ref;
          }}
        />
        <FirestickKeys
          onPlay={() => {
            console.log(this.state.paused);
            this.setState({ paused: !this.state.paused });
          }}
          onLeftHold={() => {
            this.setState({
              fastReverse: this.state.fastReverse
                ? this.state.fastReverse - 10
                : -10
            });
            console.log(this.state.fastReverse);
          }}
          onLeft={() => {
            const reverseAmt = this.state.fastReverse
              ? this.state.fastReverse
              : -10;
            this.state.video.progress &&
              this.player.seek(
                reverseAmt + this.state.video.progress.currentTime
              );
            this.setState({ fastReverse: 0 });
          }}
          onRightHold={() => {
            this.setState({
              fastForward: this.state.fastForward
                ? this.state.fastForward + 10
                : 10
            });
            console.log(this.state.fastForward);
          }}
          onRight={() => {
            const forwardAmt = this.state.fastForward
              ? this.state.fastForward
              : 10;
            this.state.video.progress &&
              this.player.seek(
                forwardAmt + this.state.video.progress.currentTime
              );
            this.setState({ fastForward: 0 });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
