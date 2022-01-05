import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

class MyInf extends Component{
    constructor(){
        super();
        this.state ={
            old_pass: '',
            new_pass: '',
            confirm_pass:'',
            avatar:'',
            idshipper:''
        }
    };
    componentDidMount(){
        this.onAsync();
    }
    onAsync = async () => {   
        try {     
            const avatar = await AsyncStorage.getItem('avatar');
            const idshipper = await AsyncStorage.getItem('idshipper');
            this.setState({
                avatar: avatar,
                idshipper: idshipper,
            })
        }    
        catch (error) {   
            console.log(error);
            alert(error);
        }
    }
    onChangeOldPass =(old)=>{
        this.setState({
            old_pass:old,
        })
    }
    onChangeNewPass =(new_pass)=>{
        this.setState({
            new_pass: new_pass
        })
    }
    onChangeConfirmPass =(confirm)=>{
        this.setState({
            confirm_pass :confirm,
        })
    }
    onChangePass =() =>{
        let thamso = new FormData();
        thamso.append("oldpass", this.state.old_pass);
        thamso.append("newpass", this.state.new_pass);
        thamso.append("idshipper", this.state.idshipper);
        if(this.state.old_pass === ''){
            Alert.alert("Vui lòng nhập mật khẩu hiện tại !")
        }
        else if(this.state.new_pass === ''){
            Alert.alert("Vui lòng nhập mật khẩu mới !");
        }
        else{
            if(this.state.new_pass === this.state.confirm_pass){
                fetch('http://10.0.55.27:80/ChangePassNative.php', {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: thamso,
                 
                })
                    .then((response) => response.json()).then((response) =>{
                        if(response.code === 200 ){
                            //Alert.alert("Thay đổi mật khẩu thành công !");
                            Alert.alert(
                                'Thay đổi mật khẩu thành công !',
                                "Tiếp tục nhận đơn ?",
                                [
                                    {
                                        text: 'Ok',
                                        onPress: ()=>{
                                            this.props.navigation.navigate("Home");
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: ()=>{
                                            console.log("cancel");
                                        }
                                    },
                                ]
                            )
                            this.setState({
                                old_pass: '',
                                new_pass: '',
                                confirm_pass: '',
                            })
                        }
                        else if(response.code === 400 ){
                            Alert.alert("Mật khẩu hiện tại chưa đúng. Vui lòng thử lại !!!")
                        }
                        else{
                            Alert.alert("Lỗi Server")
                        }
                    })
                    
                    .catch((error) =>{
                        alert(error + "ssss");
                    })
            }
            else{
                alert("sai");
            }
        }
      
    }
    render(){
        return(
            <ImageBackground source={require('../image/br11.png')}  blurRadius={0} style={styles.bg}>
                    <Text style ={styles.header}>Thay đổi mật khẩu</Text>
                    <Image source={{uri:'http://10.0.2.2:80/'+ this.state.avatar}}
                            style={styles.img} />
                    <TextInput style={styles.input} placeholder="Nhập mật khẩu hiện tại"
                        name="old_pass"
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.onChangeOldPass}
                        value={this.state.old_pass}
                        autoCapitalize="none"
                        secureTextEntry = {true}
                    />
                    <TextInput style={styles.input} placeholder="Nhập mật khẩu mới"
                        name="new_pass"
                        underlineColorAndroid={'transparent'} 
                        autoCapitalize="none"
                        secureTextEntry = {true}
                        onChangeText={this.onChangeNewPass}
                        value={this.state.new_pass}
                    />
                    <TextInput style={styles.input} placeholder="Xác nhận mật khẩu mới"
                        name="confirm_pass"
                        underlineColorAndroid={'transparent'} 
                        autoCapitalize="none"
                        secureTextEntry = {true}
                        onChangeText={this.onChangeConfirmPass}
                        value={this.state.confirm_pass}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onChangePass}>
                        <Text style={styles.btntext}>Thay đổi</Text>
                    </TouchableOpacity>
            </ImageBackground>
        )
    }
}
export default MyInf;

var styles = StyleSheet.create({
    bg :{
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,

    },
    header:{
        marginTop:5,
        fontSize: 25,
        color: '#483d8b',
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
        marginTop: 10,
    },
    btntext:{
        fontSize: 15,
        fontWeight: 'bold',
        color:'#fff'
    },
    img: {
        width: 180, 
        height: 180,
        resizeMode: 'cover',
        borderRadius: 100,
        backgroundColor: '#ffebcd',
    }
})