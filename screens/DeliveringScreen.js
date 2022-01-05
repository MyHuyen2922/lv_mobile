import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, Button,StyleSheet,ScrollView, FlatList, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNativeNumberFormat } from "./ReactNativeNumberFormat";
import { TouchableOpacity } from "react-native-gesture-handler";


class DeliveringScreen extends Component{
    constructor(props){
        super(props);  
        this.state={
            idshipper:'',
            order: [],
            allItem: [],
        } 
    }
    componentDidMount(){
        this.getAllItem();
        this.onAsync();
        setTimeout(() => {
            this.onOrder();
        }, 1000);
    }
    onAsync = async () => {   
        try {     
            const idshipper = await AsyncStorage.getItem('idshipper');
            this.setState({
                idshipper: idshipper,
            })
        }    
        catch (error) {   
            console.log(error);
            alert(error);
        }
    }
    getAllItem = () =>{
        fetch('http://10.0.55.27:80/GetItemNative.php', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
            },
         
        })
            .then((response) => response.json()).then((response) =>{
               this.setState({
                   allItem: response,
               })
            })
            
            .catch((error) =>{
                alert(error);
            })
    }
    onOrder = () =>{
        let thamso = new FormData();
        thamso.append("trangthai", 2);
        thamso.append("condition", 5);
        thamso.append("idshipper", this.state.idshipper);
        fetch('http://10.0.55.27:80/OrderNative.php', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
            },
            body: thamso,
        })
            .then((response) => response.json()).then((response) =>{
                console.log(response);
                var arr = [];
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    var idmon = item.idmon.split("|");
                    idmon.splice(0, 1);
                    item.idmon = idmon;
                    var number = item.sl.split("|");
                    number.splice(0, 1);
                    item.sl = number;
                    var size = item.size.split("|");
                    size.splice(0, 1);
                    item.size = size;
                    var giadh = item.giadh.split("|");
                    giadh.splice(0, 1);
                    item.giadh = giadh;
                    arr.push(item);
                }
                this.setState({
                    order: arr
                })
              
            })
            
            .catch((error) =>{
                alert(error);
            })
    }
    Submit =(iddh, trangthai)=>{
        let thamso = new FormData();
        thamso.append("idshipper", this.state.idshipper);
        thamso.append("iddh", iddh);
        thamso.append("trangthai", trangthai);
        fetch('http://10.0.55.27:80/ActionOrder.php', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
            },
            body: thamso,
        })
            .then(async (response) => response.json()).then((response) =>{
                if(response.code === 200 ){
                   this.componentDidMount();
                   Alert.alert("Xác nhận đã giao cho khách hàng !");
                }
                else{
                    Alert.alert("Vui lòng thử lại sau !!!")
                }
               
            })
            .catch((error) =>{
                alert(error);
            })
    }
    render(){
        console.log(this.state.order);
        return(
            <SafeAreaView style={{backgroundColor: '#F2F5A9', height: '99%'}}>
                <TouchableOpacity onPress={this.onOrder}>
                    <Text style={styles.text}>Đơn hàng đang giao</Text>  
                </TouchableOpacity>
                <ScrollView>
                    {
                    this.state.order.length === 0 ? (
                        <View style={{alignItems: 'center'}}>
                           <Image source={require('../image/chipi.png')}
                                style={{
                                    width: 200, height: 200, marginBottom: 8
                                }}
                            />
                            <Text style={{fontSize:20}}>Không có đơn hàng</Text>
                        </View>
                    ) : (
                        this.state.order.map((data, index) =>{
                            return(
                                <View style={styles.container} key={index}>
                                    <View style={styles.rowtt}>
                                        <View style={[styles.boxtt, styles.box2tt]}>
                                            <Text style={{fontStyle: 'italic'}} >Người nhận: {data.hotennhan}</Text>
                                            <Text style={{fontStyle: 'italic'}} >Số điện thoai: {data.sdtnhan}</Text>
                                            <Text style={{fontStyle: 'italic'}} >Địa chỉ: {data.dcnhan}</Text>
                                            {
                                            data.ghichu === '' ?( null ):(
                                                <Text style={{fontStyle: 'italic'}}>Ghi chú: {data.ghichu}</Text>
                                            )
                                        }
                                        </View>
                                        <View style={{textAlign: 'right'}}>
                                            <Text style={{color: '#a52a2a', fontSize: 14}}>
                                                {data.pttt}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={[styles.boxtd, styles.box2td]}><Text>Tên món</Text></View>
                                        <View style={[styles.boxtd]}><Text>Giá</Text></View>
                                        <View style={[styles.boxtd, styles.box3td]}><Text>Size</Text></View>
                                        <View style={[styles.boxtd, styles.box4td]}><Text>Số lượng</Text></View>
                                    </View>
                                    {
                                        data.idmon.map((id, ind)=>{
                                            return(
                                                <View style={styles.row} key={ind}>
                                                    <View style={[styles.box, styles.box2]}>
                                                        <Text style={styles.textmon}>{this.state.allItem[id].tenmon}</Text>
                                                    </View>
                                                    <View style={[styles.box]}>
                                                        <Text style={styles.textmon}><ReactNativeNumberFormat value={data.giadh[ind]} /> VNĐ</Text>
                                                    </View>
                                                    <View style={[styles.box, styles.box3]}>
                                                        <Text style={styles.textmon}>{data.size[ind]}</Text>
                                                    </View>
                                                    <View style={[styles.box, styles.box4]}>
                                                        <Text style={styles.textmon}> {data.sl[ind]}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                        )
                                    }
                                    <View style={styles.rowtt}>
                                        <View style={[styles.boxtt, styles.box2tt]}><Text style={{fontSize:15, color: '#000000'}}>Tổng tiền</Text></View>
                                        <View style={{textAlign: 'right'}}>
                                            <Text style={{color: '#d2691e', fontSize: 15}}><ReactNativeNumberFormat value={data.tongtien} /> VNĐ
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.rowtt}>
                                        <View style={[styles.boxtt, styles.box2tt]}><Text style={{fontSize:15, color: '#000000'}}>Phí vận chuyển</Text></View>
                                        <View style={{textAlign: 'right'}}><Text style={{color: '#d2691e', fontSize: 15}}>
                                            <ReactNativeNumberFormat value={data.tienship} /> VNĐ</Text></View>
                                        </View>
                                    <View style={styles.rowtt}>
                                        <View style={[styles.boxtt, styles.box2tt]}><Text style={{fontSize:18, color: '#000000'}}>Tổng thanh toán</Text></View>
                                        <View style={{textAlign: 'right'}}>
                                            <Text style={{color: '#a52a2a', fontSize: 18}}>
                                                <ReactNativeNumberFormat value={Number(data.tongtien) + Number(data.tienship)} /> VNĐ
                                            </Text>
                                        </View>
                                    </View>
                                    <Button title="Đã giao" onPress={this.Submit.bind(this,data.iddh, data.trangthai)}/>
                                </View>
                            )
                         }     
                    )
                    )   
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default DeliveringScreen;

var styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        marginLeft: 105,
        marginBottom:10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color:'#d2691e',
    },
    container: { 
        margin: 10,
        backgroundColor: '#fdf5e6'
    },
    border: {
        borderColor: '#d2691e',
        backgroundColor: '#8a2be2',
    },
    textmon:{
        color:'#191970'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowtt: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxtt: {
        flex: 1,
        backgroundColor: '#fdf5e6',
        borderColor: '#808080',
        padding: 5,
      },
      box2tt: {
        backgroundColor: '#fdf5e6',
        borderColor: '#808080',
        padding: 5,
        
      },
      box: {
        flex: 1,
        height: 40,
        backgroundColor: '#fdf5e6',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5,
        overflow: 'scroll'
      },
      box2: {
        backgroundColor: '#fdf5e6',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5,
        overflow: 'scroll'
      },
      box3: {
        backgroundColor: '#fdf5e6',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5,
        overflow: 'scroll'
      }, 
      box4: {
        backgroundColor: '#fdf5e6',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5,
        overflow: 'scroll'
      },   
      boxtd: {
        flex: 1,
        height: 40,
        backgroundColor: '#d3d3d3',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5,
      },
      box2td: {
        backgroundColor: '#d3d3d3',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5,
      },
      box3td: {
        backgroundColor: '#d3d3d3',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5
      },   
      box4td: {
        backgroundColor: '#d3d3d3',
        borderColor: '#808080',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        padding: 5
      }, 
})