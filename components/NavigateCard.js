import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'


const NavigateCard = () => {

    const dispatch = useDispatch(); //fires the action wanted to the data layer
    const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>{/*Dont want it to go in the little black bar on your Iphones screen*/}
      <Text style={{textAlign:'center', padding:10, fontSize:20}}>Good morning Mohamed !</Text>
      {/*WHERE TO, it'll set our destination*/}
      <View style={{flexShrink:1, borderTopWidth:2, borderColor:'lightgray'}}> 
        <View>
            <GooglePlacesAutocomplete
                /*GoogleAutocomplete documentation on https://github.com/FaridSafi/react-native-google-places-autocomplete*/
                placeholder='Where to'
                debounce={400}
                minLength={2}
                nearbyPlacesAPI="GooglePlacesSearch"
                styles={InputBoxStyles}
                enablePoweredByContainer={false}
                fetchDetails={true}
                query={{
                    key: GOOGLE_MAPS_APIKEY, //same as homescreen
                    language: "en",
                }}
                onPress={(data, details = null) => {
                    dispatch(
                        setDestination({
                            location: details.geometry.location, //gives object with latitude and longitude and we gonna store in the redux store
                            description: data.description,
                        })
                    );
                    navigation.navigate('RideOptionsCard');//navigation to the pick a ride after we stored our destination 
                }}
            />
        </View>
        <NavFavourites/>
      </View>
      <View style={{flexDirection:'row', backgroundColor:"white", justifyContent:'space-evenly', marginTop:'auto', borderTopWidth:2, borderColor:'lightgray'}}>
        <TouchableOpacity 
            style={{justifyContent:'space-between', backgroundColor:'black', flexDirection:'row', width:60, padding:4, borderRadius:'20px', display:'flex', height:45, width:90, alignItems:'center', justifyContent:'center'}}
            onPress={()=> navigation.navigate("RideOptionsCard")}
            >
            <Icon
                name="car"
                type="font-awesome"
                color="white"
                size={16}
            />
            <Text style={{color:'white', textAlign:'center'}}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent:'space-between', backgroundColor:'white', borderWidth:2 ,borderColor:'black', flexDirection:'row', width:60, padding:4, borderRadius:'20px', display:'flex', height:45, width:90, alignItems:'center', justifyContent:'center'}}>
            <Icon
                name="car"
                type="font-awesome"
                color="black"
                size={16}
            />
            <Text style={{color:'black', textAlign:'center'}}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const InputBoxStyles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop: 20,
        flex:0,
    },
    textInput:{
        backgroundColor:"#dddddf",
        borderRadius: 0,
        fontSize:18,
    },
    textInputContainer:{
        paddingBottom:0,
        paddingHorizontal: 20,
    },
});