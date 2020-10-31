import React, { Component } from "react"
import {
    TextInput,
    Alert,
    ScrollView,
    Text,
    TouchableWithoutFeedback, 
    Image
} from "react-native"
import { View } from "native-base"
import { CheckBox, Header } from "react-native-elements"

import Icon from 'react-native-vector-icons/Entypo';
import IconA from 'react-native-vector-icons/FontAwesome';
import { storage, db } from "../../config/Firebase"

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Divider } from 'react-native-paper';
import sayCheese from '../../assets/functions/takePhoto'
import uploadImage from "../../assets/functions/uploadSingleImage"
import LogoHeaderComponent from "../explore/LogoHeaderComponent"


let keyID, photoUploaded = false,username="";

function getDate() {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    let dateStr = date + "." + month + "." + year;
    return dateStr;
}

async function pressPhoto(source) {

    let imageID = "img" + keyID + ".jpg";
    let storagePath = "Images/Reports/" + imageID;


    console.log("imageID is : " + imageID + "\n storagePath" + storagePath);
    let result;
    if (source === "camera")
        result = await sayCheese(storagePath);
    else
        result = await uploadImage(storagePath);
    console.log(" test \n" + result);
    if (result === -1) {

        console.log("\n\n ----------------failed ----------------\n\n");
        return -1;

    }
    else
        photoUploaded = true;

    console.log("Out : " + photoUploaded);
}

function sendData(body, type, genre) {

    if (photoUploaded === false) {
        Alert.alert(
            "שים לב",
            "יש להעלות תמונה תחילה."
        );
        return -1;
    }
    else if (type === "") {
        Alert.alert(
            ",שים לב",
            "יש  לבחור סוג דיווח תחילה."
        );
        return -1;
    }

    else {

        let repId = 'rep' + keyID;
        let dataPath = 'Reports/rep' + keyID;
        let imageID = "img" + keyID + ".jpg";
        let storagePath = "Images/Reports/" + imageID;
        storage.ref().child(storagePath).getDownloadURL().then((url) => {
            // db.ref('Users/'+uid).once
            let date = getDate();
            let newInfo = {
                Approved: false,
                Date: date,
                Description: body,
                Catagory: genre,
                Type: type,
                ImageLink: url,
                id: repId,
                ReporterName: username
            }
            db.ref(dataPath).set(newInfo);
        })
    }
    console.log("after sendData");
    return 0;
}
const ITEMS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight","Nine"];




class ReportForm extends Component {

    constructor() {
        super()
        this.state = {
            checkItems: ITEMS.reduce(
                (items, item) => ({
                    ...items,
                    [item]: false
                }),
                {}
            ),
            body: "",
            reportType: "",
            type: "",
            genre: ""

        }
        
    }





    componentWillUnmount() {
        if (photoUploaded === true) {
            let imageID = "img" + keyID + ".jpg";
            var desertRef = storage.ref("Images").child('Reports/' + imageID);

            //Delete the file
            desertRef.delete().then(function () {
                console.log("deleted successfully: " + imageID + "  from Images/Reports");
            }).catch(function (error) {
                console.log("delete failed:  " + error);
            });
        }
    }

    handlePress = (checkNumber, value, genre) => {
        let checkItems = { ...this.state.checkItems }, val = value;
        Object.keys(this.state.checkItems).forEach(checkbox => {
            if (!Object.is(checkNumber, checkbox))
                checkItems[checkbox] = false;
            else {
                if (checkItems[checkbox] === false)
                    checkItems[checkbox] = true;
                else {
                    checkItems[checkbox] = false;
                    val = ""
                }
            }
        });
        this.setState({ checkItems, type: val, genre: genre })
    };



    componentDidMount() {
        keyID = db.ref().child('Reports').push().key;

        let data;
        db.ref('Users/'+uid).once('value', function (snapshot) {
            const exist = (snapshot.val() !== null);
            if (exist) {
                data = snapshot.val();
                username= data.Username;
               
            }
        });

        
        
    }



