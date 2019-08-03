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
import {setOption} from '../context';

interface Props {
    navigation: any;
}

class ConfigurationBody extends Component<Props> {
    static contextType = StateContext;

    render() {
        const [state, dispatch] = this.context;
        const { navigation } = this.props;

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
                        options={[
                            { title: 'dubs', value: 'dubs' },
                            { title: 'subs', value: 'subs' }
                        ]}
                        onPress={() => { }}
                    />
                </View>
            </ScrollView>
        );
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