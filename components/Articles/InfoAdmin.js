import React, { Component, useState, useEffect } from "react"
import { Header, ListItem, CheckBox } from "react-native-elements"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
/*import { createStackNavigator } from 'react-navigation-stack';*/
import { View, TextInput, Text, RefreshControl, ScrollView, TouchableWithoutFeedback, Alert, TouchableOpacity } from "react-native"
import { Footer, Container, Right } from "native-base"
import HeaderComp from "../explore/HeaderComp";
/*import ReportBox from "./ReportBox"*/
import InfoUnitAdmin from "./InfoUnitAdmin"
import AdminNewOpenArt from "./AdminNewOpenArt";
import { db, storage } from '../../config/Firebase'
import uploadImage from '../../assets/functions/uploadSingleImage'
import sayCheese from '../../assets/functions/takePhoto'
import Icon from 'react-native-vector-icons/Entypo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentAdmin } from "../DrawerContentAdmin";


let keyID, currItem, dataType = "", photoUploaded = false, isCheckOn = false,isLoading=false;
let replace = false


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

function InfoAdminScreen({ navigation }) {

async function pressPhoto(source, key) {

    // setting the paths
    let imageID = "img" + key + ".jpg";
    let dataPath = 'Articles/art' + key;
    let storagePath = "Images/Articles/" + imageID;


    console.log("imageID is : " + imageID + "\n storagePath" + storagePath);
    let result;
    isLoading = true;
    if (source === "camera")
        result = await sayCheese(storagePath);
    else
        result = await uploadImage(storagePath);

    if (result === -1) {

        console.log("\n\n ----------------failed ----------------\n\n");
        return -1;

    }
    photoUploaded = true;
    if (replace === true) {
        console.log("replace in  \n\n " + 'Articles/art' + key + "/imageLink\n\n" + "Images/Articles/img" + key);
        storage.ref().child("Images/Articles/" + imageID).getDownloadURL().then((url) => {

            db.ref('Articles/art' + key + "/imageLink").set(url);
            setLoaded(false);
            console.log("uploaded new photo to the DB");
        }).catch((error) => console.log(error))
        replace = false;
        photoUploaded=false;
    }
    isLoading = false;
    
    console.log("Out : " + photoUploaded);


}

let deleteImageFromStorage = (deleteID) => {

    let imageID = "img" + deleteID + ".jpg";
    console.log("deleting :  " + imageID);
    var desertRef = storage.ref("Images").child('Articles/' + imageID);
    //Delete the file
    desertRef.delete().then(function () {
        console.log("deleted successfully")
        return 0;
    }).catch(function (error) {
        console.log("delete failed:  " + error);
        return -1;
    });
}


    const [detail, onChange] = useState('');
    const [detail1, onChange1] = useState('');
    const [detail2, onChange2] = useState('');
    const [detail3, onChange3] = useState('');
    const [checkBoxState1, setChangeBox1] = useState(false);
    const [checkBoxState2, setChangeBox2] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [loaded, setLoaded] = useState(false);


    // on mount
    useEffect(() => {
        keyID = newPostKey();
        console.log("Produced key:  " + keyID);

    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    // on unmount
    useEffect(() => {
        return () => {
            if (photoUploaded === true) {
                alert("photo should be deleted!");
                let imageID = "img" + keyID + ".jpg";
                var desertRef = storage.ref().child('Images/Articles/' + imageID);
                //Delete the file
                desertRef.delete().then(function () {
                    console.log("deleted successfully")
                }).catch(function (error) {
                    console.log("delete failed:  " + error.val);

                });
            }

        }
    }, []);
    let newPostKey = () => {
        return db.ref().child('Inforamtion').push().key;
    }
    let data = null;
    console.log("data loaded");
    function refreshPage() {
        onChange('');
        onChange1('');
        onChange2('');
        onChange3('');
        setLoaded({ loaded: false });
        keyID = newPostKey();
        photoUploaded = false;
    }

    db.ref('Articles').on('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            data = snapshot.val();
            console.log("data loaded");
        }
        if (loaded === false) {
            setLoaded(true);
        }
    });
    function removeItem(id) {
        db.ref('Articles/').child(id).remove()

    }
    function onSubmit(type, title, content, description) {
        if (photoUploaded === false) {
            if (isLoading === true)
                alert("Still uploading image")
            else
                alert("Upload image first");
            return -1;
        }


        if ((type != "כתבות" && type != "עדכונים")) {
            alert('סוג המידע יכול להיות כתבות או עדכונים')
            return -1
        }
        if (title == "" || content == "" || description == "") {
            alert('אנא מלא\י את כל שדות הטקסט')
            return -1
        }
        let infoId = 'art' + keyID;
        let imageID = "img" + keyID + ".jpg";
        let storagePath = "Images/Articles/" + imageID;
        let date = getDate()
        console.log("key is: "+keyID);
        storage.ref().child(storagePath).getDownloadURL().then((url) => {
            var newData = {
                Id: infoId,
                Title: title,
                Date: date,
                Description: content,
                SubTitle: description,
                Catagory: type,
                imageLink: url
            }
            console.log("before dbbdbdb");
            db.ref('Articles/'+ infoId).set(newData, function (error) {

                if (error) {
                    console.log('The write failed...')
                } else {
                    console.log('Data saved successfully!')
                }
            });
        })
        return 0;

    }


    let convertDataToArray = (data, infoArray) => {
        if (data === null)
            return null;

        if (!isCheckOn) {
            for (var info in data) {
                if (data.hasOwnProperty(info)) {
                    infoArray.push(data[info]);
                }
            }
        }
        else {

            for (var info in data) {
                if (data.hasOwnProperty(info)) {
                    if (data[info].Catagory == dataType)
                        infoArray.push(data[info]);
                }
            }
        }
    }
    let infoArray = [];
    convertDataToArray(data, infoArray);
    function filter(type) {

        if (type == dataType) {
            dataType = ""
            isCheckOn = false
        }
        else {
            dataType = type
            isCheckOn = true
        }
        if (type == 'כתבות') {
            setChangeBox1(!checkBoxState1)
            if (checkBoxState2)
                setChangeBox2(false)

        }
        if (type == 'עדכונים') {
            setChangeBox2(!checkBoxState2)
            if (checkBoxState1)
                setChangeBox1(false)

        }



    }
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>
            <HeaderComp
                openUserProfile={() => navigation.navigate('Current')}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />
            <View style={{ width: "98%", height: "89%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", height: "9%" }}>

                    <View style={styles.CheckBoxStyle}>
                        <CheckBox

                            center
                            title='כתבות'
                            checked={checkBoxState1}
                            onPress={() => filter('כתבות')}
                            containerStyle={styles.CheckBoxContainerStyle}

                        />
                    </View>

                    <View style={styles.CheckBoxStyle}>
                        <CheckBox

                            center
                            title='עדכונים'
                            checked={checkBoxState2}
                            onPress={() => filter('עדכונים')}
                            containerStyle={styles.CheckBoxContainerStyle}

                        />
                    </View>






                </View>

                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    scrollEventThrottle={16}>

                    <View style={{ width: "100%", flex: 1 }}>



                        <View style={{ height: "100%", flex: 1 }}>

                            <ScrollView
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}

                            >

                                {infoArray.map((item) => {

                                    return (



                                            <View key={item.id} style={styles.routeStyle}>
                                                <InfoUnitAdmin imageUri={{ uri: item.imageLink }}
                                                    title={item.Title}
                                                    date={item.Date}
                                                    catagory={item.Catagory}
                                                    detail={item.SubTitle}
                                                    idFromParent={item.Id}
                                                    body={item.Description}
                                                    onReplaceImagePress={() => {
                                                        replace = true;
                                                        deleteImageFromStorage(item.Id.slice(3));//??
                                                        pressPhoto('upload', item.Id.slice(3)); //???
                                                    }}
                                                    upLoadPhoto={() => pressPhoto("upload", keyID)}
                                                    removeItem={() => {
                                                        Alert.alert(
                                                            //title
                                                            'Hello',
                                                            //body
                                                            'האם למחוק את פריט המידע הזה?',
                                                            [
                                                                {
                                                                    text: 'כן', onPress: () => {
                                                                        console.log("id is : "+item.Id)
                                                                        db.ref('Articles/').child(item.Id).remove()
                                                                        deleteImageFromStorage(item.Id.slice(3));
                                                                        setLoaded({ loaded: false });
                                                                    }
                                                                },
                                                                { text: 'לא', onPress: () => console.log('No Pressed'), style: 'cancel' },
                                                            ],
                                                            { cancelable: false }
                                                            //clicking out side of alert will not cancel
                                                        );

                                                    }}
                                                    onExpandPress={() => {
                                                        currItem = item;
                                                        navigation.navigate('newOpAr');
                                                    }}

                                                />
                                            </View>

                                       
                                    )

                                })}



                            </ScrollView>

                        </View>


                    </View>


                    <View style={{ width: "95%", alignSelf: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center", alignItems: "center" }} >הוספת כתבה:</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textAddStyle}>סוג מידע: </Text>
                            <  TextInput
                                style={styles.textInput}
                                onChangeText={text => onChange(text)}
                                value={detail}

                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                            <Text style={styles.textAddStyle}>כותרת: </Text>
                            <  TextInput
                                style={styles.textInput}
                                onChangeText={text1 => onChange1(text1)}
                                value={detail1}
                            />
                        </View>


                        <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                            <Text style={styles.textAddStyle}>תיאור: </Text>
                            <  TextInput

                                style={styles.textInput}
                                onChangeText={text2 => onChange2(text2)}
                                value={detail2}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                            <Text style={styles.textAddStyle}>תוכן: </Text>
                            <  TextInput

                                style={styles.textInput}
                                onChangeText={text3 => onChange3(text3)}
                                value={detail3}
                            />
                        </View>



                        <View style={{ flexDirection: 'row', marginTop: '2.5%' }}>
                            <Text style={styles.textAddStyle}>הוספת תמונה:  </Text>
                            <TouchableWithoutFeedback
                                onPress={() => pressPhoto("upload",keyID)}

                            >
                                <Icon name="images" size={40} color="green" />

                            </TouchableWithoutFeedback>
                        </View>

                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            let result = onSubmit(detail, detail1, detail2, detail3, 'add', null)
                            if (result === 0)
                                refreshPage()
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
        </View>
    )
}

