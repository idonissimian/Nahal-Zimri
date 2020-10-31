import React, { useState } from "react"
import { RefreshControl, ScrollView, Text, TouchableOpacity } from "react-native"
import { View } from "native-base"
import { createStackNavigator } from '@react-navigation/stack';
import { CheckBox } from "react-native-elements"
import ReportBox from "./ReportBox"
import HeaderComp from "../explore/HeaderComp"
import { db } from '../../config/Firebase'
import ReportsFullComp from "./ReportsFullComp"
import ReportForm from "./ReportForm";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from "../DrawerContent";

let dataType, currItem, isCheckOn = false;

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function ReportsScreen({ navigation }) {
    let reportsArray = [];
    const [loaded, setLoaded] = useState(false);
    const [checkBoxState1, setChangeBox1] = useState(false);
    const [checkBoxState2, setChangeBox2] = useState(false);
    const [checkBoxState3, setChangeBox3] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    console.log("UID is :"+ uid);

    //load data
    let data = null;
    db.ref('Reports').on('value', function (snapshot) {
        const exist = (snapshot.val() !== null);
        if (exist) {
            data = snapshot.val();
            console.log("data loaded: " + loaded);
            if (loaded === false) {
                setLoaded(true);
            }


        }
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);


    let convertDataToArray = (data, reportsArray) => {
        if (data === null)
            return null;

        for (var report in data) {
            if (data.hasOwnProperty(report)) {
                if (data[report].Approved === true) {
                    if ((!isCheckOn) || data[report].Type === dataType)
                        reportsArray.push(data[report]);
                }
            }
        }



    }

    convertDataToArray(data, reportsArray);

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

                <View style={{ width: "98%", height: "55%" }}>
                    <ScrollView
                        scrollEventThrottle={16}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >
                        <View style={{ width: "100%", flex: 1 }}>

                            <View style={{ height: "100%", flex: 1 }}>

                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ flex: 1 }}
                                >
                                    {
                                        console.log("second"),
                                        reportsArray.map((item) => {
                                            return (
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            currItem = item;
                                                            navigation.navigate('repFullComp');
                                                        }}
                                                    >
                                                        <ReportBox imageUri={{ uri: item.ImageLink }}
                                                            name={item.Description}
                                                            date={item.Date}
                                                            catagory={item.Catagory}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }


                                </ScrollView>
                            </View>



                        </View>
                    </ScrollView>
                </View>

                <View style={{ width: "100%", height: "23%" }}>


                    {/* optional map */}




                </View>

                <View style={{ width: "100%", height: "13%" }}>
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



function ReportFormScreen() {
    return (
        <ReportForm />
    );
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


const logStack = createStackNavigator();
const DrawerRep = createDrawerNavigator();

function ReportsStack() {
    return (
        <logStack.Navigator initialRouteName="rep">
            <logStack.Screen options={{ headerShown: false }} name="rep" component={ReportsScreen} />

            <logStack.Screen name="repFo" options={{ headerShown: false }} component={ReportFormScreen} />

            <logStack.Screen name="repFullComp" options={{ headerShown: false }} component={ReportsFullCompFunc} />

        </logStack.Navigator>


    );
}

function Reports() {
    return (
        <DrawerRep.Navigator initialRouteName="reports" drawerPosition="right"
            drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContent {...props} />}>
            <DrawerRep.Screen name="reports" component={ReportsStack} />

        </DrawerRep.Navigator>

    );
}

export default Reports;

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
        marginTop: "0.4%",
        backgroundColor: "#FAE5D3"

    },
    textStyleHeaders: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: "8%"
    },

    buttonStyle: {
        width: "70%",
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
    },
    drawerContent: {
        flex: 1,
    }

}
