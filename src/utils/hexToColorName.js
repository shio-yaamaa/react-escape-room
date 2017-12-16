const colors = {
	'000000': 'BLACK',
	'000080': 'NAVY',
	'0000FF': 'BLUE',
	'008000': 'GREEN',
	'008080': 'TEAL',
	'0080FF': 'AZURE',
	'00FF00': 'LIME',
	'00FF80': 'MINT',
	'00FFFF': 'CYAN',
	'800000': 'MAROON',
	'800080': 'PURPLE',
	'8000FF': 'VIOLET',
	'808000': 'OLIVE',
	'808080': 'GRAY',
	'8080FF': 'CORNFLOWER',
	'80FF00': 'CHARTREUSE',
	'80FF80': 'SPRING',
	'80FFFF': 'SKY',
	'FF0000': 'RED',
	'FF0080': 'STRAWBERRY',
	'FF00FF': 'MAGENTA',
	'FF8000': 'ORANGE',
	'FF8080': 'SALMON',
	'FF80FF': 'PINK',
	'FFFF00': 'YELLOW',
	'FFFF80': 'LEMON'
};

const hexToColorName = (hex) => {
	hex = hex.toUpperCase();
	return colors[hex] === undefined ? hex : colors[hex];
};

export default hexToColorName;