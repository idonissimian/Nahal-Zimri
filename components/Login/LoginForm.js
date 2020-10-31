import React, { Component } from "react" //import react library
import { Keyboard, Image, Text, TouchableOpacity, TextInput, Button, Alert } from "react-native"
import { View } from "native-base"
import firebase, { auth } from "../../config/Firebase"
import { DotIndicator } from "react-native-indicators";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import LoginHelper from "../../index"


class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            username: "",
            resetEmail: "",
            loading: false,
            show: true,
            resetPassword: false
        }
    }

    // ---------------- HIDE LOGO WHEN KEYBOARD IS ON ------------------
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

    

    ShowComponent = () => this.setState({ show: false });
    HideComponent = () => this.setState({ show: true });

    // ---------------- HIDE LOGO WHEN KEYBOARD IS ON ------------------

    //This function is being called when the user starts typing in 
    //the input field and updates the user registration form values.
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    onLoginSuccess() {
        if (auth.currentUser.emailVerified === false) {
            Alert.alert(
                "שים לב",
                "טרם אימתת את האימייל שלך",
                [{ text: "אישור" }],
                { cancelable: false }
            )
            auth.signOut();
            this.setState({
                loading: false
            })

        }
        else {

            // this.props.goToAutoLogin;
            Alert.alert(
                "החיבור הושלם",
                "התחברת בהצלחה",
                [{ text: "אישור" }],
                { cancelable: false }
            )
            this.setState({
                email: "",
                password: "",
                loading: false
            })
            
           
        }
    }

    renderResetEmail() {

        if (this.state.resetPassword) {
            // if(!auth.currentUser.emailVerified)

            return (
                <View style={{ alignSelf: 'center', alignItems: 'center', height: '6%' }}>
                    <View style={{ flexDirection: 'row', width: '75%' }}>
                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.TextInputStyle2}
                                textAlign="center"
                                placeholder={"הכנס מייל לאיפוס"}
                                placeholderTextColor="#FF8C37"
                                height={45}
                                autoCorrect={false}
                                onChangeText={email => this.setState({ resetEmail: email })}
                                value={this.state.resetEmail}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback
                                onPress={() => {

                                    auth.sendPasswordResetEmail(this.state.resetEmail).then(function () {
                                        alert("נשלח מייל לאיפוס סיסמה");

                                    }).catch(function (error) {
                                        alert("כתובת לא תקינה");

                                    });
                                    this.setState({ resetEmail: '' });
                                }}
                            >
                                <View style={{ width: "90%", height: '100%', backgroundColor: '#FF8C37', borderRadius: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>שלח מייל</Text>

                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>

                </View>
            )
        }

    }

    onLoginFail() {
        this.setState({ loading: false })
        Alert.alert(
            "שגיאה",
            "מייל או סיסמא אינם נכונים",
            [{ text: "אישור" }],
            { cancelable: false }
        )
    }


    renderButton() {
        if (this.state.loading) {
            return <DotIndicator color="FF8C37" />
        }

        return (
            <View style={styles.buttonStyle}>
                <Button
                    title="התחבר"
                    color="#FF8C37"
                    onPress={() => this.onButtonPress()}
                >
                </Button>
            </View>
        )
    }

    onButtonPress() {

        this.setState({ loading: true })

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                this.onLoginSuccess.bind(this)
            )
            .catch(
                this.onLoginFail.bind(this)
            )

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
                        placeholder={"מייל"}
                        placeholderTextColor="#FF8C37"
                        height={45}
                        autoCorrect={false}
                        onChangeText={(val) => this.updateInputVal(val, 'email')}
                        //onChangeText = { email => this.setState({ email })}
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
                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                        //onChangeText = { password => this.setState({ password })}
                        value={this.state.password}
                    />
                </View>




                <View style={{ alignSelf: 'center', height: "7%",marginTop:'5%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ resetPassword: !this.state.resetPassword })

                        }}
                    >
                        <Text style={{ fontSize: 16, color: "#404040" }}>שכחתם את הסיסמה? לחצו כאן..</Text>
                    </TouchableOpacity>
                </View>



                <View>{this.renderResetEmail()}</View>
                <View>{this.renderButton()}</View>
            </View>


        )

    }

}

export default LoginForm;

const styles = {
    inputView: {
        paddingTop: 20,
        paddingBottom: 20,
        height: "10%"
    },

    TextInputStyle: {
        borderColor: "#FF8C37",
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "80%",
        alignSelf: "center"
    },
    TextInputStyle2: {
        borderColor: "#FF8C37",
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "92%",
    },
    buttonStyle: {
        backgroundColor: "cyan",
        borderColor: "#FF8C37",
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "60%",
        alignSelf: "center",
        marginTop: 20,
        overflow: 'hidden'


    },

    background: {
        backgroundColor: '#FCDBC3',
        flex: 1
    },

    logo: {

        width: 180,
        height: 230

    },

    logoView: {
        paddingBottom: 40,
        height: '35%',
        alignItems: 'center'
    }

    /*
    loginBackgorund: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
    */




}