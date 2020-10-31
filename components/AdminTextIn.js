import React, { Component } from 'react';
import {TextInput, View,Text, StyleSheet, TouchableOpacity } from 'react-native';

class AdminTextIn extends Component {
    render() {
        return (
            <View>
            <TextInput style={styles.textInput}> </TextInput>
            </View>

        );
    }
}
export default AdminTextIn;

const styles = StyleSheet.create({
    
    textInput: {
       backgroundColor:'white',
        borderRadius:5,
        height:15,
       

    }
});

