import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

module.exports = {
    input: 'src/index.js',
    external: ['react', 'react-dom', 'prop-types'],
    output: [
        {
            file: 'dist/react-shadow.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        {
            file: 'dist/react-shadow.esm.js',
            format: 'esm',
            sourcemap: true,
            exports: 'named',
        },
    ],
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        commonjs({
            namedExports: {
                include: 'node_modules/**',
                'node_modules/react/index.js': [
                    'cloneElement',
                    'createContext',
                    'Component',
                    'createElement',
                    'useRef',
                    'useState',
                    'useCallback',
                    'useContext',
                    'useEffect',
                ],
                'node_modules/react-is/index.js': [
                    'isElement',
                    'isValidElementType',
                    'ForwardRef',
                ],
                'node_modules/styled-components/dist/styled-components.esm.js': [
                    'createContext',
                ],
                'node_modules/humps/humps.js': ['decamelize'],
            },
        }),
        terser(),
    ],
};
