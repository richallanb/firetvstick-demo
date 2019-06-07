import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import VideoPlayer from "react-native-video";
import { FirestickKeys } from "../components";

interface Props {
  navigation: any
};
interface State {
  paused: boolean,
  fastForward: number,
  fastReverse: number,
  video: {
    progress: {
      currentTime: number
    }
  },
  status: {
    display: object,
    anim: object
  }
}
export default class Player extends Component<Props, State> {
  state = {
    paused: false,
    fastForward: 0,
    fastReverse: 0,
    status: {
      display: undefined,
      anim: new Animated.Value(0)
    },
    video: {
      progress: {
        currentTime: undefined
      }
    }
  };

  player = undefined;

  displayPopup = ({ icon, text, autoDismiss = true }) => {
    Animated.timing(
      // Animate over time
      this.state.status.anim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 250 // Make it take a while
      }
    ).start(); // Starts the animation
    if (autoDismiss) {
      setTimeout(
        (() =>
          Animated.timing(
            // Animate over time
            this.state.status.anim, // The animated value to drive
            {
              toValue: 0, // Animate to opacity: 1 (opaque)
              duration: 1000 // Make it take a while
            }
          ).start()).bind(this),
        2000
      );
    }
    console.log(this.state);
    this.setState({
      status: {
        ...this.state.status,
        display: (
          <Animated.View
            style={{
              ...styles.statusContainer,
              opacity: this.state.status.anim
            }}
          >
            <Icon name={icon} style={styles.statusIcon} />
            <Text style={styles.statusText}>{text}</Text>
          </Animated.View>
        )
      }
    });
  };

  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam(
      "uri",
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_30mb.mp4"
    );

    return (
      <View style={styles.container} hasTVPreferredFocus={true}>
        <VideoPlayer
          source={{
            uri
          }} // Can be a URL or a local file.
          style={styles.backgroundVideo}
          paused={this.state.paused}
          onProgress={(progress: any) => this.setState({ video: { progress } })}
          ref={ref => {
            this.player = ref;
          }}
        />
        {this.state.status.display || <View />}

        <FirestickKeys
          onPlay={() => {
            console.log(this.state.paused);
            this.setState({ paused: !this.state.paused });
            const displayobj = !this.state.paused
              ? { icon: "play", text: "Play" }
              : { icon: "pause", text: "Paused" };
            this.displayPopup({
              ...displayobj,
              autoDismiss: !this.state.paused
            });
          }}
          // onLeftHold={() => {
          //   this.setState({
          //     fastReverse: this.state.fastReverse
          //       ? this.state.fastReverse - 10
          //       : -10
          //   });
          //   console.log(this.state.fastReverse);
          // }}
          onLeft={() => {
            const reverseAmt = this.state.fastReverse
              ? this.state.fastReverse
              : -10;
            this.state.video.progress &&
              this.player.seek(
                reverseAmt + this.state.video.progress.currentTime
              );
            this.setState({ fastReverse: 0 });
            this.displayPopup({ icon: "backward", text: "" });
          }}
          // onRightHold={() => {
          //   this.setState({
          //     fastForward: this.state.fastForward
          //       ? this.state.fastForward + 10
          //       : 10
          //   });
          //   console.log(this.state.fastForward);
          // }}
          onRight={() => {
            const forwardAmt = this.state.fastForward
              ? this.state.fastForward
              : 10;
            this.state.video.progress &&
              this.player.seek(
                forwardAmt + this.state.video.progress.currentTime
              );
            this.setState({ fastForward: 0 });
            this.displayPopup({ icon: "forward", text: "" });
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
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 500
  },
  statusContainer: {
    zIndex: 700,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 60
  },
  statusText: {
    color: "#FFF",
    fontSize: 20
  },
  statusIcon: {
    color: "#FFF",
    fontSize: 25,
    marginRight: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
