import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Divider, ListItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectVehicldeId,
    vehicleIdAction,
} from '../../../lib/store/reserveSlice';
import Details from './Details';
import AccordionOption from './AccordionOption';

export default function VehicleOption() {
    const storedVid = useSelector(selectVehicldeId);
    const dispatch = useDispatch();

    const selectHandler = (vid) => () => {
        dispatch(vehicleIdAction(vid));
    };

    return (
        <AccordionOption
            summary={
                <Details
                    {...vehicles.find((v) => v.vid === storedVid)}
                    imgWidth={70}
                    imgHeight={36}
                    color='info.main'
                />
            }
            options={vehicles.map((v) => {
                const selected = storedVid === v.vid;
                return (
                    <ListItem
                        button
                        divider
                        selected={selected}
                        key={v.vid}
                        onClick={selectHandler(v.vid)}
                        style={{ marginTop: 4 }}
                    >
                        <Details
                            {...v}
                            color={selected ? 'text.primary' : 'text.secondary'}
                        />
                    </ListItem>
                );
            })}
        />
    );
}

const vehicles = [
    {
        vid: 'BMW iR',
        src: '/BMW-iR.webp',
        passengers: 1,
        luggages: 0,
        price: 20,
        ev: true,
        accessible: false,
        wifi: false,
        bed: false,
        coffee: false,
        race: true,
        auto: false,
    },
    {
        vid: 'Nissan GT-R',
        src: '/Nissan-GT-R.webp',
        passengers: 3,
        luggages: 1,
        price: 34,
        race: true,
    },
    {
        vid: 'Cybertruck',
        src: '/Cybertruck.webp',
        passengers: 4,
        luggages: 10,
        price: 60,
        ev: true,
        race: true,
        auto: true,
    },
    {
        vid: 'Faraday FF91',
        src: '/Faraday-FF91.webp',
        passengers: 3,
        luggages: 2,
        price: 110,
        ev: true,
        wifi: true,
        bed: true,
        coffee: true,
        race: true,
        auto: true,
    },
    {
        vid: 'Kawa Ninja',
        src: '/Kawa-Ninja.webp',
        passengers: 1,
        luggages: 0,
        price: 23,
        race: true,
    },
    {
        vid: 'Maserati Ghibli',
        src: '/Maserati-Ghibli.webp',
        passengers: 3,
        luggages: 2,
        price: 13,
        race: true,
    },
    {
        vid: 'Tesla X',
        src: '/Tesla-X.webp',
        passengers: 4,
        luggages: 4,
        price: 19,
        ev: true,
        auto: true,
    },
    {
        vid: 'Tesla Bus',
        src: '/Tesla-Bus.webp',
        passengers: 10,
        luggages: 10,
        price: 260,
        ev: true,
        accessible: true,
        wifi: true,
        bed: true,
        coffee: true,
        auto: true,
    },
    {
        vid: 'Zoox',
        src: '/Zoox.webp',
        passengers: 6,
        luggages: 4,
        price: 90,
        ev: true,
        accessible: true,
        wifi: true,
        auto: true,
    },
    {
        vid: 'Apple Car',
        src: '/Apple-Car.webp',
        passengers: 2,
        luggages: 2,
        price: 69,
        ev: true,
        accessible: false,
        wifi: true,
        bed: false,
        coffee: false,
        auto: true,
    },
]
    .map((v) => {
        v.src = '/vehicles' + v.src;
        return v;
    })
    .sort((a, b) => {
        const dffPassengers = a.passengers - b.passengers;
        const dffLuggages = a.luggages - b.luggages;
        return dffPassengers ? dffPassengers : dffLuggages;
    });
