import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = ({ setCoordinates }) => {

    const classes = useStyles();
    
    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autoComp) => setAutocomplete(autoComp); // the parameter must be different name thant 'autocomplete' thus named, 'autoComp'

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    }

    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h4' className={classes.title}> {/* 'Typography' used for any text, but for this we want the text pretty big */}
                    Your Personal Travel Guide
                </Typography>
                <Box display='flex'>
                    <Typography variant='h5' className={classes.title}>
                        Become a local wherever you are!
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}> {/* this is going to be the search bar box */}
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;