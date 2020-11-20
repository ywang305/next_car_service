import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import Email from '../../components/login/Email';
import Google from '../../components/login/Google';

export default function SignIn() {
	return (
		<Box width={1} maxWidth={600}>
			<Email />
			<Google />
		</Box>
	);
}
