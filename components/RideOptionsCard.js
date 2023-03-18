import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import NavigateCard from './NavigateCard'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const RideOptionsCard = () => {

  const navigation = useNavigation();

  //dummy data to get it going
  const data=[
    {
      id:"Uber-X-123",
      title:"UberX",
      multiplier:1,
      image:"https://links.papareact.com/3pn"
    },
    {
      id:"Uber-XL-456",
      title:"UberXL",
      multiplier:1.2,
      image:"https://links.papareact.com/5w8"
    },
    {
      id:"Uber-LUX-789",
      title:"UberLUX",
      multiplier:1.75,
      image:"https://links.papareact.com/7pf"
    },
  ];
  const CHARGE_RATE = 1.5;
  const [selected,setSelectedState]=useState(null); //used to show if a car has been selected and if selected you can choose with the button all the way down below
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={{backgroundColor:'white', flexGrow:1}}>
      <View>
        <TouchableOpacity 
          style={{position:'absolute', top:3, left:5, padding:3, borderRadius:20, backgroundColor:'black', zIndex:50}}
          onPress={()=> navigation.navigate("NavigateCard")}>
          
          <Icon name='chevron-left' type='fontawesome' color='white'/>
        </TouchableOpacity>
      </View>
      <Text style={{textAlign:'center', padding:5, fontWeight:'bold', fontSize:25}}>Select a ride - {travelTimeInformation?.distance.text}</Text>
      <FlatList
        style={{top:10}}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item:{id,title,multiplier,image},item}) => (
          <TouchableOpacity style={{height:80,flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingRight:15 ,paddingLeft:15, backgroundColor: id === selected?.id ? "lightgray" : "white", }}
          onPress={()=> setSelectedState(item)}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{uri:image}}
            />
            <View style={{marginLeft:-6}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} travel time</Text>
            </View>
            {/*To calculate the price, get the format, the currency and apply your formula (/100 for the cents)*/}
            <Text style={{fontSize:25,lineHeight:60}}> 
              {new Intl.NumberFormat('en-ca', {
                style:'currency',
                currency:'CAD'
              }).format(

                (travelTimeInformation?.duration.value * CHARGE_RATE * multiplier / 100 )

              )}

            </Text>
          </TouchableOpacity>
        )}
      />

      {/*Button that takes the selected car. If car not selected, button is disabled*/}
      <View style={{marginTop:10}}>
        <TouchableOpacity disabled={!selected} style={{backgroundColor:'black', paddingTop:3, paddingBottom:3, margin:3, backgroundColor: !selected ? "lightgray" : "black", }}>
          <Text style={{textAlign:'center', color:'white', fontWeight:'bold', fontSize:30, fontFamily:'Apple Color Emoji',}}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})