import React from "react"
/*import { createStackNavigator } from 'react-navigation-stack';*/
import { Image, View, TouchableWithoutFeedback, TextInput, Text, Button, ScrollView, TouchableOpacity, Alert, unstable_enableLogBox } from "react-native"
import HeaderComp from './explore/HeaderComp'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReportsAdmin from './Reports/ReportsAdmin'
import EventAdmin from './Events/EventAdmin'
import InfoAdmin from './Articles/InfoAdmin'
import { createDrawerNavigator,
    DrawerItem } from '@react-navigation/drawer';
import InfoCatagoriesAdmin from './Information/InfoCatagoriesAdmin'
import PathCatagoriesAdmin from './Routes/PathCatagoriesAdmin';
import CurrentUser from "./CurrentUser"
import { DrawerContentAdmin } from "./DrawerContentAdmin";
import AboutAdmin from "./AboutAdmin"
const MyTheme = {
    dark: false,
    colors: {
      primary: '#FF8C37',
      background: '#FF8C37',
      card: '#FAE5D3',
      text: 'black',
      border: '#FF8C37',
    },
    
  };

const CustomDrawer = (props) => (
    <SafeAreaView style={{ flex: 1}}>
        <ScrollView>
            <DrawerItem {...props}/>
        </ScrollView>
    </SafeAreaView>
)

function HomeAdminScreen({ navigation }) {

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: '#FAE5D3' }}>
            <HeaderComp 
                        openUserProfile = {() => navigation.navigate('Current')}
                        openUserMenu = {() => navigation.dangerouslyGetParent().openDrawer()}
                        />
            <View>
               
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('InfAd')}>
                <View style={styles.infoStyle}>
                    <Image
                        source={require('../assets/img/article.jpg')}
                        style={{ width: "100%", height: "100%" }}
                    />
                    <View style={styles.textStyle}>
                        <Text style={{fontWeight: "bold",fontSize: 20}}>כתבות</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.routesStyle}>
                 <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('InfoCat')}>

                    <View style={styles.routesStyleLeft}>
                        <Image
                            source={require('../assets/img/flower.jpg')}
                            style={{ width: "100%", height: "100%" }}
                        />
                        <View style={styles.textStyle}>
                            <Text style={{fontWeight: "bold",fontSize: 20}}>מידע</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('RouAd')}>
                    <View style={styles.routesStyleRight}>
                        <Image
                            source={require('../assets/img/travel.jpg')}
                            style={{ width: "100%", height: "100%" }}
                        />
                        <View style={styles.textStyle}>
                            <Text style={{fontWeight: "bold",fontSize: 20}}>מסלולים</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('EventsAdmin')}>
                <View style={styles.infoStyle}>
                    <Image
                        source={require('../assets/img/fox.jpg')}
                        style={{ width: "100%", height: "100%" }}
                    />
                    <View style={styles.textStyle}>
                        <Text style={{fontWeight: "bold",fontSize: 20}}>אירועים</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Reports')}>
                <View style={styles.observationsStyle}>
                    <Image
                        source={require('../assets/img/obs.jpeg')}
                        style={{ width: "100%", height: "100%" }}
                    />
                    <View style={styles.textStyle}>
                        <Text style={{fontWeight: "bold",fontSize: 20}}>תצפיות</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

}

function ReportsAdminScreen() {
    return (
        <ReportsAdmin />
    );
}

function InfoAdminScreen() {
    return (
        <InfoAdmin />
    );
}

function AdminRoutesScreen() {
    return (
        <PathCatagoriesAdmin />
    );
}

function InfoCatagoriesScreen() {
    return (
        <InfoCatagoriesAdmin />
    );
}

function EventAdminScreen() {
    return (
        <EventAdmin />
    );
}

function CurrentUserScreen(){
    return(
        <CurrentUser/>
    );
}

function AboutScreen() {
    return (
        <About />
    );
}

const linking = {
    prefixes: ['https://mychat.com', 'mychat://'],
  };


const Stack = createStackNavigator();
const DrawerR = createDrawerNavigator();

function HomePageAdminStack() {
    return (
      
            <Stack.Navigator initialRouteName="HomeAdmin"  >

                <Stack.Screen options={{ headerShown: false }} name="HomeAdmin" component={HomeAdminScreen} />
                <Stack.Screen name="InfAd" options={{ headerShown: false }}
                    component={InfoAdminScreen} />
                <Stack.Screen options={{ headerShown: false }} name="RouAd" component={AdminRoutesScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Reports" component={ReportsAdminScreen} />
                <Stack.Screen options={{ headerShown: false }} name="EventsAdmin" component={EventAdminScreen} />
                <Stack.Screen name="AboutAdmin" options={{ headerShown: false }} component={AboutAdmin} />  
                    
                <Stack.Screen options={{ headerShown: false }} name="InfoCat" component={InfoCatagoriesScreen} />
                <Stack.Screen name="Current" options={{ headerShown: false }}
                    component={CurrentUserScreen} />  
            </Stack.Navigator>
    
    );
}

function HomePageAdmin(){
    return(
        <NavigationContainer theme={MyTheme}>
        <DrawerR.Navigator initialRouteName="home" drawerPosition="right"
         drawerStyle={{ width: '45%' }} drawerContent={props => <DrawerContentAdmin {...props} />}>         
        <DrawerR.Screen name="מסך הבית" component={HomePageAdminStack} />
 
      </DrawerR.Navigator>

   
      </NavigationContainer>

    );
}


export default HomePageAdmin;

const styles = {
    textStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FF8C37',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    dataStyle: {
        backgroundColor: "#FAE5D3"
    },
    infoStyle: {
        backgroundColor: "#F0B27A",
        borderColor: "#FF8C37",
        overflow: 'hidden',
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "90%",
        height: "26%",
        alignSelf: "center",
        marginTop: 10
    },
    routesStyle: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: "90%",
        height: "18%",
        alignSelf: "center",
        marginTop: 10
    },
    routesStyleLeft: {
        backgroundColor: "#FF8C37",
        borderColor: "#FF8C37",
        overflow: 'hidden',
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "49%",
        height: "100%",
        alignSelf: "center",
        marginRight: 10
    },
    routesStyleRight: {
        backgroundColor: "#FF8C37",
        borderColor: "#FF8C37",
        overflow: 'hidden',
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "48%",
        height: "100%",
        alignSelf: "center",
    },
    observationsStyle: {
        backgroundColor: "#FF8C37",
        borderColor: "#FF8C37",
        overflow: 'hidden',
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "90%",
        height: "10%",
        alignSelf: "center",
        marginTop: 10
    },
    drawerSection: {
        marginTop: 15,
      },
      drawerContent: {
        flex: 1,
      }
}
