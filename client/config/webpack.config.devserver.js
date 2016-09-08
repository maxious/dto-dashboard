import webpack from 'webpack';
import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import autoprefixer from 'autoprefixer';
import sassLintPlugin from 'sasslint-webpack-plugin';

import * as CONFIG from './_config';
const projectName = require('./../../package').name;


let webpackConfig = {
	name: projectName,
	bail: true,
	debug: true,
	devtool: 'eval',        // or 'eval', or ...
	context: CONFIG.DIR_SRC,
    entry: {
      ['dashboard']: [`./dashboard`],
    },
	output: {
	  path: CONFIG.DIR_DIST,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
	  filename: 'javascripts/[name].js',       // relative     - determines output file
      // In development, we always serve from the root. This makes config easier.
      publicPath:  `/`,     // Web root. publicPath + filename must equal resource path in dev server
      // publicPath:  `http://${CONFIG.HOST}:${CONFIG.PORT}/` could be this
      sourceMapFilename: "javascripts/[name].js.map"
	},
  externals: {
  },
	module: {
		preLoaders: [
      {
        test: /client\/src\/\.(js)$/,
        loader: "eslint"
      }
		],
		loaders: [
			{
				test: /\.(js|json)$/,
				loaders: ['babel'],
				exclude: /node_modules/
			},
			{
        test: /\.(scss)$/,
				loader: 'style!css?&sourceMap!postcss!resolve-url!sass?sourceMap'
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/,
				loader: "file?name=images/[name].[ext]"
			},
      // {  // todo - enable if we have fonts - must prefix regex with fonts/ and images with images/
      //   test: /\.(eot|ttf|woff|svg|woff2)$/,
      //   loader: "url?limit=10000&name=fonts/[name].[ext]"
      // }
		]
	},
	plugins: [
    // new sassLintPlugin({ // todo
    //   config: './../.sass-lint.yml'
    // }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(CONFIG.ENV),
          __DEV__: true
		}),
		new BellOnBundlerErrorPlugin()
	],
	resolve: {
		extensions : ['', '.js', '.scss']
	},
	node: {
		fs: 'empty'
	},

  postcss : [
    autoprefixer()
  ],
	sassLoader: {
		precision: 8,
		includePaths: [
			CONFIG.DIR_SRC,
			CONFIG.DIR_NPM
		],
		sourceMap: true,
		lineNumbers: true,
		bundleExec: true,
		data: `$env:  ${CONFIG.ENV === 'production' ? 'production' : 'development'};`
	}
};

export default webpackConfig;
