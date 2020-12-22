import React from 'react';
import Layout from '../components/layout';
import {
    Container,
    Box,
    IconButton,
    Divider,
    Typography,
    Button,
} from '@material-ui/core';
import useDevice from '../lib/hooks/useDevice';

export default function Home() {
    const [width, height] = useDevice();
    return (
        <Layout>
            <div
                style={{
                    backgroundImage: 'url(/land/Cyberpunk-2077.jpg)',
                    height: 'calc(100vh - 60px)',
                    opacity: 0.8,
                }}
            ></div>
        </Layout>
    );
}
