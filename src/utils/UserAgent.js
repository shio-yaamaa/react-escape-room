let isMobileDeviceResult = null;

export const isMobileDevice = () => {
	if (isMobileDeviceResult !== null) {
		return isMobileDeviceResult;
	}
	const ua = navigator.userAgent;

	// IE 11 doesn't support String#includes
	isMobileDeviceResult = ua.indexOf('Mobile') > 0
	  || ua.indexOf('iPhone') > 0
		|| ua.indexOf('iPad') > 0
		|| ua.indexOf('iPod') > 0
		|| ua.indexOf('Android') > 0
		|| ua.indexOf('Windows Phone') > 0;

	return isMobileDeviceResult;
}