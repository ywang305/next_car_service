import React, { useMemo, useCallback, useState } from 'react';
import Head from 'next/head';
import Appbar from '../appbar/Appbar';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function Layout({ children, title = '' }) {
    return (
        <div>
            <Head>
                <title>{title || 'Next Car Service'}</title>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <header>
                <Appbar />
            </header>
            <CssBaseline />

            {children}

            {/* <footer style={{ display: 'flex', justifyContent: 'center' }}>
				<a
					href='http://github.com/ywang305'
					target='_blank'
					rel='noopener noreferrer'
				>
					Yao's github
				</a>
			</footer> */}
        </div>
    );
}
