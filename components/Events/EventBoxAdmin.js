
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";
import { db } from '../../config/Firebase';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

class EventBoxAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateText: this.props.date,
            nameText: this.props.name,
            weekdayText: this.props.weekday,
            hourText: this.props.hour,
            locationText: this.props.location,
            detailsText: this.props.details,
            nameText: this.props.name,

            changed: false
        };
    }

    render() {
        return (

            <View style={styles.containerStyle}>
                <View style={{ flex: 1 }}>{console.log("nameee is :" + this.state.name )}
                    <TouchableOpacity
                        onPress={this.props.onExpandPress}
                    >
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image source={this.props.imageUri}
                                style={styles.imageStyle}

                            />
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 2 }}>

                    <View style={{ width: '100%', height: '79%' }}>

                        <View style={{ height: '16%',flexDirection:'row' }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>שם האירוע: </Text>
                            <TextInput
                            defaultValue={this.props.name}
                                style={styles.textInputRowStyle}
                                onChangeText={(name) => this.setState({ nameText: name, changed: true })}
                                selectTextOnFocus={true}
                                maxHeight={40} />
                        </View>


                        <Divider />
                        <View style={{ height: '16%', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>תאריך: </Text>
                            <TextInput style={styles.textInputRowStyle}

                                defaultValue={this.props.date}
                                onChangeText={(date) => this.setState({ dateText: date, changed: true })}
                                selectTextOnFocus={true}
                                maxHeight={90}
                            />
                        </View>

                        <Divider />
                        <View style={{ height: '16%', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>יום: </Text>
                            <TextInput style={styles.textInputRowStyle}

                                defaultValue={this.props.weekday}
                                onChangeText={(weekdayText) => this.setState({ weekdayText, changed: true })}
                                selectTextOnFocus={true}
                                maxHeight={90}
                            />
                        </View>
                        <Divider />
                        <View style={{ height: '16%', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>שעה: </Text>
                            <TextInput style={styles.textInputRowStyle}

                                defaultValue={this.props.hour}
                                onChangeText={(hourText) => this.setState({ hourText, changed: true })}
                                selectTextOnFocus={true}
                                maxHeight={90}
                            />
                        </View>
                        <Divider />

                        <View style={{ height: '16%', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>מיקום: </Text>
                            <TextInput style={styles.textInputRowStyle}

                                defaultValue={this.props.location}
                                onChangeText={(locationText) => this.setState({ locationText, changed: true })}
                                selectTextOnFocus={true}
                                maxHeight={90}
                            />
                        </View>
                        <Divider />

                        <View style={{ height: '16%', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>פרטים: </Text>
                            <TextInput style={styles.textInputRowStyle}

                                defaultValue={this.props.details}
                                onChangeText={(detailsText) => this.setState({ detailsText, changed: true })}
                                selectTextOnFocus={true}
                                maxHeight={90}
                            />

                        </View>


                    </View>
                    <Divider />

                    <View style={styles.buttonsContainer}>
                        <View style={styles.editButtons}>
                            <Button
                                title="ערוך"
                                color="green"
                                onPress={() => {
                                    console.log("date isss : " + this.state.dateText);
                                    if (this.state.changed) {

                                        let dataPath = 'Events/' + this.props.id;
                                        let updates = {};
                                        updates[dataPath + "/date"] = this.state.dateText;
                                        updates[dataPath + '/details'] = this.state.detailsText;
                                        updates[dataPath + '/hour'] = this.state.hourText;
                                        updates[dataPath + '/location'] = this.state.locationText;
                                        updates[dataPath + '/name'] = this.state.nameText;
                                        updates[dataPath + '/weekday'] = this.state.weekdayText;
                                        db.ref().update(updates);
                                        this.setState({ changed: false });
                                        console.log("Data updated successfully to : " + dataPath);
                                    }
                                }
                                }
                            />
                        </View>

                        <View style={styles.editButtons}>
                            <Button
                                title="מחק"
                                color="green"
                                onPress={this.props.onDelete}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={this.props.onReplaceImagePress}
                        >
                            <View style={{ marginLeft: "3%" }}>
                                <Icon name="image" size={36} color="green" />
                            </View>
                        </TouchableOpacity>





                    </View>

                </View>
            </View>



        );
    }
}
export default EventBoxAdmin;



const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        height: 200,
        width: "100%",
        alignSelf: 'center',
        borderWidth: 1.1,
        borderColor: 'orange',
        borderRadius: 10,
        flexDirection: 'row-reverse',
        backgroundColor: '#F4D5A7',
        overflow: 'hidden'

    },
    headlineStyle: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: "gray",
        textShadowRadius: 10
    },


    imageStyle: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        //   borderBottomLeftRadius: 10,   // cause some scrolling problems
        //   borderTopLeftRadius: 10
    },
    editButtons: {
        marginLeft: "2%"
    },
    buttonsContainer: {
        width: "100%",
        height: "21%",
        flexDirection: 'row',
    },
    textInputRowStyle: {
        fontWeight: "bold", 
        fontSize: 17, 
        paddingHorizontal: 1, 
        paddingVertical: 0,
        flex:1,
        textAlign:'right'
    }
}