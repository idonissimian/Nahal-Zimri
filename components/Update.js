import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Update extends React.Component {
    render() {
        return (
            <View >
                <Text>------------------------------</Text>
                    <Text> {this.props.children}</Text>
                <Text>------------------------------</Text>
            </View>
        );
    }
}
export default Update;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});