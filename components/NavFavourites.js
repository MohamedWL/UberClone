import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const NavFavourites = () => {

    const data = [
        {
            id:"123",
            icon:"home",
            location:"Home",
            destination:"Code Street, London, UK",
        },
        {
            id:"456",
            icon:"briefcase",
            location:"Work",
            destination:"London Eye, London, UK",
        },
    ];

  return (
    <FlatList
    data={data}
    keyExtractor={(item) =>item.id}
    ItemSeparatorComponent={()=>(
        <View style={{height:2, backgroundColor:'gray'}}/>
    )}
    renderItem={({item: {location, destination,icon }}) => (
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', padding:9}}>
            <Icon
                style={{margin:4, borderRadius:'9999px', backgroundColor:'lightgray', padding:9}}
                name={icon}
                type="ionicon"
                color="white"
                size={18}
            />
            <View style={{paddingLeft:10}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>{location}</Text>
                <Text style={{color:'gray'}}>{destination}</Text>
            </View>
        </TouchableOpacity>
    )}
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})