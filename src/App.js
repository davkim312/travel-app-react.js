import React, { useEffect, useState } from 'react'; // need 'useEffect' to call the function of 'placesData' inside 'const App'
import { CssBaseline, Grid } from '@material-ui/core';
import { placesData, getWeatherData } from './api'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [ratedPlaces, setRatedPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    // 'type' is the state, 'setType' is a function that modifies 'type' (state)
    const [rating, setRating] = useState('');
    
    useEffect(() => { // this 'useEffect' is used in order to get the user's location
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => { // MUST use 'coords' instead of 'coordinates' for the google map to appear
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => { // we can use multiple 'useEffect()' but each must serve different purpose
        const ratedPlaces = places.filter((place) => place.rating > rating);

        setRatedPlaces(ratedPlaces);
    }, [rating]); 

    useEffect(() => { // this is a function that accepts another callback function and there's a dependency array at the end
        if(bounds.sw && bounds.ne) { // only if 'bounds' exists, the code below will happen
        
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data));

            placesData(type, bounds.sw, bounds.ne) // 'placesData' is a async function so we need to call '.then' function
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0 )); // '?' in case we dont have data
                    setRatedPlaces([])
                    setIsLoading(false);
                })
        }    
    }, [type, bounds]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={ratedPlaces.length ? ratedPlaces : places} 
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={ratedPlaces.length ? ratedPlaces : places} // to show the places on the map, also need to be rendered inside the 'GoogleMapReact' in the 'map.jsx' file
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default App;