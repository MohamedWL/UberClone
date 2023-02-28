import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import MapView from 'react-native-maps'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'

const MapScreen = () => {

  const Stack = createStackNavigator();

  return (
    <View>
      {/*First view has the map*/}
      <View style={{height:'50%'}}>
        <Map/>
      </View>
      {/*Second view has the map*/}
      <View style={{height:'50%'}}>
        {/*Same principle as the App parent comp. Swipable to another screen but for the
        bottom part of the page*/}
        <Stack.Navigator> 
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options= {{
              headerShown: false //
            }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options= {{
              headerShown: false //
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
    
  )
}

export default MapScreen

//const styles = StyleSheet.create({})