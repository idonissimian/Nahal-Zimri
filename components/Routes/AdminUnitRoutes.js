import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Button
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Divider } from 'react-native-paper';


class AdminUnitRoutes extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={this.props.onExpandPress}
                    >
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image source={this.props.imageUri}
                                style={styles.imageStyle}

                            />
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 2 }}>

                    <View style={{ width: '100%', height: '79%' }}>

                        <View style={styles.textStyle}>
                            <Text style={styles.textTitleStyle}
                                numberOfLines={1}
                            >שם המסלול:  {this.props.name}</Text>

                        </View>
                        <Divider />
                        <View style={styles.rowStyle}>
                            <Text style={styles.textTitleStyle}>רמת הקושי:  {this.props.level}</Text>
                        </View>
                        <Divider />
                        <View style={styles.rowStyle}>
                            <Text style={styles.textTitleStyle}
                                numberOfLines={1}
                            >ק"מ:  {this.props.km}</Text>
                        </View>
                        <Divider />
                        <View style={styles.rowStyle}>
                            <Text style={styles.textTitleStyle}
                                numberOfLines={1}
                            >משך זמן ההליכה:  {this.props.duration}</Text>
                        </View>
                        <Divider />
                        <View style={styles.rowStyle}>
                            <Text style={styles.textTitleStyle}
                                numberOfLines={1}
                            >סוג המסלול:  {this.props.type}</Text>
                        </View>
                        <Divider />
                        <View style={styles.rowStyle}>
                            <Text style={styles.textTitleStyle}
                                numberOfLines={1}
                            >פרטים:  {this.props.details}</Text>
                        </View>


                    </View>
                    <Divider />

                    <View style={styles.buttonsContainer}>


                        <View style={styles.editButtons}>
                            <Button
                                title="מחק"
                                color="green"
                                onPress={this.props.onDelete}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={this.props.onReplaceImagePress}
                        >
                            <View style={{ marginLeft: "3%" }}>
                                <Icon name="image" size={36} color="green" />
                            </View>
                        </TouchableOpacity>





                    </View>

                </View>
            </View>



        );
    }
}
export default AdminUnitRoutes;




const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        height: 180,
        width: "100%",
        alignSelf: 'center',
        marginTop:'2%',
        borderRadius: 10,
        flexDirection: 'row-reverse',
        backgroundColor: '#F4D5A7',
        overflow: 'hidden'


    },
    headlineStyle: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: "gray",
        textShadowRadius: 10
    },


    imageStyle: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        //   borderBottomLeftRadius: 10,   // cause some scrolling problems
        //   borderTopLeftRadius: 10
    },
    editButtons: {
        marginLeft: "2%"
    },
    buttonsContainer: {
        width: "100%",
        height: "21%",
        flexDirection: 'row',
    },
    textTitleStyle: {
        // alignSelf: "center",
        fontWeight: "bold",
        fontSize: 17,
        marginLeft: 2,

    },
    rowStyle: {
        flex: 1
    }
}
