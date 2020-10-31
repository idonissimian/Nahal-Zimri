import React, { Component } from "react" //import react library
import { Keyboard, Image, TextInput, Button, Alert } from "react-native"
import { View } from "native-base"
import firebase, { auth } from "../../config/Firebase"
import { DotIndicator } from "react-native-indicators"

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //regular expression for mail validation

class RegForm extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      loading: false,
      show: true,
      verificationState: false,
      currentUserState: {}
    }
  }


  addUserToFire() {
    if (this.state.email === '' || this.state.password === '' || this.state.displayName === '')
      Alert.alert('יש למלא את כל הפרטים')

    else if (reg.test(this.state.email) === false)
      Alert.alert('כתובת המייל שהוזנה אינה תקינה')

    else if (this.state.password.length < 6)
      Alert.alert('על הסיסמא להיות באורך של לפחות 6 תווים')

    else {

      this.setState({ loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log("res is: " + res)

          var user = auth.currentUser;
          user.sendEmailVerification();

          firebase.database().ref('Users/' + firebase.auth().currentUser.uid).set({
            Uid: firebase.auth().currentUser.uid,
            email: this.state.email,
            Username: this.state.displayName,
            Admin: false
          }).then(() => {
            Alert.alert('נרשמת בהצלחה, נותר לאמת את האימייל שלך');

            console.log("test email is: " + auth.currentUser.emailVerified);
            auth.signOut();
          })

          this.setState({
            loading: false,
            displayName: '',
            email: '',
            password: '',
            verificationState: true,
            currentUserState: auth.currentUser
          })

        })
        .catch ( (error) => {
          var errorCode = error.code;
          console.log("The error is: "+ errorCode);
          if (errorCode == "auth/email-already-in-use")
              Alert.alert("האימייל שהזנת בשימוש, נא בחר אימייל אחר");
        })
    }
    this.setState({
      loading: false
    })

  }

  // onButtonPress() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user != null) {
  //       this.addUserToFire()
  //     }
  //   })

  //   const { email, password } = this.state
  //   this.setState({ loading: true })

 
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(
  //       this.onLoginSuccess.bind(this)
  //     )
  //     .catch(
  //       this.onLoginFail.bind(this)
  //     )
  // }


  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false
    })
    Alert.alert(
      "נרשמת בהצלחה",
      "הודעת אימות נשלחה לאימייל שלך",
      [{ text: "OK" }],
      { cancelable: false }
    )


  }

  onLoginFail() {

    Alert.alert(
      "Error",
      "Email or password are incorrect",
      [{ text: "OK" }],
      { cancelable: false }
    )
  }



  renderButton() {
    if (this.state.loading) {
      return <DotIndicator color="#FF8C37" />
    }

    return (

      <View style={styles.buttonStyle}>

        <View>
          <Button
            title="הרשמה"
            onPress={() => this.addUserToFire()}
            color="#FF8C37"
          >
          </Button>
        </View>
      </View>
    )
  }

  
  ShowComponent = () => this.setState({ show: false });
  HideComponent = () => this.setState({ show: true });

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.ShowComponent,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.HideComponent,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }



  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  render() {
    return (

      <View style={styles.background}>
        <View style={styles.logoView}>
          {this.state.show ? (
            <Image source={require('../../assets/img/logo.png')}

              style={styles.logo} />
          ) : null}
        </View>

        <View style={styles.inputView}>

          <TextInput
            style={styles.TextInputStyle}
            textAlign="center"
            placeholder={"שם מלא"}
            placeholderTextColor="#FF8C37"
            height={45}
            autoCorrect={false}
            onPress={this.ShowHideComponent}
            onChangeText={(val) => this.updateInputVal(val, 'displayName')}
            value={this.state.displayName}

          />
        </View>



        <View style={styles.inputView}>


          <TextInput
            style={styles.TextInputStyle}
            textAlign="center"
            placeholder={"כתובת מייל"}
            placeholderTextColor="#FF8C37"
            height={45}
            autoCorrect={false}
            onPress={this.ShowHideComponent}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
            value={this.state.email}

          />

        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInputStyle}
            textAlign="center"
            placeholder={"סיסמה"}
            placeholderTextColor="#FF8C37"
            secureTextEntry={true}
            height={45}
            autoCorrect={false}
            onPress={this.ShowHideComponent}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            value={this.state.password}

          />
        </View>

        {/* <View>{this.renderVerification()}</View> */}

        <View>{this.renderButton()}</View>



      </View>
    )

  }

}

export default RegForm;

const styles = {
  inputView: {
    paddingTop: 20,
    paddingBottom: 20,

  },

  TextInputStyle: {
    borderColor: "#FF8C37",
    borderRadius: 25,
    borderWidth: 2,
    fontSize: 20,
    width: "80%",
    alignSelf: "center",


  },
  buttonStyle: {
    backgroundColor: "#FF8C37",
    borderColor: "#FF8C37",
    borderRadius: 25,
    borderWidth: 2,
    fontSize: 20,
    width: "60%",
    alignSelf: "center",
    marginTop: 20,
    overflow: 'hidden',
  },

  background: {
    backgroundColor: '#FCDBC3',
    flex: 1
  },

  logo: {

    width: 180,
    height: 240

  },

  logoView: {
    alignItems: 'center'
  }




}