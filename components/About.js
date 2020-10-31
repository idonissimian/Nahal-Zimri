import React, { Component, useState, useEffect, useLayoutEffect } from "react"
import { TextInput, Alert, ScrollView, Text, TouchableOpacity } from "react-native"
import { View } from "native-base"
import { db } from '../config/Firebase'
import HeaderComp from "./explore/HeaderComp"
//import firebase from "../config/Firebase"


import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from "./DrawerContent";

function AboutScreen({ navigation }) {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({ Title: '', Body: '', SubTitle: '', ExtraBody: '' });


    db.ref('About').once('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            let dataA = snapshot.val();
            console.log("data loaded: " + loaded);
            if (loaded === false) {
                setLoaded(true);
                setData({ Title: dataA.Title, Body: dataA.Body, SubTitle: dataA.SubTitle, ExtraBody: dataA.ExtraBody})
            }

        }
    });

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>
            <HeaderComp
                openUserProfile={() => navigation.navigate('Current')}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />
            <View style={{ width: "96%", height: '89%', alignSelf: 'center' }}>


                <View style={{ width: "90%", height: '20%', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: '10%', color: '#404040' }}>
                        {data.Title}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: '2%', color: '#404040' }}>
                        {data.SubTitle}
                    </Text>
                </View>
                <View style={styles.bodyStyle}>
                    <ScrollView>
                        <Text style={{ fontSize: 16, fontFamily: '' }}>
                            {data.Body}
                        </Text>

                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>קצת על האפליקציה : </Text>

                        <Text style={{ fontSize: 16, padding: 0, textAlign: 'left' }}>

                            {data.ExtraBody}
                        </Text>
                    </ScrollView>
                </View>






            </View>

        </View>
    )
}

const DrawerAbout = createDrawerNavigator();

function About() {

    return (
        <DrawerAbout.Navigator initialRouteName="reports" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContent {...props} />}>
            <DrawerAbout.Screen name="reports" component={AboutScreen} />

        </DrawerAbout.Navigator>

    );
}

export default About;

const styles = {
    eventStyle: {
        backgroundColor: "#F6D365",
        borderColor: "#FFAF50",
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 2,
        fontSize: 20,
        marginTop: 10
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
        flexDirection: 'row-reverse'
    },
    textTitleStyle: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10
    },
    textDetailStyle: {
        fontWeight: "normal",
        fontSize: 16,
        alignSelf: "center"
    },
    bodyStyle: {
        width: "95%",
        height: '78%',
        alignSelf: 'center',

        // borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#4A4A4A'
    }
}


