import cleanup from 'rollup-plugin-cleanup'
import prettier from 'rollup-plugin-prettier'
import autoExternal from 'rollup-plugin-auto-external'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/es/index.js',
      format: 'es'
    }
  ],
  plugins: [
    cleanup({
      comments: 'none',
      maxEmptyLines: 1
    }),
    prettier({
      printWidth: 100,
      singleQuote: true
    }),
    autoExternal(),
    filesize()
  ]
}
