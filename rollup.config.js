import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

import meta from './package.json';

const config = [];

if (process.env.build === 'esm') {
  config.push({
    input: './index.ts',
    output: {
      file: './dist/esm/index.mjs',
      format: 'esm'
    },
    plugins: [
      alias({
        entries: [
          { find: './src/nodejs_stream', replacement: './src/whatwg_stream' }
        ]
      }),
      typescript({
        module: 'ESNext',
        newLine: 'lf',
        strict: true,
        target: 'ESNext'
      })
    ]
  });
}

if (process.env.build === 'umd') {
  const banner = [
    '/*!',
    ' * @license ltsv.js Copyright(c) 2013 sasa+1',
    ' * https://github.com/sasaplus1/ltsv.js',
    ' * Released under the MIT license.',
    ' */'
  ].join('\n');

  config.push(
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/umd/${meta.name}.js`,
        format: 'umd',
        name: meta.name,
        sourcemap: true
      },
      plugins: [
        alias({
          entries: [
            { find: './src/nodejs_stream', replacement: './src/whatwg_stream' }
          ]
        }),
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ES5'
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        // NOTE: add header with terser
        // banner,
        file: `./dist/umd/${meta.name}.min.js`,
        format: 'umd',
        name: meta.name,
        sourcemap: true
      },
      plugins: [
        alias({
          entries: [
            { find: './src/nodejs_stream', replacement: './src/whatwg_stream' }
          ]
        }),
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ES5'
        }),
        terser({
          output: {
            preamble: banner
          }
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/umd/${meta.name}.legacy.js`,
        format: 'umd',
        name: meta.name,
        sourcemap: true
      },
      plugins: [
        alias({
          entries: [
            { find: './src/nodejs_stream', replacement: './src/whatwg_stream' }
          ]
        }),
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ES5'
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        // NOTE: add header with terser
        // banner,
        file: `./dist/umd/${meta.name}.legacy.min.js`,
        format: 'umd',
        name: meta.name,
        sourcemap: true
      },
      plugins: [
        alias({
          entries: [
            { find: './src/nodejs_stream', replacement: './src/whatwg_stream' }
          ]
        }),
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ES5'
        }),
        terser({
          output: {
            preamble: banner
          }
        })
      ]
    }
  );
}

export default config;
