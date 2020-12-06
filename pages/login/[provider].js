import React from 'react';
import {
    Container,
    Box,
    IconButton,
    Divider,
    Typography,
    Tooltip,
} from '@material-ui/core';
import Password from '../../components/login/Password';
import Google, { GIcon } from '../../components/login/Google';
import Phone from '../../components/login/Phone';
import Layout from '../../components/layout';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import KeyIcon from '@material-ui/icons/VpnKey';
import Link from 'next/link';

export default function LoginPage({ provider = options[0].provider }) {
    const { ProviderComponent } = options.find((x) => x.provider === provider);
    const alternatives = options.filter((x) => x.provider !== provider);

    return (
        <Layout>
            <Container maxWidth='xs'>
                <Box pt={6} pb={2} aria-label='provider-box'>
                    <ProviderComponent />
                </Box>
                <Divider />
                <br />
                <Typography color='textSecondary'>or sign in with</Typography>
                {alternatives.map((a) => {
                    const { Icon, provider, href } = a;
                    return (
                        <Link href={href} key={provider}>
                            <Tooltip title={provider}>
                                <IconButton color='primary'>
                                    <Icon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    );
                })}
            </Container>
        </Layout>
    );
}

export const options = [
    {
        provider: 'password',
        ProviderComponent: Password,
        Icon: KeyIcon,
        href: '/login/password',
    },
    {
        provider: 'phone',
        ProviderComponent: Phone,
        Icon: PhoneIcon,
        href: '/login/phone',
    },
    {
        provider: 'google',
        ProviderComponent: Google,
        Icon: GIcon,
        href: '/login/google',
    },
];

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const paths = options.map((x) => ({ params: { provider: x.provider } }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const { provider } = options.find((x) => x.provider === params.provider);

    // will receive as props at build time
    return {
        props: {
            provider,
        },
    };
}
