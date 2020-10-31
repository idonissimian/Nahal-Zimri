import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ScrollView
} from "react-native";


class InfoBox extends Component {

    

    render() {
        return (
                <View style={styles.containerStyle}>
                    <View style={{ flex: 1,paddingRight: 3}}>
                        <Image source={this.props.imageUri}
                            style={styles.imageStyle}
                        />
                    </View>
                    <View style={{ flex: 1}}>
                        <View>
                            <Text
                                style={styles.headlineStyle}
                            >{this.props.headline}</Text>
                        </View>
                        <ScrollView>
                            <Text 
                            numberOfLines={6}
                            style={styles.bodyTextStyle}
                            >{this.props.body}</Text>
                        </ScrollView>

                    </View>

                </View>
        );
    }
}
export default InfoBox;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    containerStyle: {
        height: 150,
        width: 380,
        alignSelf: 'center',
        borderWidth: 1.1,
        borderColor: '#FFAF50',      // A3A3A3
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#F4D5A7',
        overflow: 'hidden'

    },
    headlineStyle: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: "gray",
        textShadowRadius: 12
    },

    bodyTextStyle: {
        
    },
    imageStyle: {
         flex: 1, 
         width: null, 
         height: null, 
         resizeMode: 'cover' ,
      //   borderBottomLeftRadius: 10,   // cause some scrolling problems
      //   borderTopLeftRadius: 10
    }
}