import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import prettier from 'rollup-plugin-prettier'
import filesize from 'rollup-plugin-filesize'

const config = (target) => {
  const folder = target

  return {
    input: 'src/index.js',
    output: [
      {
        file: `dist/${folder}/cjs/index.js`,
        format: 'cjs'
      },
      {
        file: `dist/${folder}/es/index.js`,
        format: 'es'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false
      }),
      cleanup({
        comments: 'none',
        maxEmptyLines: 1
      }),
      prettier({
        printWidth: 100,
        singleQuote: true
      }),
      filesize()
    ],
    external: ['dot-prop-wild', 'is-number']
  }
}

export default [
  config('node'),
  config('browser')
]
