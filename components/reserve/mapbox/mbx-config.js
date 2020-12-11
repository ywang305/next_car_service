import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxnaWV5YW8iLCJhIjoiY2tpamRidDZyMDFrMDMwb2JxdjBybndqZyJ9.kZdxQ8ssnKgtbrhxhseydA';

const placesUri = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const getPlaceSuggests = async (queryStr, center, language = 'en') => {
    if (queryStr.trim().length < 2) return [];
    const encodedStr = encodeURI(queryStr);
    const queryCenter = center ? `proximity=${center.lng},${center.lat}&` : '';
    try {
        const response = await axios.get(
            `${placesUri}/${encodedStr}.json?${queryCenter}access_token=${mapboxgl.accessToken}&language=${language}`
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const getPlace = async ({ lng, lat }, language = 'en') => {
    try {
        const response = await axios.get(
            `${placesUri}/${lng},${lat}.json?access_token=${mapboxgl.accessToken}&language=${language}`
        );
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export { mapboxgl, getPlace, getPlaceSuggests };
