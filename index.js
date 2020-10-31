/**
 * @format
 */

import LoginForm from "./components/Login/LoginForm"



//Do not delete
import React, { Component } from "react"
import MainLogin from "./components/Login/MainLogin";
import HomePageAdmin from "./components/HomePageAdmin";
import HomePageUser from "./components/HomePageUser"
import { db, auth } from "./config/Firebase"
import { AppRegistry, View,Modal } from 'react-native';
import { name as appName } from './app.json';
import { DotIndicator } from "react-native-indicators";
// End of do not delete


console.disableYellowBox = true;
let check = false;
class loginHelper extends Component {
    state = { loggedIn: false, isAdmin: false, isDataLoaded: false, isVer:false }

     adminCheck(user) {
        return db.ref('Users/' + user.uid + '/Admin').once('value', function (snapshot) {
            const exist = (snapshot.val() !== null);
            if (exist) {
                data = snapshot.val();
                console.log("data loaded: " + data);
                return data;
            }
            else 
                return false;
        });

    }



    async componentDidMount() {
        check = true;
        console.log("componentDidMount")
        auth.onAuthStateChanged(async (user) => {
            if (user && auth.currentUser.emailVerified) { 
                console.log("auto log for user: "+user.email)
                global.uid = user.uid;
                let flag = await this.adminCheck(user)
                console.log("flag is : " + flag.val() + "isAdmin is: " + this.state.isAdmin);
                this.setState({ loggedIn: true, isAdmin: flag.val(), isDataLoaded: true })
                
            }
            else {
                console.log("go to login manu: " )
                this.setState({ loggedIn: false, isAdmin: false, isDataLoaded: true })
            }
            //this.forceUpdate();
        })
    }

    renderContent() {
        //firebase.auth().signOut();
        console.log("renderContent :"+this.state.isDataLoaded)
        if (this.state.isDataLoaded) {

            if (!this.state.loggedIn) {
                console.log("check is: " + check);
                return (<MainLogin />)
            }
            else if (this.state.isAdmin) {
                return <HomePageAdmin />
            }

            else if(auth.currentUser.emailVerified) return <HomePageUser />
        }
        return (
        <Modal animationType='fade'>
            <View style={{backgroundColor:'#FAE5D3',flex:1}}>
        <DotIndicator
            color='#4B4B4B'/>
            </View>
        </Modal> );
    }

    render() {
        return (
            this.renderContent()
        )
    }
}

AppRegistry.registerComponent(appName, () => loginHelper);

//HomePageUser
//HomePageAdmin
//loginHelper

