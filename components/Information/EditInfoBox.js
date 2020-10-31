import React, { Component } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
    TextInput
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { db } from '../../config/Firebase'



class EditInfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyText: this.props.body,
            headText: this.props.headline,
            changed: false
        };
    }


    render() {
        return (


            <View style={styles.containerStyle}>
                
                <View style={{ flex: 1 }}>
                {/* <TouchableOpacity
                        onPress={this.props.onExpandPress}
                    > */}
                        <View style={{ width: '100%', height: '100%' }}>
                        <Image source={this.props.imageUri}
                            style={styles.imageStyle}

                        />
                    </View>
                    {/* </TouchableOpacity> */}
                </View>
               
                <View style={{ flex: 1 }}>
                    <View >
                        <TextInput
                            selectTextOnFocus={true}
                            defaultValue={this.props.headline}
                            style={styles.headlineStyle}
                            onChangeText={(headText) => this.setState({ headText: headText, changed: true })}

                        />

                    </View>
                    <ScrollView>
                        <TextInput
                            selectTextOnFocus={true}
                            defaultValue={this.props.body}
                            multiline
                            onChangeText={(bodyText) => this.setState({ bodyText: bodyText, changed: true })}
                        />
                        {/* // this.props.onEditText */}
                    </ScrollView>



                    <View style={styles.buttonsContainer}>
                        <View style={styles.editButtons}>
                            <Button
                                title="ערוך "
                                color="green"
                                onPress={() => {
                                    if (this.state.changed) {
                                        let dataPath = 'Information/' + this.props.id;
                                        let updates = {};
                                        updates[dataPath + "/Body"] = this.state.bodyText;
                                        updates[dataPath + '/Title'] = this.state.headText;
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

                        <TouchableOpacity
                            onPress={this.props.onReplaceImagePress}
                        >
                            <View style={{ marginLeft: "12%" }}>
                                <Icon name="image" size={36} color="green" />
                            </View>
                        </TouchableOpacity>




                    </View>

                </View>
            </View>
        );
    }
}
export default EditInfoBox;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        height: 150,
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
        width: "40%",
        height: "20%",
        flexDirection: 'row',
        marginBottom: "5%",
        marginLeft: "5%"
    }
}