    render() {


        let refreshPage = () => {
            this.setState({ body: "", type: "", genre: "" });
            keyID = db.ref().child('Reports').push().key;
            photoUploaded = false;
            this.handlePress("None", "", "");
        }




        return (
            <View style={{ height: "100%", width: "100%", backgroundColor: '#FAE5D3' }}>
                <View style={{ width: "100%", height: "11%" }}>

                    <Header
                        backgroundColor='#FAE5D3'
                        centerComponent={<LogoHeaderComponent imageUri={require('../../assets/img/logo.png')} />}
                    />
                </View>
                <View style={{ backgroundColor: '#FAE5D3', height: "89%", width: "90%", alignSelf: 'center' }}>


                    <View style={{ width: "100%", height: "69%" }}>
                        <ScrollView>
                            <Collapse>
                                <CollapseHeader style={styles.typeStyle}>

                                    <View style={styles.innerViewStyle}>
                                        <Text style={styles.textStyleHeaders}>ציפורים</Text>
                                    </View>

                                </CollapseHeader>

                                <CollapseBody>




                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/bird.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['One']}
                                                    onPress={() => this.handlePress('One', 'בעלי חיים', 'דרור')}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>דרור</Text>
                                            </View>
                                        </View>
                                    </View>


                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/BigHankan.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Two']}
                                                    onPress={() => this.handlePress('Two', 'בעלי חיים', 'חנקן גדול')}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>חנקן גדול</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/summerSil.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Nine']}
                                                    onPress={() => this.handlePress('Nine', 'בעלי חיים', 'סלעית הקיץ')}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>סלעית הקיץ</Text>
                                            </View>
                                        </View>
                                    </View>




                                </CollapseBody>

                            </Collapse>

                            <Collapse>
                                <CollapseHeader style={styles.typeStyle}>
                                    <View style={styles.innerViewStyle}>
                                        <Text style={styles.textStyleHeaders}>יונקים</Text>
                                    </View>


                                </CollapseHeader>
                                <CollapseBody>

                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/fox.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Three']}
                                                    onPress={() => this.handlePress('Three', 'בעלי חיים', 'שועל מצוי')}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>שועל מצוי</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/deer.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Six']}
                                                    onPress={() => this.handlePress('Six', 'בעלי חיים', 'צבי')}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>שועל מצוי</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/Shafan.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Four']}
                                                    onPress={() => this.handlePress('Four', 'בעלי חיים', 'שפן סלע')}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>שפן סלע</Text>
                                            </View>
                                        </View>
                                    </View>


                                </CollapseBody>

                            </Collapse>

                            <Collapse>
                                <CollapseHeader style={styles.typeStyle}>

                                    <View style={styles.innerViewStyle}>
                                        <Text style={styles.textStyleHeaders}>מפגעים</Text>
                                    </View>


                                </CollapseHeader>
                                <CollapseBody>

                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/garbage.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Five']}
                                                    onPress={() => this.handlePress('Five', 'אחר', "פסולת")}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>פסולת</Text>
                                            </View>
                                        </View>
                                    </View>



                                </CollapseBody>

                                <CollapseHeader style={styles.typeStyle}>

                                    <View style={styles.innerViewStyle}>
                                        <Text style={styles.textStyleHeaders}>פריחה</Text>
                                    </View>


                                </CollapseHeader>
                                <CollapseBody>

                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/sahlav.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Seven']}
                                                    onPress={() => this.handlePress('Seven', 'פריחה', "סחלב")}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>סחלב</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.container}>
                                        <View style={{ flex: 1 }}>
                                            <Image source={require('../../assets/img/rakefet.jpg')}
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, paddingRight: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <CheckBox
                                                    checkedIcon={<IconA name="check" size={40} color="#48D347" />}
                                                    uncheckedIcon={<IconA name="plus" size={40} color="#505050" />}
                                                    checked={this.state.checkItems['Eight']}
                                                    onPress={() => this.handlePress('Eight', 'פריחה', "רקפת")}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>רקפת</Text>
                                            </View>
                                        </View>
                                    </View>



                                </CollapseBody>
                            </Collapse>


                        </ScrollView>
                    </View>
                    <Divider />
                    <View style={{ height: "17%", flexDirection: 'row' }}>

                        <View style={{ marginLeft: 12, marginTop: 20 }}>
                            <TouchableWithoutFeedback
                                // onPress={() => sayCheese('uploads/myPhoto1.jpg','Reports/rep3')}
                                onPress={() => pressPhoto("camera")}

                            >
                                <View><Icon name="camera" size={30} color="#505050" /></View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                // onPress={() => uploadImage('uploads/mydduse.jpg')}
                                onPress={() => pressPhoto("upload")}
                            >
                                <View style={{ marginTop: 20 }}><Icon name="images" size={30} color="#505050" /></View>
                            </TouchableWithoutFeedback>

                        </View>





                        <View style={{ width: "90%" }}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="הכנס פרטים"
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={text => this.setState({ body: text })}
                                value={this.state.body}
                            />
                        </View>


                    </View>
                    <View style={{ width: "100%", height: "14%" }}>
                        <TouchableWithoutFeedback onPress={() => {
                            let result = sendData(this.state.body, this.state.type, this.state.genre,this.state.data);
                            if (result === 0)
                                refreshPage();

                        }}>
                            <View style={styles.buttonStyle}>
                                <Text style={styles.textStyleSendReport}>שלח דיווח</Text>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>


                </View>
            </View>
        )
    }



}



export default ReportForm;

const styles = {
    typeStyle: {
        width: "100%",
        height: 80,
        borderWidth: 0.4,
        borderColor: 'black'
    },
    innerViewStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: "green"
    },
    textStyleHeaders: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: "5%"
    },
    textStyleSendReport: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: "8%"
    },

    checkBoxStyle: {

    },
    buttonStyle: {
        flex: 1,
        borderColor: "#004577",
        borderWidth: 1,
        fontSize: 20,
        width: "100%",
        alignSelf: "center",
        overflow: 'hidden',
        backgroundColor: "#424242"

    },
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
    container: {
        height: 110,
        width: "100%",
        borderWidth: 0.8,
        borderColor: '#dddddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {

        fontSize: 24,
        marginTop: 17

    }




}