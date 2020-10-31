import React, { useState, useEffect } from "react"
import {
    RefreshControl,
    TextInput,
    Alert,
    ScrollView,
    Text,
    TouchableWithoutFeedback
} from "react-native"
import { View } from "native-base"
import Icon from 'react-native-vector-icons/Entypo';
import HeaderComp from "../explore/HeaderComp"
import EditInfoBox from './EditInfoBox'
import { createStackNavigator } from '@react-navigation/stack';
import InfoComp from "./InfoComp"
import { db, storage } from '../../config/Firebase'
import uploadImage from '../../assets/functions/uploadSingleImage'
import sayCheese from '../../assets/functions/takePhoto'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentAdmin } from "../DrawerContentAdmin";


function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function getDate() {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    let dateStr = date + "." + month + "." + year;
    return dateStr;
}

let photoUploaded = false, replace = false,isLoading = false;
let keyID, dataType, currItem;

function InformationAdminScreen({ navigation }) {

async function pressPhoto(source,key) {
    let result;
    // setting the paths
    let imageID = "img" + key + ".jpg";
    let storagePath = "Images/Information/" + imageID;


    console.log("imageID is : " + imageID + "\n storagePath" + storagePath);
    console.log("  loading:  ");
    isLoading = true;
    if (source === "camera")
        result = await sayCheese(storagePath);
    else
        result = await uploadImage(storagePath);
  
    if (result === -1) {

        console.log("\n\n ----------------failed ----------------\n\n");
        return -1;

    }
    else {
        photoUploaded = true;
        console.log("Out : " + photoUploaded);
    }

    if(replace === true) {
        console.log("replace in  \n\n "+ 'Information/info'+key+"/ImageLink\n\n"+"Images/Information/info" + key );
        storage.ref().child( "Images/Information/"+ imageID).getDownloadURL().then((url) => {
          
            db.ref('Information/info'+key+"/ImageLink").set(url);
            setLoaded(false);
            console.log("uploaded new photo to the DB");
        }).catch((error) => console.log(error))
        replace = false;
        photoUploaded = false;
    }

    isLoading = false;


}

function sendData(body, title, currentType) {
    console.log("dkdkdk:  "+ photoUploaded);
    if (photoUploaded === false) {
        if (isLoading === true)
            alert("Still uploading image")
        else
            alert("Upload image first");
        return -1;
    }

    else {
        console.log("key is : " + keyID);
        let infoId = 'info' + keyID;
        let dataPath = 'Information/info' + keyID;
        let imageID = "img" + keyID + ".jpg";
        let storagePath = "Images/Information/" + imageID;

        storage.ref().child(storagePath).getDownloadURL().then((url) => {

            let date = getDate();
            let newInfo = {
                Date: date,
                Body: body,
                Title: title,
                Type: currentType,
                ImageLink: url,
                id: infoId
            }
            db.ref(dataPath).set(newInfo);
        }).catch((error) => console.log(error))
    }

    return 0;


}

let deleteImageFromStorage = (deleteID) => {

    let imageID = "img" + deleteID + ".jpg";
    var desertRef = storage.ref("Images").child('Information/' + imageID);
    //Delete the file
    desertRef.delete().then(function () {
        console.log("deleted successfully")
        return 0;
    }).catch(function (error) {
        console.log("delete failed:  " + error);
        return -1;
    });
}


    const [body, onChangeBody] = useState('');
    const [title, onChangeTitle] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    let infoArray = [];
    let currentType = dataType ;

    // refreshing the page after successfully adding data
    function refreshPage() {
        onChangeBody("");
        onChangeTitle("");
        setLoaded({ loaded: false });
        keyID = newPostKey();
        photoUploaded = false;
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);


    let data = null;
    db.ref('Information').on('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            data = snapshot.val();
            console.log("data loaded");
            if (loaded === false) {
                setLoaded(true);
            }
        }
    });

    let newPostKey = () => {
        return db.ref().child('Inforamtion').push().key;
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

    let convertDataToArray = (data, infoArray) => {
        if (data === null)
            return null;

        for (var info in data) {
            if (data.hasOwnProperty(info)) {
                if (data[info].Type === currentType) {
                    infoArray.push(data[info]);

                }


            }
        }
    }



    convertDataToArray(data, infoArray);



    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: '#FAE5D3' }}>

            <HeaderComp
                openUserProfile={() => navigation.navigate('Current')}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />

            <View style={styles.containerStyle}>

                <View style={{ height: "71%", width: "100%" }}>
                    <ScrollView
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >

                        {infoArray.map((item) => {
                            return (
                                <View key={item.id} style={{ marginTop: "2%" }}>

                                    <View>
                                        <EditInfoBox imageUri={{ uri: item.ImageLink }}
                                            headline={item.Title}
                                            body={item.Body}
                                            onReplaceImagePress={() => {
                                                replace=true;
                                                deleteImageFromStorage(item.id.slice(4));
                                                
                                                pressPhoto("upload", item.id.slice(4));
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
                                                                db.ref('Information/').child(item.id).remove();
                                                                deleteImageFromStorage(item.id.slice(4));
                                                                setLoaded({ loaded: false });
                                                            }
                                                        },
                                                        { text: 'לא', onPress: () => console.log('No Pressed'), style: 'cancel' },
                                                    ],
                                                    { cancelable: false }
                                                    //clicking out side of alert will not cancel
                                                );
                                            }}
                                            id={item.id}
                                            onExpandPress={() => {
                                                currItem = item;
                                                navigation.navigate('infoAdminComp');
                                            }}
                                        />
                                    </View>

                                </View>
                            )
                        })}




                    </ScrollView>
                </View>

                <View style={styles.editBoxStyle}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginLeft: 12, marginTop: 20 }}>
                            <TouchableWithoutFeedback
                                onPress={() => { console.log("before func: " + keyID); pressPhoto("camera",keyID); }}
                            >
                                <View style={{ marginLeft: 12 }}>
                                    <Icon name="camera" size={30} color="white" />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => pressPhoto("upload",keyID)}
                            >
                                <View style={{ marginTop: 20, marginLeft: 12 }}>
                                    <Icon name="images" size={30} color="white" />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    let result = sendData(body, title, currentType);
                                    console.log("result is: " + result);
                                    if (result === 0)
                                        refreshPage();
                                }}
                            >
                                <View style={styles.buttonStyle}>
                                    <Text
                                        style={{ alignSelf: 'center', marginTop: 20, fontSize: 18 }}
                                    >הוסף</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={{ flex: 5 }}>
                        <TextInput
                            style={styles.headlineInputStyle}
                            placeholder="הכנס כותרת"
                            value={title}
                            onChangeText={text => onChangeTitle(text)}
                        />

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="הכנס תוכן"
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={text => onChangeBody(text)}
                            value={body}
                        />


                    </View>

                </View>

            </View>




        </View>
    )
}






