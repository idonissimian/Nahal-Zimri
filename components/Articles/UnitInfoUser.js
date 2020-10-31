import React, { Component } from "react";
import {
    View,
    Text,
    Image,

} from "react-native";
import { Divider } from 'react-native-paper';

class UnitInfoUser extends React.Component {

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={{ flex: 2 }}>

                    <View style={{ width: '100%', height: '100%' }}>
                        <Image source={this.props.imageUri}
                            style={styles.imageStyle}

                        />
                    </View>

                </View>
                <View style={{ flex: 3 }}>

            


                        <View style={{ height: '16%'}}>
                            <Text style={styles.textTitleStyle}>{this.props.title}</Text>
                        </View>

                        <Divider />

                        <View style={{ height: "60%"}}>
                            <Text style={styles.textDetailStyle}>{this.props.subTitle}</Text>
                        </View>
                       
                        <View style={{ height: "10%"}}>
                            <Text style={styles.textDetailStyle}>להמשך הכתבה...</Text>
                        </View>

                        <Divider />
                        <View style={{ height: "14%"}}>
                            <Text style={styles.textDetailStyle}> תאריך העלאה | {this.props.date}</Text>
                        </View>



                  





                </View>

            </View>
        );
    }
}
export default UnitInfoUser;


const styles = {

    containerStyle: {
        height: 180,
        width: "100%",
        alignSelf: 'center',
        borderWidth:1.1,
        borderColor: '#FFAF50',
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
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 18,

    },
    textDetailStyle: {
        fontWeight: "normal",
        fontSize: 16
      
    }
}

// const styles = StyleSheet.create({
//     routeStyle: {
//         backgroundColor: "#F4D5A7",
//         borderColor: "#FFAF50",
//         overflow: 'hidden',
//         borderRadius: 15,
//         borderWidth: 1,
//         fontSize: 20,
//         marginTop: "2%"
//     },
//     imageStyle: {
//         marginTop: 10,
//         marginLeft: 10,
//         borderColor: "#FFAF50",
//         position: 'absolute',
//         borderWidth: 2,
//         height: "85%",
//         width: "30%"
//     },
//     textStyle: {
//         flexDirection: 'row-reverse'
//     },
//     detailStyle: {
//         height: 50,
//         width: "69%",
//         marginLeft: "31%",

//     },
//     dateStyle: {
//         height: 30,
//         width: "50%",
//         marginLeft: "51%",
//         marginTop: 10

//     },
//     textTitleStyle: {
//         alignSelf: "center",
//         fontWeight: "bold",
//         fontSize: 20,
//         marginLeft: 10
//     },
//     textDetailStyle: {
//         fontWeight: "normal",
//         fontSize: 16,
//         //alignSelf: "center"
//     }


// });