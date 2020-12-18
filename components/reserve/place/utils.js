import { Marker, Popup } from 'mapbox-gl';

export function createPuMarker(pickup, color = '#0000ff') {
    return new Marker({ color }).setLngLat(pickup.center).setPopup(
        new Popup().setHTML(
            `<p>${pickup.place_name}</p>
            <p>${JSON.stringify(pickup.center)}</p>`
        )
    );
}
export function createDoMarker(dropoff, color = '#ff0000') {
    return createPuMarker(dropoff, color);
}

export const getPlacePrimary = (place_name) => {
    return place_name?.split(',').slice(0, 2).join(',');
};
