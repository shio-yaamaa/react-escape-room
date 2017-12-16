const getPixelRgb = (pixelsData, pos, canvasSize) => {
	const x = Math.round(pos[0]);
	const y = Math.round(pos[1]);
  const base = (canvasSize[0] * y + x) * 4;
  return [
  	pixelsData[base + 0],
  	pixelsData[base + 1],
  	pixelsData[base + 2]
  ];
};

export default getPixelRgb;