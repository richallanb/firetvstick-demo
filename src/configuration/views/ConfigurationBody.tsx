/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { StackActions } from "react-navigation";
import { debounce } from "lodash";
import { DISPLAY_CONST, DATA_CONST } from "../../constants";
import { StateContext } from "../context";
import { CheckBox } from "react-native-elements";
import Choices from "../options/Choices";
import { setOption as setOptionAction } from '../context';

interface Props {
}

class ConfigurationBody extends Component<Props> {
    static contextType = StateContext;

    render() {
        const [state, dispatch] = this.context;
        const { language, quality } = state;
        const setOption = (...args) => dispatch(setOptionAction(...args));

        return (
            <ScrollView
                removeClippedSubviews={false}
                contentContainerStyle={styles.scrollInnerContainer}
                style={styles.scrollOuterContainer}
            >
                <View
                    style={styles.container}
                >
                    <Choices
                        title="Language"
                        options={[
                            { title: 'dubs', value: 'dubs' },
                            { title: 'subs', value: 'subs' }
                        ]}
                        onPress={choice => setOption("language", choice)}
                        choice={language}
                    />
                    <Choices
                        title="Quality"
                        choice={quality}
                        options={[
                            { title: '1080p', value: '5000000' },
                            { title: '720p', value: '2500000' },
                            { title: '480p', value: '1250000' }
                        ]}
                        onPress={choice => setOption("quality", choice)}
                    />
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        const [_,dispatch] = this.context;
        (async () => {
            const settings = await global.__provider().getSettings().getSettings();
            dispatch({
                type: "INITIALIZE_OPTIONS",
                payload: settings
              });
          })();
    }
}

const styles = StyleSheet.create({
    scrollInnerContainer: {
        paddingLeft: 12,
        paddingRight: 12,
        marginBottom: 10
    },
    scrollOuterContainer: {
        paddingBottom: 10
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },
    infiniteScrollingContainer: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40
    }
});

export default ConfigurationBody;