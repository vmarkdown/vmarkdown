// import builtins from 'rollup-plugin-node-builtins';
// import globals from 'rollup-plugin-node-globals';
import virtual from 'rollup-plugin-virtual';
import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
// import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

export default {
    input: 'src/index.js',
    plugins: [
        // virtual({
        //     'path': 'export default 1',
        // }),
        // babel({
        //
        // })
        // uglify()
        // globals(),
        // builtins(),
        resolve(),

        commonjs({}),
        json(),
    ],
    output: {
        exports: 'default',
        file: './dist/vmarkdown.js',
        format: 'umd',
        name: 'vmarkdown',
        globals: {
            'path': 'path',
            'util': 'util'
        }
    }
};