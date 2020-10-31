import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,

} from "react-native";

class UnitRoutes extends Component {
    render() {
        return (
            <View style={styles.routeStyle}>

                <View style={{ flex: 2 }}>
                    <Image
                        source={this.props.imageUri}
                        style={{ width: "100%", height: "100%" }}
                    />
                </View>
                <View style={{ flex: 3 }}>
                    <View style={{height:'85%'}}>
                        <View style={styles.textStyle}>
                            <Text style={styles.textTitleStyle}>שם המסלול: </Text>
                            <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.name}</Text>
                        </View>
                        <View style={styles.textStyle}>
                            <Text style={styles.textTitleStyle}>רמת הקושי: </Text>
                            <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.level}</Text>
                        </View>
                        <View style={styles.textStyle}>
                            <Text style={styles.textTitleStyle}>ק"מ: </Text>
                            <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.km}</Text>
                        </View>
                        <View style={styles.textStyle}>
                            <Text style={styles.textTitleStyle}>זמן ההליכה: </Text>
                            <Text numberOfLines={1} style={styles.textDetailStyle}>{this.props.duration}</Text>
                        </View>
                    </View>
                    <View style={{height:'15%',alignSelf:'center'}}>
                        <Text>פרטים נוספים...</Text>
                    </View>

                </View>
            </View>
        );
    }
}
export default UnitRoutes;

const styles = StyleSheet.create({
    routeStyle: {
        backgroundColor: "#F4D5A7",
        borderColor: "#FFAF50",
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 1.1,
        flexDirection: 'row-reverse',
        height: 155,
        width: "100%"

    },
    imageStyle: {
        marginTop: 10,
        marginLeft: 10,
        borderColor: "#FFAF50",
        position: 'absolute',
        borderWidth: 4,
        height: "85%",
        width: "30%"
    },
    textStyle: {
        flexDirection: 'row'
    },
    detailStyle: {
        height: 50,
        width: "69%",
        marginLeft: 111,

    },
    dateStyle: {
        height: 30,
        width: "50%",
        marginLeft: 180,
        marginTop: 10

    },
    textTitleStyle: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: "3%"
    },
    textDetailStyle: {
        fontWeight: "normal",
        fontSize: 16,
        flex: 1,
        textAlign: 'left'
        //alignSelf: "center"
    }


});