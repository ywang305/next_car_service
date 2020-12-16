import React from 'react';
import Layout from '../../components/layout';
import { Container, Box, Paper } from '@material-ui/core';
import Map from '../../components/reserve/mapbox/Map';
import SearchBar from '../../components/reserve/mapbox/SearchBar';
import CentralMarker from '../../components/reserve/mapbox/CentralMarker';

export default function Reserve() {
    return (
        <Layout title='Reserve'>
            <Map>
                <SearchBarWrapper />
            </Map>
        </Layout>
    );
}

const SearchBarWrapper = () => (
    <Box
        position='absolute'
        top={16}
        left={16}
        display='flex'
        flexWrap='wrap'
        flexDirection='column'
        maxW={350}
    >
        <Box
            px={1}
            boxShadow={2}
            style={{ backgroundColor: 'rgba(221, 219, 255, 0.6)' }}
        >
            <SearchBar label='Pick Up' />
        </Box>

        <Box
            px={1}
            mt={2}
            boxShadow={2}
            style={{
                backgroundColor: 'rgba(255, 219, 221, 0.6)',
            }}
        >
            <SearchBar label='Drop Off' />
        </Box>
    </Box>
);
