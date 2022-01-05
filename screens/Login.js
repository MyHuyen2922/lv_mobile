import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            pass: '',
            idshipper:'',
            hoten:'',
            avatar:'',
        }
        this.onLogin = this.onLogin.bind(this);
    }
    onAsync = async ()=>{
        try {
            await AsyncStorage.multiSet([
                [`idshipper`, this.state.idshipper],
                ['hoten', this.state.hoten],
                ['avatar', this.state.avatar]
            ])
        } 
        catch (error) {
            console.log(error);
        }
    }
    onLogin = async () =>{
        let thamso = new FormData();
        thamso.append("email", this.state.email);
        thamso.append("pass", this.state.pass);
        fetch('http://10.0.55.27:80/LoginNative.php', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
            },
            body: thamso,
        })
            .then(async (response) => response.json()).then((response) =>{
                console.log(response);
                if(response.code === 200 ){
                    this.setState({
                        idshipper: response.idshipper,
                        hoten: response.hoten,
                        avatar: response.avatar,
                        email:'',
                        pass:'',
                    })
                    this.onAsync();
                    this.props.navigation.navigate("Home");
                    //this.props.navigation.navigate('Shipper');
                }
                else{
                    Alert.alert("Email hoặc mật khẩu đăng nhập chưa đúng. Vui lòng thử lại !!!")
                } 
            })
            
            .catch((error) =>{
                console(error);
                alert(error + "abc");    
            })
    
    }
    onChangeEmail =(text)=>{
        this.setState({
            email: text
        })
    }
    onChangePass =(text)=>{
        this.setState({
            pass:text
        })
    }
    render(){ 
        return(
            <ImageBackground source={require('../image/br4.png')}  blurRadius={0} style={styles.bg}>
                    <Text style ={styles.header}>ĐĂNG NHẬP</Text>
                    <TextInput style={styles.input} placeholder="Email"
                    name="email"
                    underlineColorAndroid={'transparent'}
                    onChangeText={this.onChangeEmail}
                    value={this.state.email}
                    />
                    <TextInput style={styles.input} placeholder="Mật khẩu"
                    name="pass"
                    underlineColorAndroid={'transparent'} 
                    autoCapitalize="none"
                    secureTextEntry = {true}
                    onChangeText={this.onChangePass}
                    value={this.state.pass}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                        <Text style={styles.btntext}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
            </ImageBackground>
        )
    }
}
export default Login;
const styles = StyleSheet.create({
    bg :{
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,

    },
    header:{
        marginTop:5,
        fontSize: 25,
        color: '#483d8b',
        paddingBottom: 10,
        marginBottom: 40,
        fontWeight: 'bold',
    },
    input:{
        width: 330,
        height: 40,
        marginBottom: 30,
        borderBottomColor:'#199187',
        borderBottomWidth: 1,
    },
    button:{
        width:330,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1e90ff',
        marginTop: 30,
    },
    btntext:{
        fontSize: 15,
        fontWeight: 'bold',
        color:'#fff'
    }
})