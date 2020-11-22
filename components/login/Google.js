import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button } from '@material-ui/core';
import { signInWithGoogle } from '../../lib/firebase/auth';

const clickHandler = async () => {
	const result = await signInWithGoogle();
	const token = result.credential.accessToken;
	const user = result.user;
	console.log(token, user);
};

const Google = () => {
	return (
		<Button fullWidth color='secondary' onClick={clickHandler}>
			Sign In with Google
		</Button>
	);
};
export default Google;
