import React from 'react';
import Layout from '../../components/layout';
import {
    Container,
    Box,
    IconButton,
    Divider,
    Typography,
    Tooltip,
} from '@material-ui/core';
import Map from '../../components/reserve/mapbox/Map';
import SearchBar from '../../components/reserve/mapbox/SearchBar';

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
    >
        <SearchBar label='Pick Up' />

        <Box mt={2}>
            <SearchBar label='Drop Off' />
        </Box>
    </Box>
);
