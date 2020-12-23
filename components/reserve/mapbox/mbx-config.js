import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxnaWV5YW8iLCJhIjoiY2tpamRidDZyMDFrMDMwb2JxdjBybndqZyJ9.kZdxQ8ssnKgtbrhxhseydA';

const placesUri = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const getPlaceSuggests = async (
    queryStr,
    center,
    limit = 5,
    language = 'en'
) => {
    if (queryStr.trim().length < 2) return [];
    const encodedStr = encodeURI(queryStr);
    const queryCenter = center ? `proximity=${center.lng},${center.lat}&` : '';
    try {
        const response = await axios.get(
            `${placesUri}/${encodedStr}.json?${queryCenter}access_token=${mapboxgl.accessToken}&limit=${limit}&language=${language}`
        );
        return response.data;
    } catch (err) {
        console.error(err);
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

const getRoute = async (source, destination, roundtrip = false) => {
    const optmizedUri = 'https://api.mapbox.com/optimized-trips/v1';
    const profile = 'mapbox/driving-traffic';
    const coordinates = [
        [source.lng, source.lat],
        [destination.lng, destination.lat],
    ]
        .map((arr) => arr.join(','))
        .join(';');
    try {
        const response = await axios.get(
            `${optmizedUri}/${profile}/${coordinates}?geometries=geojson&roundtrip=${roundtrip}&source=first&destination=last&access_token=${mapboxgl.accessToken}`
        );
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export { mapboxgl, getPlace, getPlaceSuggests, getRoute };
