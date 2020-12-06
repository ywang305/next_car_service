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
import { Provider } from 'react-redux';
import store from '../lib/store/configStore';

const theme = createMuiTheme({
    palette: {
        primary: teal,
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
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </MuiThemeProvider>
            </Provider>
        </div>
    );
}
