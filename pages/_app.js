import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
	blue,
	pink,
	green,
	teal,
	indigo,
	red,
	purple,
	lightBlue,
	lightGreen,
	lime,
	yellow,
	amber,
	deepPurple,
	deepOrange,
} from '@material-ui/core/colors';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import { persistor, store } from '../lib/store/store';

const theme = createMuiTheme({
	palette: {
		primary: deepOrange,
		secondary: lime,
	},
	typography: {
		// In Chinese and Japanese the characters are usually larger,
		// so a smaller fontsize may be appropriate.
		fontSize: 16,
	},
});

export default function MyApp({ Component, pageProps }) {
	return (
		<div>
			{/* <Provider store={store}>
				<PersistGate persistor={persistor} loading={null}> */}
					<MuiThemeProvider theme={theme}>
						<Component {...pageProps} />
					</MuiThemeProvider>
				{/* </PersistGate>
			</Provider> */}
		</div>
	);
}
