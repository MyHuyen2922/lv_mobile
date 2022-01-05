import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);


import Login from "./screens/Login";
import Home from "./screens/Home";
import DeliveringScreen from "./screens/DeliveringScreen";
import ReceivedScreen from './screens/ReceivedScreen';
import OrderSreen from './screens/WaittingScreen';
import MyInf from "./screens/MyInf";
import Logout from "./screens/Logout";
import WaittingSceen from './screens/WaittingScreen';

const Stack = createStackNavigator();
const tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component {

  render(){
    createHomeTab = () =>
      <tab.Navigator screenOptions={{
        headerShown: false
      }}>
        <tab.Screen name="Chờ xác nhận" component ={OrderSreen}
          options ={{
            tabBarIcon:({focused}) =>(
              <View style={{alignItems: 'center', justifyContent:'center'}}>
                  <Image source={require('./image/pngtree-vector-icon-sale-png-image_6233640.jpg')}
                        resizeMode= 'contain'
                        style={{
                          width: 50, height: 45, marginBottom: 8
                        }}
                  />
              </View>
            )
          }}
        />
        <tab.Screen name="Đang giao" 
        component ={DeliveringScreen} 
        options ={{
          tabBarIcon:({focused}) =>(
            <View style={{alignItems: 'center', justifyContent:'center'}}>
                <Image source={require('./image/shipper-la-gi.jpg')}
                      resizeMode= 'contain'
                      style={{
                        width: 50, height: 45, marginBottom: 8
                      }}
                />
            </View>
          )
        }}
      />
        <tab.Screen name="Đã nhận" component ={ReceivedScreen} 
          options ={{
            tabBarIcon:({focused}) =>(
              <View style={{alignItems: 'center', justifyContent:'center'}}>
                  <Image source={require('./image/dagiao.png')}
                        resizeMode= 'contain'
                        style={{
                          width: 50, height: 45, marginBottom: 8
                        }}
                  />
              </View>
            )
          }}
        />
      </tab.Navigator>
    createDrawer = () =>
      <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#ffebcd',
          width: 240,
        },
      }}>
        <Drawer.Screen name="Trang chủ" component={createHomeTab} />
        <Drawer.Screen name="Thay đổi mật khẩu" component={MyInf} />
        <Drawer.Screen name="Đăng xuất" component={Logout}/>
      </Drawer.Navigator>
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false
          }}
          >
            <Stack.Screen 
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={createDrawer}
            />
              <Stack.Screen
              name="Waitting"
              component={WaittingSceen}
            />
          </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
