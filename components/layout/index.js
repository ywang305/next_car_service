import React, { useMemo, useCallback, useState } from 'react';
import Head from 'next/head';
import Appbar from '../appbar/Appbar';
export default function Layout({ children, title }) {
	return (
		<div>
			<Head>
				<title>{title ?? 'Next Car Service'}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<header>
				<Appbar />
			</header>

			{children}

			<footer>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by Vercel
				</a>
			</footer>
		</div>
	);
}
