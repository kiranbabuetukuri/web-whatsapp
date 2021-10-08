import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, FlatList,View ,Linking,Button,TouchableOpacity} from 'react-native';
import {getCodes} from './data/data'
// import Clipboard from '@react-native-clipboard/clipboard';
import {Clipboard} from 'react-native';
  //import CountryCodeList from 'react-native-country-code-list'
  import SearchableDropdown from 'react-native-searchable-dropdown';

const styles = StyleSheet.create({
  container : {
 paddingTop:20,
    backgroundColor: '#fff',
flex:1
   
  
  },
  inputContainer: {
    paddingTop:20,
       backgroundColor: '#fff',
 
       
      
     
     },
  input :{
 
    padding :10,
    margin:10,
    borderWidth:2,
     
  },
  flatList:{
    height:50,
  }
});

export default function App() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [conutryCode, setConutryCode] = React.useState("91");
  const [openDisabled, setOpenDisabled] = React.useState(true);
  const [conutryName, setConutryName] = React.useState("India");
  
  const doOpen=()=>{
    let fullPhoneNumber=`${conutryCode}+${phoneNumber}`
let __url="https://api.whatsapp.com/send?phone=+"+fullPhoneNumber+"&text=Hi!"
    Linking.openURL(__url);
  }

  const doPaste=  async () => {
    let text = await Clipboard.getString();
    text=text.replace(/[^0-9\.]+/g, '');

  // console.log((text.length>3))
  setPhoneNumber(text)
  }

  const doClear=()=>{

    setPhoneNumber('')
  }
  const handleText=(text)=>{
setPhoneNumber(text)
     setOpenDisabled(!(text.length>3))
  }
  const items = React.useMemo(() => getCodes(), [ ]);
 const handleCountryCode=(value)=>{
  setConutryCode(value)
  let ct=items.findIndex(el=>{
    console.log("sss  "+el.code +"  "+value)
    return el.code=="+"+value && el.code.length==("+"+value).length
  })

  if(ct>-1){
    console.log(items[ct].name) 
    setConutryName(items[ct].name)
  }

}

 

  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>

     
    <TextInput style={styles.input}  
       keyboardType={'numeric'}      
        value={conutryCode}
        onChangeText={handleCountryCode}
        /> 
         <TextInput style={styles.input}      
        value={conutryName}         
        editable={false}
        /> 
      <TextInput style={styles.input}  
       keyboardType={'numeric'} 
       onChangeText={handleText}
        value={phoneNumber}/> 
    

  
    </View>
    <View>
    <Button title="Paste" onPress={doPaste}/>
    <Button title="Clear" onPress={doClear}/>
    <Button disabled={openDisabled} title="Open" onPress={doOpen}/>
    </View>
    <StatusBar style="auto" />
    </View>
  );
}
