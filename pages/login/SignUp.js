import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import Layout from '../../components/layout';
import { signUpWithEmailPassword } from '../../lib/firebase/auth';

const useSignup = () => {
	const [fields, setFields] = useState({
		email: '',
		password: '',
		cfmPassword: '',
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFields((f) => ({ ...f, [name]: value }));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const { email, password, cfmPassword } = fields;
		if (password !== cfmPassword) {
			return;
		}

		const user = await signUpWithEmailPassword(email, password);
		console.log({ user });
	};
	return [
		fields.email,
		fields.password,
		fields.cfmPassword,
		changeHandler,
		submitHandler,
	];
};

export default function SignUp() {
	const [
		email,
		password,
		cfmPassword,
		changeHandler,
		submitHandler,
	] = useSignup();

	const matched = password.startsWith(cfmPassword);

	return (
		<Layout>
			<Box width={1} maxWidth={600}>
				<form onSubmit={submitHandler} onChange={changeHandler}>
					<TextField
						name='email'
						label='Email'
						placeholder=''
						margin='normal'
						value={email}
						required
						fullWidth
					/>
					<TextField
						name='password'
						label='Password'
						type='password'
						margin='normal'
						value={password}
						required
						fullWidth
					/>
					<TextField
						error={!matched}
						helperText={matched ? '' : 'not matched'}
						name='cfmPassword'
						label='Confirm Password'
						type='password'
						margin='normal'
						value={cfmPassword}
						required
						fullWidth
					/>
					<Box mt={2}>
						<Button fullWidth type='submit'>
							Sign Up
						</Button>
					</Box>
				</form>
			</Box>
		</Layout>
	);
}
