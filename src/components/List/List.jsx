import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import DetailsofPlaces from '../DetailsofPlaces/DetailsofPlaces';

import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {

    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]); // 'el' stands for element

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef()); // you want to use empty line in first paramenter so we don't need it
    
        setElRefs(refs);
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant='h5'>Places to stay, eat, and to have fun around you!</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem' />
                </div>
            ) : (
            <>
                <FormControl className={classes.formControl}>
                    <InputLabel id='type'>Type</InputLabel>
                    
                    <Select id='type' value={type} onChange={(e) => setType(e.target.value)}>
    {/* the 'onChange' (e.target.value) will allow the target to change to whatever is selected such as 'hotels', 'restaurants' and 'attractions' */}

                        <MenuItem value='restaurants'>Restaurants</MenuItem>
                        <MenuItem value='hotels'>Hotels</MenuItem>
                        <MenuItem value='attractions'>Attractions</MenuItem>
                    </Select>
                    {/* the 'select' above needs to be modified by using state */}
                
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id='rating'>Rating</InputLabel>
                    <Select id='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={2}>2 Stars</MenuItem>
                        <MenuItem value={3}>3 Stars</MenuItem>
                        <MenuItem value={4}>4 Stars</MenuItem>
                        <MenuItem value={4.5}>4.5 to 5 Stars (Highly Rated!)</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={4} className={classes.list}>
                    {places?.map((place, i) => ( // 'i' is index 
                        <Grid
                            item key={i} 
                            xs={12}
                        >
                            <DetailsofPlaces 
                                place={place}
                                selected={Number(childClicked) === i}
                                refProp={elRefs[i]}
                            /> {/* this will come from 'DetailsofPlaces' */}
                        </Grid>
                    ))}
            {/* only if the 'places' exist it will 'map' over them */}
                </Grid>
            </>
            )}
        </div>
    );
};

export default List;