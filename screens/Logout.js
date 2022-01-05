import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


class Logout extends Component{
    componentDidMount = async()=>{
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Login');
           } catch (error) {
            console.log('AsyncStorage Error: ' + error)
           }
    }
    render(){
        return(
            <View>
               
            </View>
        )
    }
}
export default Logout;