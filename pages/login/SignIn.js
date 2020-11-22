import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import EmailPassword from '../../components/login/EmailPassword';
import Google from '../../components/login/Google';
import Layout from '../../components/layout';

export default function SignIn() {
	return (
		<Layout>
			<Box width={1} maxWidth={600}>
				<EmailPassword />
				<Google />
			</Box>
		</Layout>
	);
}
