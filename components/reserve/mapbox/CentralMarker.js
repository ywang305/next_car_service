import React, { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapContext } from './Map';

export default function CentralMarker() {
    const map = useContext(MapContext);
    useEffect(() => {
        if (map) {
            const marker = new mapboxgl.Marker({ scale: 1.5 })
                .setLngLat(map.getCenter())
                .addTo(map);
            map.on('move', () => marker.setLngLat(map.getCenter()));
        }
    }, [map]);

    return null;
}
