import React from 'react';
import { Container, Box, IconButton, Typography } from '@material-ui/core';
import Layout from '../../components/layout';

import Link from 'next/link';
import { options } from './[provider]';

export default function Index() {
	return (
		<Layout>
			<Container maxWidth='xs'>
				<Box display='flex' flexDirection='column' alignItems='center' pt={8}>
					<Typography variant='h6' gutterBottom>
						select a way to sign in
					</Typography>
					<div>
						{options.map((a) => {
							const { Icon, provider, href } = a;
							return (
								<Link href={href} key={provider}>
									<IconButton>
										<Icon />
									</IconButton>
								</Link>
							);
						})}
					</div>
				</Box>
			</Container>
		</Layout>
	);
}
