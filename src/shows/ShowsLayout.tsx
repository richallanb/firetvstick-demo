import React, { useEffect } from "react";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  BackHandler,
  NativeEventSubscription
} from "react-native";
import { StackActions, NavigationEvents } from "react-navigation";
import * as actions from "../redux-store/actions";
import { ShowList, ShowHeader } from "./views";
import { StateProvider } from "./context";
import { DATA_CONST } from "../constants";

interface Props {
  navigation: any;
  initializeShows(category: string): AnyAction;
}

const ShowsLayout = (props: Props) => {
  const { navigation, initializeShows } = props;
  const category = navigation.getParam(
    "category",
    global.__provider().categories[0].type
  );

  let backHandler: NativeEventSubscription;
  const componentDidMountEvents = () => {
    backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!navigation.isFocused) {
        navigation.dispatch(
          StackActions.pop({
            n: 1
          })
        );
        return true;
      }
      return false;
    });
  };

  const componentDidUnmountEvents = () => {
    backHandler.remove();
  };

  useEffect(() => {
    componentDidMountEvents();
    return componentDidUnmountEvents;
  }, [false]);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          if (category !== DATA_CONST.CATEGORIES.SEARCH_CATEGORY) {
            initializeShows(category);
          }
        }}
      />
      <StateProvider>
        <ShowHeader
          category={category}
          style={styles.footer}
          navigation={navigation}
        />
        <ShowList category={category} navigation={navigation} />
      </StateProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(36,36,33)"
  },
  footer: {}
});

const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => ({
  shows: state.shows
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowsLayout);