const InfoCompStack = createStackNavigator();
const DrawerInfo = createDrawerNavigator();


function InfoAdminComponent({ navigation }) {

    return (<InfoComp
        headline={currItem.Title}
        body={currItem.Body}
        onCrossPress={() => navigation.goBack()}
        imageUri={{ uri: currItem.ImageLink }}
    />);
}


function InformationAdminPageStack() {




    return (
        <InfoCompStack.Navigator initialRouteName="infoAdminScreen">
            <InfoCompStack.Screen options={{ headerShown: false }} name="InfoAdminScreen" component={InformationAdminScreen} />
            <InfoCompStack.Screen options={{ headerShown: false }} name="infoAdminComp" component={InfoAdminComponent} />
        </InfoCompStack.Navigator>
    );
}

function InformationAdminPage(props) {
    dataType = props.dataType;
    return (
        <DrawerInfo.Navigator initialRouteName="reports" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContentAdmin {...props} />}>
            <DrawerInfo.Screen name="reports" component={InformationAdminPageStack} />

        </DrawerInfo.Navigator>

    );
}


export default InformationAdminPage;

const styles = {
    containerStyle: {
        width: "96%",
        height: "89%",
        alignSelf:'center'

    },
    editBoxStyle: {
        width: "100%",
        height: "29%",
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#545454',
        borderRadius: 7,
        backgroundColor: '#4C4C4B'
    },
    textInputStyle: {
        backgroundColor: "#FFF4E3",
        borderColor: "#004577",
        width: "90%",
        borderRadius: 10,
        borderWidth: 2,
        fontSize: 20,
        alignSelf: "center",
        textAlignVertical: 'top',
        marginTop: "2%"
    },
    headlineInputStyle: {
        backgroundColor: "#FFF4E3",
        borderColor: "#004577",
        borderRadius: 10,
        borderWidth: 2,
        fontSize: 20,
        width: "90%",
        alignSelf: "center",
        textAlignVertical: 'top',
        marginTop: 10

    },
    buttonStyle: {
        width: "100%",
        height: "45%",
        backgroundColor: '#FFF4E3',
        borderRadius: 20,
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'black'

    }
}
