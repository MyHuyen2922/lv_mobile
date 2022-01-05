import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component{
    static navigationOptions = {
        title: "WELCOME TO CHERRY",
        headerStyle: { 
            backgroundColor: 'f4511e'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e9967a',
        }
    }
    constructor(props){
        super(props);
        this.state={
            idshipper:'',
            hoten:'',
            avatar:'',
        }
    }
    onAsync = async () => {   
        try {     
            const idshipper = await AsyncStorage.getItem('idshipper');
            const hoten = await AsyncStorage.getItem('hoten');
            const avatar = await AsyncStorage.getItem('avatar');
            this.setState({
                idshipper:idshipper,
                hoten: hoten,
                avatar: avatar,
            })
        }    
        catch (error) {   
            console.log(error);
            alert(error);
        }
    }
    componentDidMount() {   
        this.onAsync();
        
    }
    Logout = async()=>{
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Login');
            this.setState({
                idshipper:'',
            })
           } catch (error) {
            console.log('AsyncStorage Error: ' + error)
           }
    }
    render(){
        return(
            <View> 
                <Text>{this.state.idshipper}</Text>
                <Text>{this.state.hoten}</Text>
                <Text>{this.state.avatar}</Text>
                <Image source={{uri: "http://10.0.2.2:80/" + this.state.avatar}}
                       style={{width: 50, height: 50, marginLeft:20}} />
                <TouchableOpacity onPress={this.Logout}>
                        <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Home;