function AdminNewOpenArtScreen( { navigation }) {
    return (
        <AdminNewOpenArt
            title={currItem.Title}
            detail={currItem.SubTitle}
            content={currItem.Description}
            imageUri={{ uri: currItem.imageLink }}
            onCrossPress = { () => navigation.goBack()}

        />
    );
}

const logStack = createStackNavigator();
const DrawerRep = createDrawerNavigator();

function InfoAdminStack(props) { //for navigation. not in use yet
    return (
        <logStack.Navigator initialRouteName="infoA">
            <logStack.Screen options={{ headerShown: false }} name="infoA" component={InfoAdminScreen} />

            <logStack.Screen name="newOpAr" options={{ headerShown: false }} component={AdminNewOpenArtScreen} />

        </logStack.Navigator>
    );
}

function InfoAdmin() {
    return (
        <DrawerRep.Navigator initialRouteName="home" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContentAdmin {...props} />}>
            <DrawerRep.Screen name="artic" component={InfoAdminStack} />

        </DrawerRep.Navigator>

    );
}


export default InfoAdmin;

const styles = {
    textInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 15,
    },
    CheckBoxStyle: {
        flexDirection: 'row',
        backgroundColor: "#F4D5A7",
        borderWidth: 2,
        borderColor: "#FFAF50",
        width: "30%",
        flex: 1,
        marginTop: 10
    },
    routeStyle: {
        backgroundColor: "#F4D5A7",
        borderColor: "#FFAF50",
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 1.1,
        fontSize: 20,
        marginTop: "2%"
    },
    CheckBoxStyle: {
        width: "30%",
        flex: 1,
        marginTop: "0.4%"
    },
    CheckBoxContainerStyle: {
        borderColor: "#FFAF50",
        borderWidth: 1,
        backgroundColor: '#F4D5A7'
    },
    textAddStyle: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: '3%'
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
