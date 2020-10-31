import React, { Component } from "react"
import {
    Image,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native"
import Icon from 'react-native-vector-icons/Entypo'
//import Carousel from 'react-native-snap-carousel'
import { Divider } from "react-native-elements"
import { db } from '../../config/Firebase'




class NewOpenRouteAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            kmText: this.props.km,
            levelText: this.props.level,
            durationText: this.props.duration,
            detailsText: this.props.details,
            animalsText: this.props.animals,
            typeText: this.props.type,
            markText: this.props.mark,
            nameText: this.props.name,

            changed: false,
        }
    }




    render() {
        return (

            <View style={{ width: "100%", height: "100%" }}>

                <View style={styles.imgStyle}>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Image source={this.props.imageUri}
                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        />

                    </View>

                </View>

                <View style={{ width: "100%", height: "60%", backgroundColor: "#FAE5D3" }}>
                    <View style={styles.textVStyle}>

                        <TextInput
                            style={styles.textStyle}
                            defaultValue={this.props.name}
                            multiline
                            onChangeText={(nameText) => this.setState({ nameText, changed: true })}
                        />
                    </View>
                    <View style={styles.mainStyle}>
                        <View style={{ height: '90%' }}>
                            <ScrollView>

                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>רמת קושי: </Text>
                                    <TextInput
                                        style={{ paddingVertical: 0, fontSize: 20, width: '82%' }}
                                        defaultValue={this.props.level}
                                        multiline
                                        onChangeText={(levelText) => this.setState({ levelText, changed: true })}
                                    />
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>ק"מ: </Text>
                                    <TextInput
                                        style={{ paddingVertical: 0, fontSize: 20, width: '82%', textAlign: 'right' }}
                                        defaultValue={this.props.km}
                                        multiline
                                        onChangeText={(kmText) => this.setState({ kmText, changed: true })}
                                    />
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>משך זמן ההליכה: </Text>
                                    <TextInput
                                        style={{ paddingVertical: 0, fontSize: 20, width: '82%' }}
                                        defaultValue={this.props.duration}
                                        multiline
                                        onChangeText={(durationText) => this.setState({ durationText, changed: true })}
                                    />
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>סוג המסלול: </Text>
                                    <TextInput
                                        style={{ paddingVertical: 0, fontSize: 20, width: '82%' }}
                                        defaultValue={this.props.type}
                                        multiline
                                        onChangeText={(typeText) => this.setState({ typeText, changed: true })}
                                    />
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>סימון: </Text>
                                    <TextInput
                                        style={{ paddingVertical: 0, fontSize: 20, width: '82%' }}
                                        defaultValue={this.props.mark}
                                        multiline
                                        onChangeText={(markText) => this.setState({ markText, changed: true })}
                                    />
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>בע"ח במסלול: </Text>
                                    <TextInput
                                        style={{ paddingVertical: 0, fontSize: 20, width: '82%' }}
                                        defaultValue={this.props.animals}
                                        multiline
                                        onChangeText={(animalsText) => this.setState({ animalsText, changed: true })}
                                    />
                                </View>
                                <Divider />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.textExplainStyle}>פרטים: </Text>
                                    <TextInput
                                        style={{ paddingVertical: 0, fontSize: 20, width: '82%' }}
                                        defaultValue={this.props.details}
                                        multiline
                                        onChangeText={(detailsText) => this.setState({ detailsText, changed: true })}
                                    />
                                </View>










                            </ScrollView>
                        </View>

                        <View style={{ height: '10%' }}>
                            <TouchableOpacity
                                onPress={() => {

                                    if (this.state.changed) {
                                        let dataPath = 'Routes/' + this.props.id;
                                        let updates = {};
                                        updates[dataPath + "/animals"] = this.state.animalsText;
                                        updates[dataPath + "/details"] = this.state.detailsText;
                                        updates[dataPath + "/duration"] = this.state.durationText;
                                        updates[dataPath + "/km"] = this.state.kmText;
                                        updates[dataPath + "/level"] = this.state.levelText;
                                        updates[dataPath + "/mark"] = this.state.markText;
                                        updates[dataPath + '/name'] = this.state.nameText;
                                        updates[dataPath + "/type"] = this.state.typeText;

                                        db.ref().update(updates);
                                        this.setState({ changed: false });
                                        console.log("Data updated successfully to : " + dataPath);
                                    }
                                }
                                }
                            >
                                <View style={{ height: '100%', width: "100%", backgroundColor: 'green', borderRadius: 5 }}>
                                    <Text
                                        style={{ textAlign: 'center', color: 'white', fontSize: 24 }}
                                    >ערוך</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: "100%", height: "15%", alignSelf: 'center' }}>

                        <TouchableOpacity
                            onPress={this.props.onCrossPress}
                        >
                            <Icon name="cross" size={50} color='gray'
                                style={{ alignSelf: 'center' }}
                            />

                        </TouchableOpacity>


                    </View>
                </View>
            </View>
        )
    }
}

export default NewOpenRouteAdmin;

const styles = {
    imgStyle: {
        width: "100%",
        height: "40%",
        // backgroundColor: '#FAE5D3',
        alignSelf: 'center',
        // backgroundColor: '#434343'
    },
    textStyle: {
        alignItems: 'center',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: "gray",
        textShadowRadius: 15,
        paddingVertical: 0
    },
    textVStyle: {
        alignItems: 'center',
        marginTop: "3%",
        width: "100%",
        height: "10%"
    },
    mainStyle: {
        width: "92%",
        height: "75%",
        alignSelf: 'center',
        backgroundColor: "#FBF5E5",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#CECECE"
    },
    mainTextStyle: {
        fontSize: 16,
        marginRight: "4%",
        marginLeft: "4%"
    },
    carouselStyle: {
        borderRadius: 5,
        backgroundColor: "white",
        height: "100%",
        width: "100%"

    },
    buttonStyle: {
        fontSize: 20
    },
    textViewStyle: {
        flexDirection: 'row',
        marginTop: "0.3%"
    },
    textExplainStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    }


}