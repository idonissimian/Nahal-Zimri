import React, { Component } from "react"
import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native"
import { Divider } from "react-native-paper"
import Icon from 'react-native-vector-icons/Entypo'
class NewOpenRoute extends Component {
   
    render() {
        return (

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
                        
                        <Text style={styles.textStyle}>{this.props.name}</Text>
                    </View>
                    <View style={styles.mainStyle}>
                        <View style={{ height: '90%' }}>
                            <ScrollView>

                                <View style={{ width: "96%",alignSelf:'center'}}>

                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>רמת קושי: </Text>
                                    
                                    <Text style={styles.boxTextStyle}>{this.props.name}</Text>
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>ק"מ: </Text>
                                    <Text style={styles.boxTextStyle}>{this.props.km}</Text>
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>משך זמן ההליכה: </Text>
                                    
                                    <Text style={styles.boxTextStyle}>{this.props.duration}</Text>
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>סוג המסלול: </Text>
                                    
                                    <Text style={styles.boxTextStyle}>{this.props.type}</Text>
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>סימון: </Text>
                                   
                                    <Text style={styles.boxTextStyle}>{this.props.mark}</Text>
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>בע"ח במסלול: </Text>
                                   
                                    <Text style={styles.boxTextStyle}>{this.props.animals}</Text>
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>פרטים: </Text>
                                    
                                    <Text style={styles.boxTextStyle}>{this.props.details}</Text>
                                </View>

                                </View>








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

/*
<UnitRoutes imageUri={{ uri: item.imageLink }}
                                            name={item.name}
                                            level={item.level}
                                            km={item.km}
                                            duration={item.duration}
                                            type={item.type}
                                            details={item.details}
*/
export default NewOpenRoute;



const styles = {
    imgStyle: {
        width: "100%",
        height: "40%",
        // backgroundColor: '#FAE5D3',
        alignSelf: 'center',
        // backgroundColor: '#434343'
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
    buttonStyle: {
        fontSize: 20
    },
    textViewStyle: {
        flexDirection: 'row',
        marginTop: "0.3%",
        
    },
    textExplainStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    boxTextStyle: {
        fontSize:19,
        flex:1,
        textAlign:'left'
    }


}