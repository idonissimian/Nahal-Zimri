import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity

} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { db } from '../../config/Firebase'
import { Divider } from 'react-native-paper';
class InfoUnitAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            catagory: this.props.catagory,
            title: this.props.title,
            detail: this.props.detail,
            changed: false
        }

    }


    render() {

        return (

            <View style={styles.containerStyle}>
                <View style={{ flex: 1 }}>
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
                        <View style={{ height: '18%', width: "100%", flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <TextInput
                                    style={{ fontWeight: "bold", fontSize: 16, paddingVertical: 0 }}
                                    defaultValue={this.props.catagory}

                                    onChangeText={(catagory) => this.setState({ catagory, changed: true })}
                                    maxHeight={40} />
                            </View>
                            <View style={{ flex: 2, marginRight: '4%' }}>
                                <Text style={{
                                    fontWeight: "normal",
                                    fontSize: 14
                                }}>{this.props.date}</Text>
                            </View>

                        </View>
                        <Divider />
                        <View style={{ height: '18%' }}>
                            <TextInput style={{ fontWeight: "bold", fontSize: 18, paddingHorizontal: 1, paddingVertical: 0 }}

                                defaultValue={this.props.title}
                                multiline
                                onChangeText={(title) => this.setState({ title, changed: true })}
                                maxHeight={90}
                            />
                        </View>
                        <Divider />
                        <View style={{ height: '64%' }} >
                            <View style={{ height: "40%" }}>
                                <TextInput style={{ fontWeight: "normal", fontSize: 16, paddingVertical: 0 }}

                                    defaultValue={this.props.detail}
                                    numberOfLines={2}
                                    multiline
                                    onChangeText={(detail) => this.setState({ detail, changed: true })}
                                    maxHeight={70}
                                />
                            </View>
                            <Divider />
                            <View style={{ height: "60%" }}>
                                <TextInput style={{ fontWeight: "normal", fontSize: 16, paddingVertical: 0 }}

                                    defaultValue={this.props.body}
                                    multiline
                                    onChangeText={(detail) => this.setState({ detail, changed: true })}

                                />
                            </View>
                        </View>


                    </View>
                    <Divider />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.editButtons}>
                            <Button
                                title="ערוך"
                                color="green"
                                onPress={() => {

                                    if (this.state.changed) {



                                        let dataPath = 'Articles/' + this.props.idFromParent;
                                        let updates = {};
                                        updates[dataPath + "/Catagory"] = this.state.catagory;
                                        updates[dataPath + '/Title'] = this.state.title;
                                        updates[dataPath + '/Description'] = this.state.detail;
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
                                onPress={this.props.removeItem}

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
export default InfoUnitAdmin;



const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        height: 180,
        width: "100%",
        alignSelf: 'center',

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
    }
}