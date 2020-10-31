import React, { useState, useEffect } from "react"
import { Header, CheckBox, ListItem } from "react-native-elements"
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Image, View, TextInput, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Button, Alert, RefreshControl, unstable_enableLogBox } from "react-native"
import { Footer, Container, Right } from "native-base"
import HeaderComp from "../explore/HeaderComp";
import UnitRoutes from "./UnitRoutes";
import AdminUnitRoutes from './AdminUnitRoutes'
import NewOpenRoute from "./NewOpenRoute";
import { db, storage } from '../../config/Firebase'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentAdmin } from "../DrawerContentAdmin";
import Icon from 'react-native-vector-icons/Entypo';
import NewOpenRouteAdmin from "./NewOpenRouteAdmin";

let currItem;
let currImg;
let dataType;

let photoUploaded = false, replace = false;
let isLoading = false;
let keyID;

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function AdminRoutesScreen({ navigation }) {

    async function pressPhoto(key) {

        // setting the paths
        let imageID = "img" + key + ".jpg";
        let storagePath = "Images/Routes/" + imageID;
        isLoading = true;
        let result = await uploadImage(storagePath);

       

        isLoading = false;

        if (result === -1) {
            return -1;

        }
        else {
            photoUploaded = true;
        }
        if (replace === true) {

            storage.ref().child("Images/Routes/" + imageID).getDownloadURL().then((url) => {

                db.ref('Routes/rou' + key + "/imageLink").set(url);
                setLoaded(false);

            }).catch((error) => console.log(error))
            replace = false;
            photoUploaded = false;
        }


    }
    function sendData(name, mark, level, type, details, animals, duration, km) {
        if (photoUploaded === false) {
            if (isLoading === true)
                alert("Still uploading image")
            else
                alert("Upload image first");
            return -1;
        }
        else {
            let rouId = 'rou' + keyID;
            let dataPath = 'Routes/rou' + keyID;
            let imageID = "img" + keyID + ".jpg";
            let storagePath = "Images/Routes/" + imageID;
            storage.ref().child(storagePath).getDownloadURL().then((url) => {
                let newRou = {
                    name: name,
                    PathType: dataType,
                    mark: mark,
                    level: level,
                    km: km,
                    duration: duration,
                    details: details,
                    id: rouId,
                    type: type,
                    imageLink: url,
                    animals: animals
                }
                db.ref(dataPath).set(newRou);
            }).catch((error) => console.log(error))
        }

        return 0;
    }


    let deleteImageFromStorage = (deleteID) => {

        let imageID = "img" + deleteID + ".jpg";
        var desertRef = storage.ref("Images").child('Routes/' + imageID);
        //Delete the file
        desertRef.delete().then(function () {
            return 0;
        }).catch(function (error) {
            console.log("delete failed:  " + error);
            return -1;
        });
    }


    const [name, onChangeName] = useState('');
    const [mark, onChangeMark] = useState('');
    const [level, onChangeLevel] = useState('');
    const [km, onChangeKm] = useState('');
    const [imageLink, onChangeImageLink] = useState('');
    const [duration, onChangeDuration] = useState('');
    const [details, onChangeDetails] = useState('');
    const [type, onChangeType] = useState('');
    const [animals, onChangeAnimals] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    let routesArray = [];
    let currentType = dataType;

    function refreshPage() {
        onChangeName("");
        onChangeMark("");
        onChangeLevel("");
        onChangeKm("");
        onChangeImageLink("");
        onChangeDuration("");
        onChangeDetails("");
        onChangeType("");
        onChangeAnimals("");
        setLoaded({ loaded: false });
        keyID = newPostKey();
        photoUploaded = false;
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    let data = null;
    db.ref('Routes').on('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            data = snapshot.val();
            console.log("data loaded: " + loaded);
            if (loaded === false)
                setLoaded(true);

        }
    });


    let newPostKey = () => {
        return db.ref().child('Routes').push().key;
    }



    // on mount
    useEffect(() => {
        keyID = newPostKey();
        console.log("Produced key:  " + keyID);

    }, []);
    // on unmount
    useEffect(() => {
        return () => {
            if (photoUploaded === true)
                deleteImageFromStorage(keyID);
        }
    }, []);

    let convertDataToArray = (data, routesArray) => {
        if (data === null)
            return null;
        for (var route in data) {
            if (data.hasOwnProperty(route)) {
                if (data[route].PathType === currentType) {
                    routesArray.push(data[route]);

                }
            }
        }

    }

    convertDataToArray(data, routesArray);

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>
            <HeaderComp
                openUserProfile={() => navigation.navigate('Current')}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {
                    routesArray.map((item) => {
                        return (
                            <View key={item.id} >
                                <TouchableWithoutFeedback onPress={() => { navigation.navigate('newOpRo'); currItem = item; currImg = { uri: item.imageLink } }}>
                                    <View>
                                        <AdminUnitRoutes imageUri={{ uri: item.imageLink }}
                                            name={item.name}
                                            level={item.level}
                                            km={item.km}
                                            duration={item.duration}
                                            type={item.type}
                                            details={item.details}
                                            onReplaceImagePress={() => {
                                                replace = true;
                                                deleteImageFromStorage(item.id.slice(3)); //??

                                                pressPhoto(item.id.slice(3)); //??
                                            }}
                                            onDelete={() => {
                                                Alert.alert(
                                                    //title
                                                    'Hello',
                                                    //body
                                                    'האם למחוק את פריט המידע הזה?',
                                                    [
                                                        {
                                                            text: 'כן', onPress: () => {
                                                                db.ref('Routes/').child(item.id).remove();
                                                                deleteImageFromStorage(item.id.slice(3)); //??
                                                                setLoaded({ loaded: false });
                                                            }
                                                        },
                                                        { text: 'לא', onPress: () => console.log('No Pressed'), style: 'cancel' },
                                                    ],
                                                    { cancelable: false }
                                                    //clicking out side of alert will not cancel
                                                );
                                            }
                                            }
                                            onExpandPress = {() => {
                                                currItem = item;
                                                navigation.navigate("newOpRo");
                                            }}
                                            id={item.id}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    })
                }


                <View style={{ width: "95%", alignSelf: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center", alignItems: "center" }} >הוספת מסלול:</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textAddStyle}>שם המסלול: </Text>
                        <  TextInput
                            style={styles.textInput}
                            onChangeText={text => onChangeName(text)}
                            value={name}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>רמת הקושי: </Text>
                        <  TextInput
                            style={styles.textInput}
                            onChangeText={text => onChangeLevel(text)}
                            value={level}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>ק"מ: </Text>
                        <  TextInput

                            style={styles.textInput}
                            onChangeText={text => onChangeKm(text)}
                            value={km}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>משך הזמן: </Text>
                        <  TextInput

                            style={styles.textInput}
                            onChangeText={text => onChangeDuration(text)}
                        value={duration}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>סוג המסלול: </Text>
                        <  TextInput

                            style={styles.textInput}
                            onChangeText={text => onChangeType(text)}
                        value={type}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>בע"ח במסלול: </Text>
                        <  TextInput

                            style={styles.textInput}
                            onChangeText={text => onChangeAnimals(text)}
                        value={animals}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>סימון: </Text>
                        <  TextInput

                            style={styles.textInput}
                            onChangeText={text => onChangeMark(text)}
                            value={mark}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>פרטים: </Text>
                        <  TextInput
                            
                            style={styles.textInput}
                            onChangeText={text => onChangeDetails(text)}
                            value={details}
                        />
                    </View>
                    
                    <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                        <Text style={styles.textAddStyle}>הוספת תמונה:  </Text>
                        <TouchableWithoutFeedback
                            onPress={() => pressPhoto(keyID)}
                        >
                            <Icon name="images" size={40} color="green" />

                        </TouchableWithoutFeedback>
                    </View>

                </View>

                <TouchableOpacity
                    onPress={() => {
                        let result = sendData(name, mark, level, type, details, animals, duration, km);
                        console.log("result is: " + result);
                        if (result === 0)
                            refreshPage();
                    }}
                >
                    <View style={styles.buttonStyle}>
                        <Text
                            style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}
                        >הוסף</Text>
                    </View>
                </TouchableOpacity>

                

            </ScrollView>
        </View>
    )
}


