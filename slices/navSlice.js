import { createSlice } from "@reduxjs/toolkit";

//where you are, where you want to go and the time it's gonna take etc...
const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
};


export const navSlice = createSlice({
    name: "nav",
    initialState,
    //When we push infos to the data layer we need ways to dispatch actions into the data layer. Reducer helps us with that
    reducers:{
        //state = current state i.e what the layer looks like. the action = when we make the action
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },  
    },//gonna need to expose the actions to the rest of the app
});

export const {setOrigin, setDestination, setTravelTimeInformation} = navSlice.actions; //destructuring

//We need selectors, when we push info into the data layer, we need to pull it back from there as well.
//Best practice is 1 selector = 1 item in initialState
export const selectOrigin = (state) => state.nav.origin;// = (...) => returns value
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

//Final thing is export the navSlice, so I can hook it up to the store
export default navSlice.reducer; //goes from here to the store.js file "navReducer"



