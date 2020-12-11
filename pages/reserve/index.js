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
            <Container>
                <Map>
                    <SearchBar />
                </Map>
            </Container>
        </Layout>
    );
}
