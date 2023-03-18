import { StyleSheet, Text, View } from 'react-native'
import {React, useEffect, useRef} from 'react'
import MapView from 'react-native-maps/lib/MapView'
import { MapMarker } from 'react-native-maps/lib/MapMarker'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_APIKEY} from "@env"


const Map = () => {

    const origin = useSelector(selectOrigin); //to pull from the data layer, see navSlice
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    //used to find directions every time the origin or the destination change
    useEffect(()=>{
        if(!origin||!destination) return;

        mapRef.current?.fitToSuppliedMarkers(["origin","destination"], { //need 2 markers below, fitToElements also should work
            edgePadding: {top:100 , right: 100, bottom:100, left:100},
        });
    },  [origin,destination]);

    /*responsible for calculating the travel time, need the origin, destination and the api key
    we will calculate it, send it to the redux store and it's going to get pulled when we select a ride
    */
    useEffect(() =>{
        if(!origin||!destination) return;
        /*fetch will pull information from the endpoint. Then will get the response and parse it as a json object
        */
        const getTravelTime = async() => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            ).then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            })
        };

        getTravelTime();
    }, [origin,destination,GOOGLE_MAPS_APIKEY])

  return (
    <MapView
        ref={mapRef}//necessary for the useEffect to work
        style={{flex:1}} //required to see the map
        mapType="mutedStandard" //less unecessary details on the map
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta:0.005,
            longitudeDelta:0.005,
        }}
    >
        {origin && destination &&(
            <MapViewDirections //gives us the directions and takes the origin and destination if they exist and are stored in our redux store
                origin={origin.description}
                destination ={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                //width and color of the line showing the destination
                strokeWidth={3}
                strokeColor="black"
            />
        )}

        {origin?.location && ( //the ?. basically prevents an undefined error, i.e if there is no origin dont freak out
            <MapMarker //Put a pin on the location
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Origin"
                description={origin.description}
                identifier="origin"
            />            
        )}
        {destination?.location && ( //the ?. basically prevents an undefined error, i.e if there is no origin dont freak out
            <MapMarker //Put a pin on the location
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="Destination"
                description={destination.description}
                identifier="destination"
            />            
        )}
    </MapView>

  )
}

export default Map

/*const styles = StyleSheet.create({})

if we console.log in the useEffect
Object {
  "destination_addresses": Array [
    "Toronto, ON, Canada",
  ],
  "origin_addresses": Array [
    "Montreal, QC, Canada",
  ],
  "rows": Array [
    Object {
      "elements": Array [
        Object {
          "distance": Object {
            "text": "542 km",
            "value": 541601,
          },
          "duration": Object {
            "text": "5 hours 20 mins",
            "value": 19186,
          },
          "status": "OK",
        },
      ],
    },
  ],
  "status": "OK",
}



*/
