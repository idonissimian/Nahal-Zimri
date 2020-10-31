import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableHighlight
} from "react-native";
import { Divider } from 'react-native-paper';
import { db } from "../../config/Firebase"
class EditReports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bodyText: this.props.body,
            catagoryText: this.props.catagory,
            genre: this.props.type,
            changed: false,
            approvedState: this.props.approved,
            
        };

    }
    
    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }
    
    render() {
        return (

            <View style={{ height: 390, width: 175, marginLeft: 10, borderWidth: 0.8, borderColor: '#FFAF50', backgroundColor: '#F4D5A7' }}>
{console.log("rendered")}
                <View style={{ height: '40%' }}>
                    <TouchableWithoutFeedback onPress={this.props.onExpand}>

                        <Image source={this.props.imageUri}
                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        />

                    </TouchableWithoutFeedback>
                </View>

                <View style={{ height: '50%' }}>

                    <View style={{ height: "13%" }}>
                        <TextInput
                            defaultValue={this.props.catagory}
                            numberOfLines={1}
                            onChangeText={(catagoryText) => this.setState({ catagoryText: catagoryText, changed: true })}
                            style={{ fontSize: 18 ,paddingVertical: 0}}
                        />

                    </View>
                    <Divider />
                    <View style={{ height: "66%" }}>
                        <ScrollView>
                            <TextInput
                                style={{paddingVertical: 0}}
                                defaultValue={this.props.body}
                                multiline
                                onChangeText={(bodyText) => this.setState({ bodyText: bodyText, changed: true })}
                            />
                        </ScrollView>
                    </View>
                    <Divider />


                    <View style={{ height: "10%" }}>
                        <Text
                            numberOfLines={1}
                        >מדווח: {this.props.reporter}</Text>

                    </View>
                    <Divider />
                    <View style={{ height: "10%", flexDirection: 'row' }}>

                        <Text>תאריך :  {this.props.date}</Text>

                    </View>
                </View>

                <View style={{ width: "100%", height: "10%", paddingLeft: 3, paddingTop: 3, flexDirection: 'row' }}>
                    <View style={styles.editButtons}>
                        <Button
                            title="ערוך "
                            color="green"
                            onPress={() => {
                                if (this.state.changed) {
                                    let dataPath = 'Reports/' + this.props.id;
                                    let updates = {};
                                    updates[dataPath + "/Description"] = this.state.bodyText;
                                    updates[dataPath + '/Catagory'] = this.state.catagoryText;
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
                            title="מחק "
                            color="green"
                            onPress={this.props.onDelete}
                        />
                    </View>

                    <View style={styles.editApprove}>
                        
                        <TouchableHighlight
                            onPress={() => {
                                this.setState({ approvedState: (!this.state.approvedState) })
                                db.ref('Reports/'+this.props.id).child('Approved').set(!this.state.approvedState);
                                console.log('Reports/'+this.props.id+'/Approved');
                            }}
                            activeOpacity={1}
                            style={
                                this.state.approvedState
                                    ? styles.buttonPress
                                    : styles.button
                            }
                        
                        >
                            <Text
                                style={
                                    this.state.approvedState
                                        ? styles.welcomePress
                                        : styles.welcome
                                }
                            >
                                {this.state.approvedState ? "מאושר" : "לא מאושר"}
                                {console.log(this.state.approvedState)}
                            </Text>
                        </TouchableHighlight>

                    </View>
                </View>

            </View>

        );
    }
}
export default EditReports;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editApprove: {
         width:"33.3%",
         height:"98%",
         marginRight:"2%",
         
    },
    editButtons: {
        paddingRight: 1,
        flex: 1

    },
    button: {
        borderColor: "#000066",
        backgroundColor: "gray",
        borderWidth: 1,
        borderRadius: 2,
        height:"100%"
        
    },
    buttonPress: {
        
        backgroundColor: "green",
        borderRadius: 2,
        height:"100%"
        
    },
    welcome: {
        fontSize: 14,
        textAlign: "center",
        
        color: "#000066"
    },
    welcomePress: {
        fontSize: 15,
        textAlign: "center",
        marginTop:'10%',
        
        color: "#ffffff"
    }

});

