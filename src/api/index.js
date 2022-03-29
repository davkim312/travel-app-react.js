import axios from 'axios'; // 'axios' is the library that will help us make our calls 
  
export const placesData = async (type, sw, ne) => { // export this to 'app.js' 
    // 'try' gets the request, IF the 'try' request fails it goes to the 'catch (error)' 
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
   
            params: {
              bl_latitude: sw.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              tr_latitude: ne.lat,
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
            }
        });

        return data;

    } catch (error) {
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng) => {
    try {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: {
          lat: lat,
          lon: lng
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
      });
      
      return data;
    } catch (error) {
      console.log(error)
    }
}


