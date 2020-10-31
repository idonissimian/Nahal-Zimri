import React, { Component } from "react"
/*import { createStackNavigator } from 'react-navigation-stack';*/
import { Image, View, TextInput, Text, ScrollView, TouchableOpacity, Button, Alert, unstable_enableLogBox } from "react-native"
import Icon from 'react-native-vector-icons/Entypo'
import { Divider } from "react-native-elements"


class AdminNewOpenArt extends Component {

    render() {
        return (
            // <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>
            //     <View>
            //         <HeaderComp />

            //     </View>
            //     <View style={styles.imageStyle}>
            //         <Image
            //             source={this.props.imageUri}
            //             style={{ width: "100%", height: "100%" }}
            //         />
            //     </View>
            //     <View>
            //         <ScrollView>
            //             <View style={styles.textStyle}>
            //                 <Text style={styles.textTitleHeaderStyle}> {this.props.title} </Text>
            //             </View>
            //             <View style={styles.textStyle}>
            //                 <Text style={styles.textTitleStyle}>{this.props.detail}</Text>
            //             </View>
            //             <View style={styles.textStyle}>
            //                 <Text style={styles.textDetailStyle}>{this.props.content}</Text>
            //             </View>
            //         </ScrollView>
            //     </View>
            // </View>

            <View style={{ width: "100%", height: "100%" }}>

                <View style={styles.imgStyle}>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Image source={this.props.imageUri}
                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        />

                    </View>

                </View>

                <View style={{ width: "100%", height: "60%", backgroundColor: "#FAE5D3" }}>
                    <View style={styles.textVStyle}>


                        <Text style={styles.textStyle}> {this.props.title} </Text>
                    </View>
                    <View style={styles.mainStyle}>
                        <View style={{ height: '100%' }}>
                            <ScrollView>


                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textTitleStyle}>{this.props.detail}</Text>
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textDetailStyle}>{this.props.content}</Text>
                                </View>


                                <Divider />


                            </ScrollView>
                        </View>


                    </View>

                    <View style={{ width: "100%", height: "15%", alignSelf: 'center' }}>

                        <TouchableOpacity
                            onPress={this.props.onCrossPress}
                        >
                            <Icon name="cross" size={50} color='gray'
                                style={{ alignSelf: 'center' }}
                            />

                        </TouchableOpacity>


                    </View>
                </View>
            </View>
        )
    }
}

export default AdminNewOpenArt;


const styles = {
    imgStyle: {
        width: "100%",
        height: "40%",
        alignSelf: 'center',
    },
    textStyle: {
        alignItems: 'center',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: "gray",
        textShadowRadius: 15,
        paddingVertical: 0
    },
    textVStyle: {
        alignItems: 'center',
        marginTop: "3%",
        width: "100%",
        height: "10%"
    },
    mainStyle: {
        width: "92%",
        height: "75%",
        alignSelf: 'center',
        backgroundColor: "#FBF5E5",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#CECECE"
    },
    mainTextStyle: {
        fontSize: 16,
        marginRight: "4%",
        marginLeft: "4%"
    },
    carouselStyle: {
        borderRadius: 5,
        backgroundColor: "white",
        height: "100%",
        width: "100%"

    },
   
    textViewStyle: {
        flexDirection: 'row',
        marginTop: "0.3%",
        width:"97%",
       alignSelf: 'center'

    },
    textExplainStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textTitleStyle : {
        fontSize: 18,
        fontWeight:'bold'
    },
    textDetailStyle : {
        fontSize:17
    }


}