import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button } from '@material-ui/core';
import { signInWithEmailPassword } from '../../lib/firebase/auth';

const useSignin = () => {
	const [fields, setFields] = useState({ email: '', password: '' });

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFields((f) => ({ ...f, [name]: value }));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const { email, password } = fields;
		const user = await signInWithEmailPassword(email, password);
		console.log({ user });
	};
	return [fields.email, fields.password, changeHandler, submitHandler];
};

const EmailPassword = ({ useHook = useSignin }) => {
	const [email, password, changeHandler, submitHandler] = useHook();
	return (
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
				autoComplete='current-password'
				margin='normal'
				value={password}
				required
				fullWidth
			/>
			<Box mt={2}>
				<Button fullWidth type='submit'>
					Sign In
				</Button>
			</Box>
		</form>
	);
};
export default EmailPassword;
