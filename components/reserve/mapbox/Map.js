import React, { useEffect, useRef, useState, createContext } from 'react';
import Head from 'next/head';
import styles from './map.module.css';
import CentralMarker from './CentralMarker';
import { mapboxgl } from './mbx-config';

export default function Map({ children }) {
    const [lng, setLng] = useState(-74.0059413);
    const [lat, setLat] = useState(40.7127837);
    const [zoom, setZoom] = useState(13);
    const [map, setMap] = useState(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerEl.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        setMap(map);
        return map.remove;
    }, []);
    const mapContainerEl = useRef(null);

    return (
        <div>
            <Head>
                <link
                    href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css'
                    rel='stylesheet'
                />
            </Head>
            <MapContext.Provider value={map}>
                <div>
                    <div ref={mapContainerEl} className={styles.mapContainer} />
                </div>
                <CentralMarker />
                {children}
            </MapContext.Provider>
        </div>
    );
}

export const MapContext = createContext();
