import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ScrollView
} from "react-native";
import { Divider } from 'react-native-paper';

class ReportBox extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={{ flex: 6 }}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text numberOfLines={1}>קטגוריה:     {this.props.catagory}</Text>
                </View>
                <Divider/>
                <View style={{ flex: 4, paddingLeft: 10, paddingTop: 10 }}>
                    <ScrollView>
                        <Text>תיאור:    {this.props.name}</Text>
                    </ScrollView>
                </View>
                <Divider/>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text>{this.props.date}</Text>
                </View>

            </View>
        );
    }
}
export default ReportBox;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        height: 310,
        width: 175,
        marginLeft: 10,
        borderWidth: 1.1,
        borderColor: '#FFAF50',
        backgroundColor: '#F4D5A7'
    }
}