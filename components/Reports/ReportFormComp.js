import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
  
} from "react-native";
import {  CheckBox } from "react-native-elements"
import Icon from 'react-native-vector-icons/FontAwesome';
class ReportFormComp extends Component {
    state= {
        checked: false
    }

    handleChange = event => {
        this.props.onchange(event.target.value);
    };
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 ,backgroundColor: 'blue'}}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 2, paddingRight: 10 , flexDirection:'row'}}>
                    <View style = {{flex: 1}}>
                    <CheckBox
                        checkedIcon={<Icon name="check" size={40} color="#48D347" />}
                        uncheckedIcon={<Icon name="plus" size={40} color="#505050" />}
                        checked={this.state.checked}
                        // onPress={() => {
                        //     this.setState({checked: !this.state.checked});
                        //     console.log(this.props.nnn);
                        // }}
                        onPress={this.handleChange}
                    
                    />
                    </View>

                    <View style = {{flex: 1}}>
                        <Text style= {styles.textStyle}>קטגוריה:     {this.props.catagory}</Text>
                    </View>


                </View>
                
                
            </View>
        );
    }
}
export default ReportFormComp;

const styles = StyleSheet.create({
    container: {
        height: 110,
        width:"100%", 
        borderWidth: 0.8, 
        borderColor: '#dddddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {

        fontSize: 24 , 
        marginTop: 17
        
    }
});

