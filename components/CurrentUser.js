import React, { useState } from "react"
import { TextInput, Alert, Text, TouchableWithoutFeedback, Button } from "react-native"
import { View } from "native-base"
import HeaderComp from "./explore/HeaderComp"
import firebase from "../config/Firebase"
import { db, auth } from '../config/Firebase'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from "./DrawerContent";


function CurrentUserScreen({ navigation }) {
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log("start load with: " + uid);

    db.ref('Users/' + global.uid).once('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            let userData = snapshot.val();

            //alert(Username);

            if (loaded === false) {
                setLoaded(true);
                setName(userData.Username);
                setEmail(userData.email);
            }
        }
    });



    return (

        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>

            <HeaderComp
                openUserProfile={() => console.log("doing nothing")}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />


            <View>
                <Text style={styles.textTitleStyle}>{name}
                </Text>

                <Text style={styles.textDetailStyle}>{email}
                    {"\n"}
                    {"\n"}
                    {"\n"}
                    {"\n"}
                </Text>


            </View>


            <View style={{ alignSelf: 'center', alignItems: 'center', height: '6%' }}>
                <View style={{ flexDirection: 'row', width: '75%' }}>
                    <View style={{ flex: 3 }}>
                        <TextInput
                            style={styles.TextInputStyle}
                            textAlign="center"
                            placeholder={"סיסמה"}
                            placeholderTextColor="#FF8C37"
                            secureTextEntry={true}
                            height={45}
                            autoCorrect={false}
                            onChangeText={password => setPassword(password)}
                            value={password}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if (password < 6) {
                                    Alert.alert('על הסיסמא להיות באורך של לפחות 6 תווים')
                                }
                                else {
                                    auth.currentUser.updatePassword(password).then(() => {
                                        alert("סיסמה עודכנה");
                                    }).catch((error) => {
                                        console.log("Something went wrong: " + error);
                                    })
                                    setPassword('');
                                }


                            }}
                        >
                            <View style={{ width: "90%", height: '100%', backgroundColor: '#FF8C37', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>שנה סיסמה</Text>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>

            </View>

            <View style={styles.buttonStyle}>
                <Button
                    title="התנתק"
                    color="#FF8C37"
                    onPress={() => firebase.auth().signOut()}
                >
                </Button>
            </View>

        </View>
    );

}





// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

const DrawerUser = createDrawerNavigator();

function CurrentUser() {
    return (
        <DrawerUser.Navigator initialRouteName="About" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContent {...props} />}>
            <DrawerUser.Screen name="About" component={CurrentUserScreen} />

        </DrawerUser.Navigator>
    );
}

export default CurrentUser;

const styles = {

    buttonStyle: {
        backgroundColor: '#FF8C37',
        borderColor: "#FF8C37",
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "70%",
        alignSelf: "center",
        marginTop: "10%",
        overflow: 'hidden'
    },

    textStyle: {
        flexDirection: 'row-reverse'
    },
    textTitleStyle: {
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 40,
        marginTop: "10%",
        textDecorationLine: 'underline'


    },
    textDetailStyle: {
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 30,
    },
    TextInputStyle: {
        borderColor: "#FF8C37",
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "80%",
        alignSelf: "center"



    }
}


