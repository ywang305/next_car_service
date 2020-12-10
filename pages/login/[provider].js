import React from 'react';
import {
    Container,
    Box,
    IconButton,
    Divider,
    Typography,
    Tooltip,
} from '@material-ui/core';
import Password, { PasswordIcon } from '../../components/login/Password';
import Google from '../../components/login/Google';
import Phone, { PhoneIcon } from '../../components/login/Phone';
import Email, { EmailIcon } from '../../components/login/Email';
import Layout from '../../components/layout';

import Link from 'next/link';

export default function LoginPage({ provider = options[0].provider }) {
    const { Provider } = options.find((x) => x.provider === provider);
    const alternatives = options.filter((x) => x.provider !== provider);

    return (
        <Layout>
            <Container maxWidth='xs'>
                <Box pt={6} pb={2} aria-label='provider-box'>
                    <Provider />
                </Box>
                <Divider />
                <br />
                <Typography color='textSecondary'>or sign in with</Typography>
                {alternatives.map((a) => {
                    const { Icon, Provider, provider, href } = a;

                    return href ? (
                        <Link href={href} key={provider}>
                            <Tooltip title={provider}>
                                <IconButton color='primary'>
                                    <Icon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Provider key={provider} />
                    );
                })}
                <Divider />
                <br />
                <Link href={'/login/SignUp'}>Sign Up</Link>
            </Container>
        </Layout>
    );
}

// TODO +email provier
export const options = [
    {
        provider: 'password',
        Provider: Password,
        Icon: PasswordIcon,
        href: '/login/password',
    },
    {
        provider: 'phone',
        Provider: Phone,
        Icon: PhoneIcon,
        href: '/login/phone',
    },
    {
        provider: 'email',
        Provider: Email,
        Icon: EmailIcon,
        href: '/login/email',
    },
    {
        provider: 'google',
        Provider: Google,
    },
];

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const paths = options
        .filter((x) => x.href)
        .map((x) => ({ params: { provider: x.provider } }));

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
