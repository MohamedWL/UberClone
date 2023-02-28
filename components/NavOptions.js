import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';


/*data array with 2 piece of info. Each one with unique id, title and image. screen 
attribute is the one that determines to which screen we are redirected to. Map screen or EatScreen*/
const data = [
    {
        id:"123",
        title:"Get a ride",
        image:"https://links.papareact.com/3pn",
        screen:"MapScreen",
    },
    {
        id:"456",
        title:"Order Food",
        image:"https://links.papareact.com/28w",
        screen:"EatScreen",
    },
];


const NavOptions = () => {

    const navigation = useNavigation(); //hook to go to the map or eatscreen
    const origin = useSelector(selectOrigin);
    const styles = {
        condition:{
          opacity: origin ? "1" : "0.3", //if origin is selected then we display it, else it is not clickable and with some opacity on it
        }
    };
    
  return (
    <FlatList
    data={data}
    //whenever we have a list we should have a key witha unique id.
    keyExtractor={(item) =>item.id}
    //by default vertical, gotta specifiy
    horizontal
    //for each item, do we do. We get the item
    renderItem={({item}) => (
        <TouchableOpacity style={{padding:2 ,paddingLeft:5, paddingBottom:8, paddingTop:4, backgroundColor:'lightgray', margin:10, width:150}} onPress={()=> navigation.navigate(item.screen)} disabled={!origin}>
            <View style={styles.condition}>
                <Image
                source={{uri: item.image}}
                style={{width:120, height:120, resizeMode:'contain', alignSelf:'center'}} //resizeMode contain keeps the image size ratio
                />
                <Text style={{marginTop:5, fontSize:20, fontFamily:'Avenir', textAlign:'center'}}>{item.title}</Text>
                <Icon name="arrowright" color="white" type="antdesign" style={{padding:5, backgroundColor:'black', borderRadius:80, width:60, marginLeft:43}}/>
            </View>
        </TouchableOpacity>
    )}
    />
  )
}

export default NavOptions

//const styles = StyleSheet.create({})