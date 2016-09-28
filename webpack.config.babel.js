import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import autoprefixer from 'autoprefixer';

import * as CONFIG from './client/config/_config';
const projectName = require('./package').name;
const DEBUG = !process.argv.includes('--release');


if (!DEBUG) {
   console.log('PREPARING FOR PRODUCTION.');
}

let ExtractSass = new ExtractTextPlugin("stylesheets/[name].css", {
  publicPath: CONFIG.DIR_DIST,
  allChunks: false
});

let webpackConfig = {
  name: projectName,
  bail: true,
  debug: DEBUG,
  devtool: DEBUG ? 'source-map' : 'none',
  target: 'web',
  context: CONFIG.DIR_SRC,
  entry: {
    ['dashboard']: [`./dashboard`],
    ['portal']: [`./portal`],
  },
  output: {
    filename: 'javascripts/[name].js',
    path: CONFIG.DIR_DIST,    // absolute - determines output dir
    sourceMapFilename: "javascripts/[name].js.map"
  },
  // When you want to import a global API into the bundle
  externals: {
  },
  module: {
    // Pre-process files as they are loaded by "import" statements.
    // Similar to a gulp task.
    // Chains are applied right to left,
    // Can accept options by query params or by object syntax below,
    // see "loader options"
    preLoaders: [
      {
        test: /client\/src\/\.(js)$/,
        loader: "eslint"
      }
    ],
    loaders: [
      {
        test: /\.(js)$/,
        loaders: ['babel'],
        exclude: [
          CONFIG.DIR_NPM,
          CONFIG.DIR_TEST
        ],
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractSass.extract('style', `css?${DEBUG ? 'sourceMap': ''}!postcss!resolve-url!sass?sourceMap`)
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: "url?limit=10000&name=/images/[name].[ext]"
      },
      // {  // todo - enable if we have fonts - must prefix regex with fonts/ and images with images/
      //   test: /\.(eot|ttf|woff|svg|woff2)$/,
      //   loader: "url?limit=10000&name=fonts/[name].[ext]"
      // }
    ]
  },
  // Add functionality typically related to bundles in webpack
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? 'production' : JSON.stringify(CONFIG.ENV),
      __DEV__: DEBUG
    }),
    new BellOnBundlerErrorPlugin(),
    ExtractSass
  ],
  // Options affecting the resolving of modules
  resolve: {
    extensions : ['', '.js', '.scss'],
  },
  node: {
    fs: 'empty'
  },


  //
  // loader options
  //

  postcss : [
    autoprefixer()
  ],
  sassLoader: {
    precision: 8,
    includePaths: [
      CONFIG.DIR_SRC,
      CONFIG.DIR_NPM
    ],
    sourceMap: DEBUG,
    lineNumbers: DEBUG,
    bundleExec: true,
    data: `$env:  ${CONFIG.ENV === 'production' ? 'production' : 'development'};`
  }
};

if (!DEBUG) {
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}


export default webpackConfig;
