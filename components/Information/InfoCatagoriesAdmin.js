import React from "react"
import {
    Image,
    View,
    Text,
    TouchableWithoutFeedback,
    ImageBackground
} from "react-native"

import { createStackNavigator } from '@react-navigation/stack';
import InformationAdminPage from "./InformationAdminPage"

let typeName = {
    type: "none"
};


export function InfoCatagoriesScreen({ navigation }) {
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <ImageBackground source={require('../../assets/img/homePageAdmin_background.jpg')}
                style={{ flex: 1, resizeMode: 'cover' }}>


                <View style={styles.rowStyle1}>
                    <TouchableWithoutFeedback

                        onPress={() => {
                            typeName.type = "Mammals";
                            navigation.navigate('InfoAdminScreen');
                        }
                        }
                    >
                        <View style={styles.infoStyle}>
                            <Image
                                source={require('../../assets/img/mammal.jpg')}
                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                            />
                            <View style={styles.textStyle}>
                                <Text>יונקים</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => {
                        typeName.type = "Birds";
                        navigation.navigate('InfoAdminScreen');
                    }
                    }>
                        <View style={styles.infoStyle}>
                            <Image
                                source={require('../../assets/img/bird.jpg')}
                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                            />
                            <View style={styles.textStyle}>
                                <Text>ציפורים</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>


                </View>


                <View style={styles.rowStyle2}>
                    <TouchableWithoutFeedback onPress={() => {
                        typeName.type = "Blossom";
                        navigation.navigate('InfoAdminScreen');
                    }
                    } >
                        <View style={styles.infoStyle} >
                            <Image
                                source={require('../../assets/img/blossom.jpg')}
                                style={{ width: "100%", height: "100%" }}
                            />
                            <View style={styles.textStyle}>
                                <Text>פריחה</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => {
                        typeName.type = "Pisga";
                        navigation.navigate('InfoAdminScreen');
                    }
                    }>
                        <View style={styles.infoStyle}>
                            <Image
                                source={require('../../assets/img/Pisga.jpg')}
                                //   style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                style={{ width: "100%", height: "100%" }}
                            />
                            <View style={styles.textStyle}>
                                <Text>פסגת זאב</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>


                </View>
                <View style={styles.rowStyle2}>

                    <TouchableWithoutFeedback onPress={() => {
                        typeName.type = "Arch";
                        navigation.navigate('InfoAdminScreen');
                    }
                    }>
                        <View style={styles.infoStyle2}>
                            <Image
                                source={require('../../assets/img/arch.jpg')}
                                //   style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                style={{ width: "100%", height: "100%" }}
                            />
                            <View style={styles.textStyle}>
                                <Text>ארכיאולוגיה</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>


                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <View style={{ flex: 1 }}>


                    </View>
                </TouchableWithoutFeedback>

            </ImageBackground>
        </View>
    )

}
function InfoAdmin() {

    return (

        <InformationAdminPage dataType={typeName.type} />
    );
}


const InfoStack = createStackNavigator();

function InfoCatagoriesAdmin() {
    return (
        <InfoStack.Navigator initialRouteName="InfoCatScreen">
            <InfoStack.Screen options={{ headerShown: false }} name="InfoCatScreen" component={InfoCatagoriesScreen} />
            <InfoStack.Screen options={{ headerShown: false }} name="InfoAdminScreen" component={InfoAdmin} />

        </InfoStack.Navigator>
    );
}

export default InfoCatagoriesAdmin;


const styles = {
    rowStyle1: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: "90%",
        height: "18%",
        alignSelf: "center",
        marginTop: "24%",
        backgroundColor: 'rgba(52, 52, 52, 0)'

    },
    rowStyle2: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: "90%",
        height: "18%",
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: 'rgba(52, 52, 52, 0)'

    },
    infoStyle: {
        backgroundColor: "#F0B27A",
        borderColor: "gray",
        overflow: 'hidden',
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "45%",
        height: "100%",
        marginRight: 14,
        marginLeft: 8


    },
    infoStyle2: {
        backgroundColor: "#F0B27A",
        borderColor: "gray",
        overflow: 'hidden',
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "45%",
        height: "100%",
        marginRight: 14,
        marginLeft: "28%"


    },
    textStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F0B27A',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    }

}