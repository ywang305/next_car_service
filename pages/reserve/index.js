import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Container, Box, Paper } from '@material-ui/core';
import Map from '../../components/reserve/mapbox/Map';
import SearchPanel from '../../components/reserve/place/SearchPanel';
import VehicleOption from '../../components/reserve/vehicle/VehicleOption';
import ScheduleOption from '../../components/reserve/schedule/ScheduleOption';

export default function Reserve() {
    return (
        <Layout title='Reserve'>
            <Box position='relative'>
                <Map>
                    <SearchPanel />
                </Map>
                <OptionsWrapper />
            </Box>
        </Layout>
    );
}

const OptionsWrapper = () => {
    return (
        <Box
            position='absolute'
            left={16}
            bottom={16}
            boxShadow={3}
            width={350}
        >
            <Box mb={2}>
                <VehicleOption />
            </Box>
            <Box mt={2}>
                <ScheduleOption />
            </Box>
        </Box>
    );
};
