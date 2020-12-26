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
                    backgroundImage: 'url(/land/CyberCarLanding.webp)',
                    height: 1712,
                    position: 'relative',
                }}
            >
                <iframe
                    style={{ position: 'absolute', right: 16, top: 16 }}
                    width='420'
                    height='315'
                    src='https://www.youtube.com/embed/qIcTM8WXFjk?autoplay=1&controls=0&start=3&end=26'
                    frameborder='0'
                ></iframe>
            </div>
        </Layout>
    );
}
