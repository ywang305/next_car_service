import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowSize from 'react-use/lib/useWindowSize';
import useGeolocation from 'react-use/lib/useGeolocation';

const useDevice = () => {
	const { width, height } = useWindowSize();
	// const geoLocation = useGeolocation();
	// const { latitude, longitude } = geoLocation;

	const theme = useTheme();
	const isXS = useMediaQuery(theme.breakpoints.down('xs')); // [0...sm]

	// useEffect(() => {
	//   dispatch(setDeviceGeoLocationCreator(geoLocation));
	// }, [latitude, longitude]);

	return [width, height, isXS];
};
export default useDevice;
