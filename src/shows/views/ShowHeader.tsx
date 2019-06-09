import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { DISPLAY_CONST, DATA_CONST } from "../../constants";
import { StateContext } from "../context";
import { Show } from "../../types";
import { AnyAction } from "redux";
import * as actions from "../../redux-store/actions";
import { Category } from "../components";

let winSize = Dimensions.get("window");

interface Props {
  style: object;
  shows: {
    data: Show[];
    searchData: Show[];
  };
  category: string;
  navigation: any;
  initializeShows(category: string): AnyAction;
  updateCategory: (category: string) => AnyAction;
  searchShowData: (query: string) => AnyAction;
}

class ShowHeader extends Component<Props> {
  static contextType = StateContext;
  public static defaultProps = {
    style: {}
  };
  public render() {
    const [state, dispatch] = this.context;

    const resetSelectedShow = () => {
      dispatch({
        type: "SET_SELECTED_SHOW",
        payload: undefined
      });
    };

    const setSelectedCategory = category => {
      dispatch({
        type: "SET_SELECTED_CATEGORY",
        payload: category
      });
    };

    const updateSearchBarVisibility = (visible: boolean) => {
      dispatch({
        type: "UPDATE_SEARCH_BAR_VISIBILITY",
        payload: visible
      });
    };

    const { selectedShow, selectedCategory, searchBarVisible } = state;
    const {
      shows,
      initializeShows,
      searchShowData,
      category,
      navigation
    } = this.props;
    const showsData = category === DATA_CONST.CATEGORIES.SEARCH_CATEGORY ? shows.searchData : shows.data;
    const show = showsData[selectedShow];
    const focusedCategory = selectedCategory || category;

    const updateCategory = (newCategory, jumpTo) => {
      if (category != newCategory) {
        // if (jumpTo) {
        //   initializeShows(newCategory);
        // }
        navigation.dispatch(
          NavigationActions.navigate({
            routeName: "Shows",
            params: { category: newCategory },
            key: newCategory
          })
        );
      }
    };

    const categoryView = () => {
      const categories = global
        .__provider()
        .categories.map(({ name, type }) => (
          <Category
            preferredFocus={type === category}
            key={type}
            title={name}
            onFocus={() => {
              resetSelectedShow();
              setSelectedCategory(type);
            }}
            onPress={() => updateCategory(type, true)}
            focused={type === focusedCategory}
          />
        ));
      return (
        <View style={styles.categoryContainer}>
          {categories}
          <Category
            preferredFocus={"search" === category}
            key="search"
            icon="search"
            onFocus={() => {
              resetSelectedShow();
              setSelectedCategory("search");
            }}
            focused={"search" === focusedCategory}
            onPress={() => updateSearchBarVisibility(true)}
          />
          {searchBarVisible && (
            <TextInput
              placeholder="Search"
              onSubmitEditing={({ nativeEvent: { text: query } }) => {
                if (query && query.length > 0) {
                  searchShowData(query);
                  updateCategory("search", false);
                }
              }}
              onBlur={() => updateSearchBarVisibility(false)}
              autoFocus={true}
            />
          )}
        </View>
      );
    };
    const descriptionView = () => (
      <View style={styles.descriptionContainer}>
        <Image style={styles.image} source={{ uri: show.wallArt }} />
        <View style={styles.descriptionTextContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {show.name}
          </Text>
          <Text numberOfLines={6} style={styles.description}>
            {show.description.trim()}
          </Text>
        </View>
      </View>
    );
    if (selectedShow === undefined || showsData.length < 1) {
      return (
        <View style={{ ...styles.container, ...this.props.style }}>
          {categoryView()}
        </View>
      );
    }
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        {categoryView()}
        {descriptionView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: winSize.width,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: "rgb(30,30,25)",
    elevation: 5
  },
  descriptionContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  descriptionTextContainer: {
    justifyContent: "flex-start",
    height: DISPLAY_CONST.SHOW_ITEM.ITEM_WIDTH * 0.9
  },
  description: {
    opacity: 1,
    color: "white",
    width: winSize.width - 260,
    fontSize: 12
  },
  title: {
    opacity: 1,
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    marginTop: -2.5
  },
  image: {
    width: DISPLAY_CONST.SHOW_ITEM.ITEM_HEIGHT * 0.9,
    height: DISPLAY_CONST.SHOW_ITEM.ITEM_WIDTH * 0.9
  }
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
)(ShowHeader);
