import React, {  useState } from "react"
import { CheckBox } from "react-native-elements"
import { createStackNavigator } from '@react-navigation/stack';
import {  View, RefreshControl, ScrollView, TouchableWithoutFeedback} from "react-native"
import HeaderComp from "../explore/HeaderComp";
import NewOpenArt from "./NewOpenArt";
import UnitInfoUser from "./UnitInfoUser";
import { db } from '../../config/Firebase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from "../DrawerContent";

var currItem;
var currImg;
let isCheckOn = false, dataType;

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function InfoUserScreen({ navigation }) {

    let articlesArray = [];
    const [loaded, setLoaded] = useState(false);
    const [checkBoxState1, setChangeBox1] = useState(false);
    const [checkBoxState2, setChangeBox2] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //load data
    let data = null;
    db.ref('Articles').on('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            data = snapshot.val();
            console.log("data loaded: " + loaded);
            if (loaded === false)
                setLoaded(true);

        }
    });


    let convertDataToArray = (data, articlesArray) => {
        if (data === null)
            return null;
        for (var article in data) {
            if (data.hasOwnProperty(article)) {
                if ((!isCheckOn) || data[article].Catagory === dataType)
                    articlesArray.push(data[article]);
            }
        }

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    let handlePress = (type) => {
        if (type === dataType) {
            dataType = ""
            isCheckOn = false
        }
        else {
            dataType = type
            isCheckOn = true
        }
        if (type === 'כתבות') {
            setChangeBox1(!checkBoxState1)
            if (checkBoxState2) {
                setChangeBox2(false)

            }
        }
        if (type == 'עדכונים') {
            setChangeBox2(!checkBoxState2)
            if (checkBoxState1) {
                setChangeBox1(false)
            }
        }


    }

    convertDataToArray(data, articlesArray);

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>
            <HeaderComp
                openUserProfile={() => navigation.navigate('Current')}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />
            <View style={{ height: "89%", width: "100%" }}>
                <View style={{ height: "8.5%", width: "100%" }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.CheckBoxStyle}>
                            <CheckBox
                                center
                                title='כתבות'
                                containerStyle={styles.CheckBoxContainerStyle}
                                checked={checkBoxState1}
                                onPress={() => handlePress('כתבות')}
                            />
                        </View>
                        <View style={styles.CheckBoxStyle}>
                            <CheckBox
                                center
                                title='עדכונים'
                                containerStyle={styles.CheckBoxContainerStyle}
                                checked={checkBoxState2}
                                onPress={() => handlePress('עדכונים')}
                            />
                        </View>
                    </View>

                </View>

                <View style={{ height: "91.5%", width: "96%", alignSelf: 'center' }}>
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >
                        {
                            console.log("second"),
                            articlesArray.map((item) => {
                                return (
                                    <View key={item.id} style={{ marginTop: '2%' }}>
                                        <TouchableWithoutFeedback onPress={() => { navigation.navigate('newOpAr'); currItem = item; currImg = { uri: item.imageLink } }}>
                                            <View>
                                                <UnitInfoUser imageUri={{ uri: item.imageLink }}
                                                    catagory={item.Catagory}
                                                    title={item.Title}
                                                    subTitle={item.SubTitle}

                                                    date={item.Date}
                                                />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>

                </View>
            </View>
        </View>
    )
}


function NewOpenArtScreen( { navigation } ) {
    return (
        <NewOpenArt
            onCrossPress={() => navigation.goBack()}
            imageUri={{ uri: currItem.imageLink }}
            title={currItem.Title}
            subtitle={currItem.SubTitle}
            description={currItem.Description}
            item={currItem} img={currImg} />
    );
}

const logStack = createStackNavigator();
const DrawerArt = createDrawerNavigator();

function InfoUserStack() { //for navigation. not in use yet
    return (
        <logStack.Navigator initialRouteName="infoU">
            <logStack.Screen options={{ headerShown: false }} name="infoU" component={InfoUserScreen} />

            <logStack.Screen name="newOpAr" options={{ headerShown: false }}
                component={NewOpenArtScreen} />

        </logStack.Navigator>
    );
}

function InfoUser() {
    
    return (
        <DrawerArt.Navigator initialRouteName="reports" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContent {...props} />}>
            <DrawerArt.Screen name="reports" component={InfoUserStack} />

        </DrawerArt.Navigator>

    );
}

export default InfoUser;

const styles = {

    CheckBoxStyle: {
        width: "30%",
        flex: 1,
        marginTop: "0.4%",
        backgroundColor: "#FAE5D3",
    },
    CheckBoxContainerStyle: {
        borderColor: "#FFAF50",
        borderWidth: 1,
        backgroundColor: '#F4D5A7'
    }
}
