import React from "react";
import { Component } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import VideoPlayer from "react-native-video";
import { FirestickKeys } from "../components";
import { number } from "prop-types";

interface VideoProps {
  duration: number;
  currentTime: number;
}
const VideoProgress = (props: VideoProps) => {
  const { duration, currentTime } = props;
  const widthPercentage = (currentTime / duration) * 100;
  console.log(widthPercentage);
  return (
    <View style={{ ...styles2.videoProgress, width: `${widthPercentage}%` }} />
  );
};

const styles2 = StyleSheet.create({
  videoProgress: {
    backgroundColor: "rgba(255,0,0,0.5)",
    height: 4,
    alignSelf: "flex-start"
  }
});

interface VideoPopupProps {
  icon: string;
  text: string;
  duration: number;
  currentTime: number;
  opacity: number | Animated.Value;
}

class VideoPopup extends Component<VideoPopupProps> {
  render() {
    const {
      icon,
      text,
      duration = 0,
      currentTime = 0,
      opacity = 0
    } = this.props;
    return (
      <Animated.View
        style={{
          ...styles.statusContainer,
          opacity
        }}
      >
        {currentTime && duration ? (
          <VideoProgress duration={duration} currentTime={currentTime} />
        ) : (
          <View />
        )}
        <View style={styles.statusTextContainer}>
          {icon ? <Icon name={icon} style={styles.statusIcon} /> : <View />}
          {text ? <Text style={styles.statusText}>{text}</Text> : <View />}
        </View>
      </Animated.View>
    );
  }
}

interface Props {
  navigation: any;
}
interface State {
  paused: boolean;
  fastForward: number;
  fastReverse: number;
  video: {
    duration: number;
    progress: {
      currentTime: number;
    };
  };
  popup: {
    icon: string;
    text: string;
    anim: Animated.Value;
  };
}
export default class Player extends Component<Props, State> {
  state = {
    paused: false,
    fastForward: 0,
    fastReverse: 0,
    video: {
      duration: undefined,
      progress: {
        currentTime: undefined
      }
    },
    popup: {
      autoDismiss: true,
      icon: undefined,
      text: undefined,
      anim: new Animated.Value(0)
    }
  };

  player = undefined;

  displayPopup({ icon, text, autoDismiss = true }) {
    Animated.timing(
      // Animate over time
      this.state.popup.anim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 250 // Make it take a while
      }
    ).start(); // Starts the animation
    this.setState({
      popup: {
        ...this.state.popup,
        icon,
        text
      }
    });
    if (autoDismiss) {
      setTimeout(
        () =>
          Animated.timing(
            // Animate over time
            this.state.popup.anim, // The animated value to drive
            {
              toValue: 0, // Animate to opacity: 1 (opaque)
              duration: 1000 // Make it take a while
            }
          ).start(),
        2000
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam(
      "uri",
      "http://www.html5videoplayer.net/videos/toystory.mp4"
    );

    const currentTime =
      this.state.video.progress.currentTime +
      this.state.fastForward +
      this.state.fastReverse;

    return (
      <View style={styles.container} hasTVPreferredFocus={true}>
        <VideoPlayer
          source={{
            uri
          }} // Can be a URL or a local file.
          style={styles.backgroundVideo}
          paused={this.state.paused}
          onLoad={({ duration }) =>
            this.setState({ video: { ...this.state.video, duration } })
          }
          onProgress={(progress: any) =>
            this.setState({ video: { ...this.state.video, progress } })
          }
          ref={ref => {
            this.player = ref;
          }}
        />
        <VideoPopup
          icon={this.state.popup.icon}
          text={this.state.popup.text}
          duration={this.state.video.duration}
          currentTime={currentTime}
          opacity={this.state.popup.anim}
        />

        <FirestickKeys
          keyPressTimeOut={500}
          onPlay={() => {
            this.setState({ paused: !this.state.paused });
            const displayobj = !this.state.paused
              ? { icon: "play", text: "Play" }
              : { icon: "pause", text: "Paused" };
            this.displayPopup({
              ...displayobj,
              autoDismiss: !this.state.paused
            });
          }}
          onLeftHold={() => {
            const reverseAmt = this.state.fastReverse
              ? this.state.fastReverse - 10
              : -10;
            this.setState({
              fastReverse: reverseAmt
            });
            this.displayPopup({
              icon: "backward",
              text: `${Math.abs(reverseAmt)} sec`,
              autoDismiss: false
            });
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
            this.displayPopup({
              icon: "backward",
              text: `${Math.abs(reverseAmt)} sec`
            });
          }}
          onRightHold={() => {
            const forwardAmt = this.state.fastForward
              ? this.state.fastForward + 10
              : 10;
            this.setState({
              fastForward: forwardAmt
            });
            this.displayPopup({
              icon: "forward",
              text: `${Math.abs(forwardAmt)} sec`,
              autoDismiss: false
            });
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
            this.displayPopup({
              icon: "forward",
              text: `${Math.abs(forwardAmt)} sec`
            });
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
    flex: 1,
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 60
  },
  statusTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
