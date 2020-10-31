import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import {
    Avatar,
    Title,
    Drawer
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "../config/Firebase"

export function DrawerContentAdmin(props) {


    return (
        <View style={{ flex: 1 }}>
            
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.titleSection}>
                        <View style={{ marginRight: 10, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Title style={styles.title}>נחל זמרי</Title>

                            </View>
                            <Avatar.Image
                                source={require('../assets/img/mammal.jpg')}
                                size={110}
                            />
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                            label="מסך ראשי                "
                            labelStyle={{fontSize: 20}}
                            onPress={() => { props.navigation.navigate('HomeAdmin') }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                            label="כתבות                "
                            labelStyle={{fontSize: 20 }}
                            onPress={() => { props.navigation.navigate('InfAd') }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}
                            label="אירועים                  "
                            labelStyle={{fontSize: 20 }}
                            onPress={() => { props.navigation.navigate('EventsAdmin') }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                            label="מסלולים                "
                            labelStyle={{fontSize: 20 }}
                            onPress={() => { props.navigation.navigate('RouAd') }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                            label="מידע                "
                            labelStyle={{fontSize: 20 }}
                            onPress={() => { props.navigation.navigate('InfoCat') }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                            label="תצפיות                "
                            labelStyle={{fontSize: 20 }}
                            onPress={() => { props.navigation.navigate('Reports') }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                            label="פייסבוק                "
                            labelStyle={{ color: '#3b5998', fontWeight: "bold", fontSize: 20 }}
                            onPress={() => { Linking.openURL('https://www.facebook.com/NahalZimri') }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                            label="אינסטגרם                "
                            onPress={() => { Linking.openURL('https://www.instagram.com/nahalzimri/') }}
                            labelStyle={{ color: '#fe4164', fontWeight: "bold", fontSize: 20 }}
                        />
                        <DrawerItem style={{ flexDirection: 'row-reverse' }}

                        label="אודות                "
                        onPress={() => { props.navigation.navigate('AboutAdmin') }}
                        labelStyle={{ fontWeight: "bold", fontSize: 20 }}
                        />

                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>

                <DrawerItem style={{ flexDirection: 'row-reverse' }}
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="התנתק"
                    onPress={() => firebase.auth().signOut()}

                />

            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,

    },
    titleSection: {
        paddingLeft: 20,
        flexDirection: 'row-reverse'
    },
    title: {
        fontSize: 25,
        //color: '#FF8C37',
        fontWeight: 'bold',
        paddingBottom: 5

    },

    drawerSection: {
        //marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },

});