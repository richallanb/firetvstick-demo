import {connect} from 'react-redux';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  createReduxContainer,
  createNavigationReducer,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { Player } from "./player";
import { ShowsLayout } from "./shows";
import { EpisodesLayout } from "./episodes";

const initialCategory = global.__provider().categories[0].type;

export const router = createStackNavigator(
  {
    Player: {
      screen: Player
    },
    Shows: {
      screen: ShowsLayout
    },
    Episodes: {
      screen: EpisodesLayout
    }
  },
  {
    cardStyle: { backgroundColor: "#242421", opacity: 1 },
    initialRouteName: "Shows",
    initialRouteKey: initialCategory,
    initialRouteParams: {
      category: initialCategory
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      },
      containerStyle: { backgroundColor: "transparent" },
      screenInterpolator: undefined
    }),
    headerMode: "none"
  }
);

const App = createReduxContainer(router);
const mapStateToProps = (state) => ({
  state: state.navigation,
});
export const RouterComponent = connect(mapStateToProps)(App);
//export const RouterComponent = createAppContainer(router);

export const navReducer = createNavigationReducer(router);
