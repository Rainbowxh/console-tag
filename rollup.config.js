

const pkg = require('./package.json')
const typescript = require('@rollup/plugin-typescript')
const resolve = require("@rollup/plugin-node-resolve")
const {terser} = require("rollup-plugin-terser")

module.exports =  {
	input: './src/index.ts',
	output: [{
		file: pkg.main,
		format: 'es'
	}],
    plugins: [
		typescript(), // 
		resolve(), // deal resolve
		// terser()
	]
};