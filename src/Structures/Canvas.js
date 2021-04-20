const distort = (ctx, amplitude, x, y, width, height, strideLevel = 4) => {
	const data = ctx.getImageData(x, y, width, height);
	const temp = ctx.getImageData(x, y, width, height);
	const stride = width * strideLevel;

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			const xs = Math.round(amplitude * Math.sin(2 * Math.PI * 3 * (j / height)));
			const ys = Math.round(amplitude * Math.sin(2 * Math.PI * 3 * (j / width)));
			const dest = j * stride + i * strideLevel;
			const src = (j + ys) * stride + (i + xs) * strideLevel;

			data.data[dest] = temp.data[src];
			data.data[dest + 1] = temp.data[src + 1];
			data.data[dest + 2] = temp.data[src + 2];
		}
	}

	ctx.putImageData(data, x, y);

	return ctx;
};

module.exports = {
	distort,
};
