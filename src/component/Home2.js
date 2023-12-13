import { View, Text, Image, Button, Pressable, TextInput, FlatList, ScrollView } from 'react-native';
import store  from './Redux';
import { useState } from 'react';
export default function Home2({navigation}) {
const[vietnamese,setVietnamese]=useState(store.getState().vietnamese)
const[english,setEnglist]=useState(store.getState().english)
const[textVN,setTextVN]=useState("")
const[textEL,setTextEL]=useState("")
const[valueAdd,setValueAdd]=useState("")
const[ID,setID]=useState(store.getState().id)
const[eId,setEid]=useState("")
const[vnId,setvnId]=useState("")
console.log(store.getState());

  return (
    <View style={{flex:1}}>
    <Text>{ID}</Text>
    <TextInput
    placeholder='Nhập từ vựng tiếng việt'
    value={textVN}
    onChangeText={(text)=>setTextVN(text)}
    style={{height:50,borderWidth:1}}
    />
       <TextInput
    placeholder='Nhập từ vựng tiếng anh'
    value={textEL}
    onChangeText={(text)=>setTextEL(text)}
    style={{height:50,borderWidth:1}}
    />
<View style={{flexDirection:'row'}}>
  <View>
  <Text>TỪ ĐIỂN TIẾNG VIỆT</Text>
    {vietnamese.map((vn,index)=>(
        <View key={index}>
            <Text>{vn.content}</Text>
            <Button
            title='DELETE'
            onPress={()=>{
              setvnId(vn.id);
              store.dispatch({type:'delete',payload:{ID,vnId:vn.id}});
              setVietnamese(()=>{
                return [...store.getState().vietnamese]
              })
            }}
            />
            <Button
            title='EDIT'
            onPress={()=>{
              setTextVN(vn.content)
              setvnId(vn.id)
              setTextEL("")
            }}
            />
        </View>
    ))}
  </View>
  <View>
  <Text>TỪ ĐIỂN TIẾNG ANH</Text>
      {english.map((e,index)=>(
        <View key={index}>
            <Text>{e.content}</Text>
            <Button
            title='DELETE'
            onPress={()=>{
             setEid(e.id)
              store.dispatch({type:'delete',payload:{ID,eId:e.id}})
              setEnglist([...store.getState().english])
            }}
            />
               <Button
            title='EDIT'
            onPress={()=>{
              setTextEL(e.content)
              setEid(e.id)
              setTextVN("")
            }}
            />
        </View>
    ))}
  </View>
</View>
    <Button
    title='THÊM TỪ ĐIỂN'
    onPress={()=>{
    store.dispatch({type:'post',payload:{ID,textVN,textEL}})
    setVietnamese( store.getState().vietnamese)
    setEnglist(store.getState().english)
    }}
    />
    <Button
    title='UPDATE'
    onPress={()=>{
      store.dispatch({type:'update',payload:{ID,eId,vnId,textVN,textEL}})
      setVietnamese([...store.getState().vietnamese])
      setEnglist([...store.getState().english])
    }}
    />
    </View>
  );
}