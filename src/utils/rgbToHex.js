const rgbToHex = (rgb) => (
	rgb.reduce((prev, curr) => (
		prev + ('00' + curr.toString(16)).substr(-2)
	), '').toUpperCase()
);

export default rgbToHex;