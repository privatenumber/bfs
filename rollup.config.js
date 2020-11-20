import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const isProd = process.env.NODE_ENV === 'production';

const rollupConfig = {
	input: 'src/bfs.js',
	plugins: [
		babel(),
		isProd && terser(),
		isProd && filesize(),
	],
	output: [
		{
			format: 'umd',
			file: 'dist/bfs.js',
			name: 'BFS',
			exports: 'default',
		},
		{
			format: 'es',
			file: 'dist/bfs.esm.js',
		},
	],
};

export default rollupConfig;