import React, { useState } from "react"
import { RefreshControl, Alert, ScrollView, Text, TouchableOpacity } from "react-native"
import { View } from "native-base"
import { CheckBox } from "react-native-elements"
import EditReports from "./EditReports"
import { createStackNavigator } from '@react-navigation/stack';
import HeaderComp from "../explore/HeaderComp"
import ReportForm from "./ReportForm"
import { db,storage } from '../../config/Firebase'
import ReportsFullComp from './ReportsFullComp'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentAdmin } from "../DrawerContentAdmin";




let dataType, currItem, isCheckOn = false;

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export function ReportsAdminScreen({ navigation }) {
    let reportsArray = [], approvedText = "";
    const [loaded, setLoaded] = useState(false);
    const [checkBoxState1, setChangeBox1] = useState(false);
    const [checkBoxState2, setChangeBox2] = useState(false);
    const [checkBoxState3, setChangeBox3] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    let data = null;
    db.ref('Reports').on('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            data = snapshot.val();
            console.log("data loaded");
            if (loaded === false) {
                setLoaded(true);
            }
        }
    });

    let deleteImageFromStorage = (deleteID) => {
        
        let imageID = "img" + deleteID + ".jpg";
        console.log("deleting :  " + imageID);
        var desertRef = storage.ref("Images").child('Reports/' + imageID);
        //Delete the file
        desertRef.delete().then(function () {
            console.log("deleted successfully")
        }).catch(function (error) {
            console.log("delete failed:  " + error);
        });
    }


    let convertDataToArray = (data, reportsArray) => {

        if (data === null)
            return null;
        for (var report in data) {
            if (data.hasOwnProperty(report)) {
                if ((!isCheckOn) || data[report].Type === dataType)
                    reportsArray.push(data[report]);

            }
        }

    }

    let handlePress = (type) => {
        if (type === dataType) {
            dataType = ""
            isCheckOn = false
        }
        else {
            dataType = type
            isCheckOn = true
        }
        if (type === 'פריחה') {
            setChangeBox1(!checkBoxState1)
            if (checkBoxState2 || checkBoxState3) {
                setChangeBox2(false)
                setChangeBox3(false)
            }
        }
        if (type == 'בעלי חיים') {
            setChangeBox2(!checkBoxState2)
            if (checkBoxState1 || checkBoxState3) {
                setChangeBox3(false)
                setChangeBox1(false)
            }
        }
        if (type == 'אחר') {
            setChangeBox3(!checkBoxState3)
            if (checkBoxState2 || checkBoxState1) {
                setChangeBox2(false)
                setChangeBox1(false)
            }
        }

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    convertDataToArray(data, reportsArray);


    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>

            <HeaderComp
                openUserProfile={() => navigation.navigate('Current')}
                openUserMenu={() => navigation.dangerouslyGetParent().openDrawer()}
            />


            <View style={{ width: "100%", height: "89%" }}>
                <View style={{ flexDirection: 'row', width: "100%", height: "9%" }}>
                    <View style={styles.CheckBoxStyle}>
                        <CheckBox

                            center
                            title='פריחה'
                            checked={checkBoxState1}
                            onPress={() => handlePress('פריחה')}
                            containerStyle={styles.CheckBoxContainerStyle}

                        />
                    </View>
                    <View style={styles.CheckBoxStyle}>
                        <CheckBox
                            center
                            title='בע"ח'
                            checked={checkBoxState2}
                            onPress={() => handlePress('בעלי חיים')}
                            containerStyle={styles.CheckBoxContainerStyle}
                        />
                    </View>
                    <View style={styles.CheckBoxStyle}>
                        <CheckBox
                            center
                            title='אחר'
                            checked={checkBoxState3}
                            onPress={() => handlePress('אחר')}
                            containerStyle={styles.CheckBoxContainerStyle}
                        />
                    </View>

                </View>

                <View style={{ width: "98%", height: "77%" }}>
                    <ScrollView
                        scrollEventThrottle={16}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        <View style={{ width: "100%" }}>

                            <View style={{ height: "100%", flex: 1 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {reportsArray.map((item) => {


                                        if (item.Approved)
                                            approvedText = "מאושר"
                                        else
                                            approvedText = "לא מאושר"

                                        return (
                                            <View key={item.id}>
                                                <EditReports imageUri={{ uri: item.ImageLink }}
                                                    id={item.id}
                                                    body={item.Description}
                                                    date={item.Date}
                                                    type={item.Type}
                                                    catagory={item.Catagory}
                                                    approved={item.Approved}
                                                    approvedText={approvedText}
                                                    reporter={item.ReporterName}
                                                    onExpand={() => {
                                                        currItem = item;
                                                        navigation.navigate('repFullComp');
                                                    }}
                            
                                                    onDelete={() => {
                                                        Alert.alert(
                                                            //title
                                                            'שלום',
                                                            //body
                                                            'האם למחוק דיווח הזה?',
                                                            [
                                                                {
                                                                    text: 'כן', onPress: () => {
                                                                        db.ref('Reports/').child(item.id).remove();
                                                                        deleteImageFromStorage(item.id.slice(3));
                                                                        setLoaded({ loaded: false });
                                                                        // delete image not working yet
                                                                    }
                                                                },
                                                                { text: 'לא', onPress: () => console.log('No Pressed'), style: 'cancel' },
                                                            ],
                                                            { cancelable: false }
                                                            //clicking out side of alert will not cancel
                                                        );
                                                    }}
                                                />
                                            </View>
                                        )
                                    })}

                                </ScrollView>
                            </View>

                        </View>
                    </ScrollView>
                </View>



                <View style={{ width: "100%", height: "14%" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('repFo')}
                    >
                        <View style={styles.buttonStyle}>
                            <Text style={styles.textStyleHeaders}>שלח דיווח</Text>
                        </View>
                    </TouchableOpacity>

                </View>


            </View>

        </View>
    )
}

function goToReportForm() {
    return <ReportForm />

}
function ReportsFullCompFunc({ navigation }) {
    return (
        <ReportsFullComp
            headline={currItem.Catagory}
            body={currItem.Description}
            onCrossPress={() => navigation.goBack()}
            imageUri={{ uri: currItem.ImageLink }}
            date={currItem.Date}
            reporter={currItem.ReporterName}
        />
    );
}


const repAdminStack = createStackNavigator();
const DrawerRep = createDrawerNavigator();

function ReportsAdminStack() {
    return (

        <repAdminStack.Navigator initialRouteName="reportsAdmin">
            <repAdminStack.Screen options={{ headerShown: false }} name="reportsAdmin" component={ReportsAdminScreen} />
            <repAdminStack.Screen options={{ headerShown: false }} name="repFo" component={goToReportForm} />

            <repAdminStack.Screen name="repFullComp" options={{ headerShown: false }} component={ReportsFullCompFunc} />
        </repAdminStack.Navigator>

    );

}

function ReportsAdmin() {
    return (
        <DrawerRep.Navigator initialRouteName="reports" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContentAdmin {...props} />}>
            <DrawerRep.Screen name="reports" component={ReportsAdminStack} />

        </DrawerRep.Navigator>

    );
}



export default ReportsAdmin;

const styles = {

    textInputStyle: {
        backgroundColor: "#D7D8D7",
        borderColor: "#004577",
        borderRadius: 10,
        borderWidth: 2,
        fontSize: 20,
        width: "90%",
        alignSelf: "center",
        textAlignVertical: 'top',
        marginTop: 10
    },
    CheckBoxStyle: {
        width: "30%",
        flex: 1,
        marginTop: "0.4%"
    },
    textStyleHeaders: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: "6%"
    },

    buttonStyle: {
        width: "90%",
        height: "100%",
        borderColor: "black",
        borderWidth: 1,
        alignSelf: "center",
        backgroundColor: "#424242"


    },
    CheckBoxContainerStyle: {
        borderColor: "#FFAF50",
        borderWidth: 1,
        backgroundColor: '#F4D5A7'
    }


}
