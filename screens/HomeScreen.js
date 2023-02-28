import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'


const HomeScreen = () => {

  const dispatch = useDispatch(); //fires the action wanted to the data layer

  return (
    <SafeAreaView >
      {/*SafeAreaView to prevent any view diplayed at the top with the clock etc...*/}
      <View style = {{padding: 10}}>
        <Image style={{
            width: 75, height: 75, resizeMode: 'contain',
        }}
        source={{ 
            uri:"https://www.freeiconspng.com/thumbs/car-icon-png/car-icon-png-25.png",
        }}/>
        <View>
          <GooglePlacesAutocomplete 
            placeholder="Where from"
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location, //gives object with latitude and longitude and we gonna store in the redux store
                  description: data.description,
                })
              );

              dispatch(setDestination(null));
            }}
            fetchDetails={true} //includes coordinates and geometry locations 
            returnKeyType={"search"}
            enablePoweredByContainer={false} //removes "powered by google"
            //results are given only if the input includes at least 2 letters
            minLength={2}
            //retrieval of our key in the .env file
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            //to search different places
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400} //basically will give you results of your searches after 4 secs of inactivity       
          />
        </View>
        <NavOptions/>
        <NavFavourites /*Shortcuts for frequent destinations timestmap 5:44:10*/>

        </NavFavourites>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen