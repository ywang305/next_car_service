import React from 'react';
import { Container, Box, IconButton, Divider } from '@material-ui/core';
import EmailPassword from '../../components/login/EmailPassword';
import Google, { GIcon } from '../../components/login/Google';
import Phone from '../../components/login/Phone';
import Layout from '../../components/layout';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Link from 'next/link';

export default function LoginPage({ provider }) {
	const { Component } = options.find((x) => x.provider === provider);
	const alternatives = options.filter((x) => x.provider !== provider);

	return (
		<Layout>
			<Container maxWidth='xs'>
				<Box pt={8} pb={2}>
					<Component />
				</Box>
				<Divider />
				{alternatives.map((a) => {
					const { Icon, provider, href } = a;
					return (
						<Link href={href} key={provider}>
							<IconButton color='primary'>
								<Icon />
							</IconButton>
						</Link>
					);
				})}
			</Container>
		</Layout>
	);
}

export const options = [
	{
		provider: 'email',
		Component: EmailPassword,
		Icon: EmailIcon,
		href: '/login/email',
	},
	{
		provider: 'phone',
		Component: Phone,
		Icon: PhoneIcon,
		href: '/login/phone',
	},
	{
		provider: 'google',
		Component: Google,
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
