import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from "react-native-elements";

type Option = {
    title: string,
    value: string
}

interface Props {
    options: Option[],
    choice?: string,
    onPress?: (choice: string) => void
}

class Choices extends Component<Props> {
    render() {
        const { choice, options = [], onPress = () => { } } = this.props;
        const optionRenderer = options.map(option => <CheckBox
            center
            title={option.title}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={option.value === choice}
            containerStyle={styles.checkBoxConainer}
            textStyle={styles.checkBoxText}
            onPress={() => onPress(option.value)}
        />);
        return (
            <View style={{ flexDirection: "row" }}>
                {optionRenderer}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    checkBoxConainer: {
        backgroundColor: "transparent",
        borderWidth: 0
    },
    checkBoxText: {
        color: "white"
    }
});

export default Choices;