import React, { Component } from "react";
import {
    View,
    Text,
    Image
} from "react-native";

class LogoHeaderComponent extends Component {
    render() {
        return (
            <View style={{ height: "120%", width: "100%", flexDirection: 'row',marginBottom:"8%" }}>
                
                <View style={{ height: "70%", width: "60%"}}>
                    <Text 
                        style={styles.textStyle1}
                        >נחל זמרי</Text>
                    <Text style={styles.textStyle2}>הטבע ליד הבית</Text>
                </View>

                <View style={{ height: "100%", width: "30%", marginBottom: 17,marginLeft:10}}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>

            </View>

        );
    }
}
export default LogoHeaderComponent;

const styles = {
    textStyle1: {
        marginTop: 11,
        justifyContent: 'center', 
        alignItems: 'center', 
        color: 'black',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 20
    },
    textStyle2: {
        marginTop: 11,
        justifyContent: 'center', 
        alignItems: 'center', 
        color: 'black',
        textAlign: 'center',
        fontWeight: "normal",
        fontSize: 16,
        marginTop: 0
    },

}