function NewOpenRouteScreen({navigation}) {
    return (
        <NewOpenRouteAdmin 
            imageUri={{ uri: currItem.imageLink }} 
            animals={currItem.animals} 
            details={currItem.details} 
            duration={currItem.duration} 
            id={currItem.id} 
            km={currItem.km} 
            level={currItem.level}
            mark={currItem.mark}  
            name={currItem.name} 
            type={currItem.type} 
            onCrossPress= { () => navigation.goBack()}
        
            />
    );
}

const logStack = createStackNavigator();
const DrawerRoute = createDrawerNavigator();

function AdminRoutesStack() { //for navigation. not in use yet


    return (

        <logStack.Navigator initialRouteName="routesA">
            <logStack.Screen options={{ headerShown: false }} name="routesA" component={AdminRoutesScreen} />

            <logStack.Screen name="newOpRo" options={{ headerShown: false }}
                component={NewOpenRouteScreen} />

        </logStack.Navigator>

    );
}

function AdminRoutes(props) {
    dataType = props.dataType;
    return (
        <DrawerRoute.Navigator initialRouteName="reports" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContentAdmin {...props} />}>
            <DrawerRoute.Screen name="reports" component={AdminRoutesStack} />

        </DrawerRoute.Navigator>

    );
}


export default AdminRoutes;

const styles = {

    /*textInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 15,
    },*/
    textInput: {
        backgroundColor: "#FFF4E3",
        borderColor: "green",
        width: "90%",
        borderRadius: 10,
        borderWidth: 2,
        fontSize: 20,
        alignSelf: "center",
        textAlignVertical: 'top',
        marginTop: 5
        /*height: 5,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white'*/
    },
    
    buttonStyle: {
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "green",
        width: "30%",
        height: "21%",
        alignSelf: "center",
        marginTop: "5%",
        marginBottom: "10%",
        borderRadius: 5,
        overflow: 'hidden'
    },
    CheckBoxStyle: {
        backgroundColor: "#F6D365",
        borderColor: "#FFAF50",
        borderWidth: 2,
        width: "30%",
        flex: 1,
        marginTop: 10
    },
    textAddStyle: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: '3%'
    },
    textInput: {
        backgroundColor: "#FFF4E3",
        borderColor: "green",
        paddingHorizontal: 2,
        paddingVertical: 2,
        flex: 2,
        borderRadius: 10,
        borderWidth: 2,
        fontSize: 20,
        alignSelf: "center",
        textAlignVertical: 'center',


    }
}
