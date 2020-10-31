
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,

} from "react-native";
import { Divider } from "react-native-elements";

class EventBoxUser extends React.Component {
    render() {
        return (
            <View style={styles.eventStyle}>
                <View style={{ flex: 1}}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Image
                            source={this.props.imageUri}
                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        />
                    </View>
                </View >

                <View style={{ flex: 2 }}>
                    <View style={styles.textStyle}>
                        <Text style={styles.textTitleStyle}>שם האירוע: </Text>
                        <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.name} </Text>
                    </View>
                    <Divider/>
                    <View style={styles.textStyle}>
                        <Text style={styles.textTitleStyle}>תאריך: </Text>
                        <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.date}</Text>
                    </View>
                    <Divider/>
                    <View style={styles.textStyle}>
                        <Text style={styles.textTitleStyle}>יום: </Text>
                        <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.weekday}</Text>
                    </View>
                    <Divider/>
                    <View style={styles.textStyle}>
                        <Text style={styles.textTitleStyle}>שעה: </Text>
                        <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.hour}</Text>
                    </View>
                    <Divider/>
                    <View style={styles.textStyle}>
                        <Text style={styles.textTitleStyle}>מיקום: </Text>
                        <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.location}</Text>
                    </View>
                    <Divider/>
                    <View style={styles.textStyle}>
                        <Text style={styles.textTitleStyle}>פרטים: </Text>
                        <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.details}</Text>
                    </View>
                </View>

            </View>

        );
    }
}
export default EventBoxUser;

const styles = StyleSheet.create({

    eventStyle: {
        backgroundColor: "#F4D5A7",
        borderColor: "#FFAF50",
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 1.1,
        fontSize: 20,
        marginTop: 10,
        width:'100%',
        height:155,
        flexDirection:'row-reverse'
    },

    textStyle: {
        flexDirection: 'row',
        flex:1

    },
    ButtonStyle: {
        width: "69%",
        // marginLeft:100,


    },
    detailStyle: {
        height: 50,
        width: "69%",
        marginLeft: 111,
        height: "75%",

    },
    dateStyle: {
        height: 30,
        width: "50%",
        marginLeft: 180,
        marginTop: 10

    },
    textTitleStyle: {
     
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 2
       
 
    },
    textDetailStyle: {
        //fontWeight: "normal",
        fontSize: 16,
        flex:1,
        textAlign:'left'

        //alignSelf: "center"
    }

});

