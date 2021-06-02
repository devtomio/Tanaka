const request = require('node-superfetch');

const baseURL = 'https://api.tomio.codes';

/**
 * @param {string} path The path.
 * @param {'json'|'buffer'|'text'} type The response type.
 * @param {'get'|'post'|'put'|'patch'|'delete'} method The method.
 * @param {Record<string, any>} [query] The query.
 * @returns {Promise<Buffer | string | Record<string, any>>} The response.
 */
module.exports = async (path, type, method, query = {}) => {
	if (type === 'text') {
		const { text } = await request[method](`${baseURL}${path}`).query(query);

		return text;
	}

	const { body } = await request[method](`${baseURL}${path}`).query(query);

	return body;
};
