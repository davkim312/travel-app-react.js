import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Map = ({ coordinates, setBounds, setCoordinates, places, setChildClicked, weatherData }) => {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onChange={(e) => { // this onChange will change location by changing location in map
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)} // we placed 'Number' before in order to convert the coordinates into a number
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? ( // if it's NOT DESKTOP, then below will happen
                                <LocationOnOutlinedIcon  fontSize='large' color='primary' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}> {/* 'elevation' is like 'div' but with a background */}
                                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size='small' value={Number(place.rating)} readOnly /> {/* 'readOnly' is used so users can't change ther rating */}
                                </Paper>
                            )
                        }
                    </div>
                ))}

                {weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img height={130} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                    </div>
                ))}         

            </GoogleMapReact>
        </div>
    );
};

export default Map;