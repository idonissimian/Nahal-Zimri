import React, { useState } from "react"
import { RefreshControl, ScrollView, TouchableWithoutFeedback } from "react-native"
import { View } from "native-base"
import HeaderComp from "../explore/HeaderComp"
import InfoBox from './InfoBox'
import { createStackNavigator } from '@react-navigation/stack';
import InfoComp from "./InfoComp"
import { db } from '../../config/Firebase'
import CurrentUser from "../CurrentUser"
import { DrawerContent } from "../DrawerContent";
import { createDrawerNavigator } from '@react-navigation/drawer';


function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
let  dataType, currItem;

function InformationUserScreen({ navigation }) {

    const [loaded, setLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    let infoArray = [];
    let currentType = dataType;


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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);


    let convertDataToArray = (data, infoArray) => {
        console.log("in convert");
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
        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>
            <HeaderComp
                openUserProfile={() => navigation.navigate('Current')}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />

            <View style={{ width: "100%", height: "87%", marginTop: "2%" }}>



                <View style={{ height: "100%", width: "100%" }}>
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >

                        {infoArray.map((item) => {
                            return (
                                <View key={item.id} style={{ marginTop:'2%'}}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            currItem = item;
                                            navigation.navigate('infoAdminComp');
                                        }}
                                    >
                                        <View>
                                            <InfoBox imageUri={{ uri: item.ImageLink }}
                                                headline={item.Title}
                                                body={item.Body}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>

            </View>




        </View>
    )
}


const InfoCompStack = createStackNavigator();
const DrawerInfo = createDrawerNavigator();

function InfoUserComponent({ navigation }) {
    console.log("cureItem is : " + currItem.ImageLink);
    return (<InfoComp
        headline={currItem.Title}
        body={currItem.Body}
        onCrossPress={() => navigation.goBack()}
        imageUri={{ uri: currItem.ImageLink }}
    />);

}


function InformationPageStack() {


    return (
        <InfoCompStack.Navigator initialRouteName="infoAdminScreen">
            <InfoCompStack.Screen options={{ headerShown: false }} name="InfoAdminScreen" component={InformationUserScreen} />
            <InfoCompStack.Screen options={{ headerShown: false }} name="infoAdminComp" component={InfoUserComponent} />
        </InfoCompStack.Navigator>
    );
}

function InformationPage(props) {
    dataType = props.dataType;
    return (

        <DrawerInfo.Navigator initialRouteName="home" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContent {...props} />}>
            <DrawerInfo.Screen name="מסך הבית" component={InformationPageStack} />

        </DrawerInfo.Navigator>




    );
}

export default InformationPage;

const styles = {
    containerStyle: {
        width: "100%",
        height: "89%"


    }
}