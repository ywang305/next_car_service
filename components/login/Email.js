import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button } from '@material-ui/core';

const useEmail = () => {
	return [];
};

const Email = () => {
	const [email, password, changeHandler, submitHandler] = useEmail();
	return (
		<form onSubmit={submitHandler} onChange={changeHandler}>
			<TextField
				name='email'
				label='Email'
				placeholder=''
				margin='normal'
				value={email}
				required
			/>
			<TextField
				name='password'
				label='Password'
				type='password'
				autoComplete='current-password'
				margin='normal'
				value={password}
				required
			/>
			<Box mt={2}>
				<Button fullWidth type='submit'>
					Sign In
				</Button>
			</Box>
		</form>
	);
};
export default Email;
