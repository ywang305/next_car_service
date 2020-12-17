import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Container, Box, Paper } from '@material-ui/core';
import Map from '../../components/reserve/mapbox/Map';
import SearchPanel from '../../components/reserve/place/SearchPanel';

export default function Reserve() {
    return (
        <Layout title='Reserve'>
            <Map>
                <SearchPanel />
            </Map>
        </Layout>
    );
}
