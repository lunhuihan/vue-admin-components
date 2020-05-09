const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const utils = require('./utils')
process.env.NODE_ENV = 'production'

module.exports = merge(webpackBaseConfig, {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'vue-admin-components.min.js',
    library: 'vue-admin-components',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
  plugins: [
    function () {
      // 修改package.json中的版本号
      this.plugin('done', function () {
        const pkgPath = path.join(__dirname, '../package.json');
        let pkg = fs.readFileSync(pkgPath);
        pkg = JSON.parse(pkg);
        pkg.version = utils.createVersion(pkg.version);
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      })
    },
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
})
