import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, FlatList, TouchableOpacity, TextInput,ImageBackground, Button } from "react-native";
import axios from 'axios'
import store from "./Redux";
function Home({navigation}) {
const[user,setUser]=useState("")
const[password,setPassword]=useState("")
const[account,setAccount]=useState([])
console.log(store.getState());
const login=()=>{
  account.forEach((a)=>{
    if(a.username==user&&a.password==password){
      store.dispatch({type:"save",payload:a})
navigation.navigate("Home2",{})
    }
  })
}

const fetch=async()=>{
  try {
    const res=await axios.get("https://6540a53a45bedb25bfc23dad.mockapi.io/ontap")
    if(res.data){
setAccount(res.data)
    }
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  fetch()
},[])
  return (
   <View>
    <Text>Login</Text>
<TextInput
placeholder="Nhap user"
style={{height:50,borderWidth:1}}
value={user}
onChangeText={(text)=>setUser(text)}
/>
<TextInput
placeholder="Nhap password"
style={{height:50,borderWidth:1}}
value={password}
onChangeText={(text)=>setPassword(text)}
/>
<Button
title="ĐĂNG NHẬP"
onPress={login}
/>
   </View>
  );
}

export default Home;
