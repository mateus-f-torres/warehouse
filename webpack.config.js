/* eslint import/newline-after-import: 'off' */
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {SourceMapDevToolPlugin} = require('webpack')

const cleanUpPlugin = new CleanWebpackPlugin()

const analyzerPlugin = new BundleAnalyzerPlugin({
  openAnalyzer: false,
  analyzerMode: 'static',
  generateStatsFile: true,
  reportFilename: '../reports/report.html',
  statsFilename: '../reports/stats.json',
})

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'src/index.html',
})

const copyPlugin = new CopyPlugin([
  {from: 'src/assets/fonts', to: 'fonts/'},
  {from: 'src/assets/logo', to: 'logo/'},
])

const sourceMapsPlugin = new SourceMapDevToolPlugin({
  filename: 'sourcemaps/[file].map',
  exclude: [/runtime\.*\.*/, /vendors\.*\.*/],
})

const terser = new TerserPlugin({
  sourceMap: true,
})

// TODO: brotli compression
const gzipPlugin = new CompressionPlugin({
  test: /.(js|css|html|svg)$/,
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  threshold: 0,
  minRatio: 0.8,
})

const DEFAULT_PORT = 8080
const DEFAULT_PATH = '/'

let configs = {
  target: 'web',
  mode: 'development',
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [cleanUpPlugin, htmlPlugin, copyPlugin],
  devServer: {
    hot: true,
    compress: true,
    port: DEFAULT_PORT,
    publicPath: DEFAULT_PATH,
    historyApiFallback: true,
    proxy: {
      '/api': {target: 'http://localhost:3000'},
    },
  },
  stats: {
    assets: true,
    modules: false,
    children: false,
    entrypoints: false,
  },
}

if (process.env.NODE_ENV === 'production') {
  configs = Object.assign({}, configs, {
    mode: 'production',
    devtool: false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
    },
    performance: {
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.gz')
      },
    },
    optimization: {
      minimize: true,
      minimizer: [terser],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true,
            name: 'vendors',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                compact: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|svg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5 * 1024,
                fallback: 'file-loader',
                name: '[name].[ext]',
                outputPath: 'images/',
              },
            },
            'image-webpack-loader',
          ],
        },
      ],
    },
    plugins: [
      sourceMapsPlugin,
      analyzerPlugin,
      cleanUpPlugin,
      gzipPlugin,
      htmlPlugin,
      copyPlugin,
    ],
    stats: {
      assets: true,
      modules: false,
      children: false,
      entrypoints: false,
    },
  })
}

module.exports = configs
