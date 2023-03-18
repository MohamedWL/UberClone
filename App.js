import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'; 
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import EatScreen from './screens/EatScreen';
import { store } from "./store";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform} from 'react-native'; //to avoid the keyboard hiding autocomplete suggestion
/*Provider is a component given to us to use from the react-redux node package. We use Provider in order to pass the store as an attribute. By passing the store as an attribute in the Provider component, we are avoiding having to store the store as props. */
//Need a store with react-redux. It is a data layer



export default function App() {

  const Stack = new createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} //if ios use padding, otherwise use height
          keyboardVerticalOffset = {Platform.OS === "ios" ? -20 : 0}
          style={{flex:1 /*necessary or nothing will show up*/}}
          >
            <Stack.Navigator>
              <Stack.Screen 
                name='HomeScreens' 
                component={HomeScreen} 
                options={{
                  headershown: false,
                }}
              />
              <Stack.Screen 
                name='MapScreen' 
                component={MapScreen} 
                options={{
                  headershown: false,
                }}
              />
              <Stack.Screen 
                name='EatScreen' 
                component={EatScreen} 
                options={{
                  headershown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
