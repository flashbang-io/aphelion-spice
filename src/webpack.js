var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var cp = require('child_process');
// var uid = require('uid');
// var rimraf = require('rimraf');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = function(options, callback)
{
  var config = {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: [['transform-react-jsx', {
              'pragma': 'createElement'
            }]]
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.txt$/,
          exclude: /node_modules/,
          loader: 'file-loader'
        }
      ]
    },
    resolveLoader: {
      alias: {
        "file-loader": path.join(__dirname, "loaders/file-loader")
      }
    },
    // devtool: 'sourcemap',
    plugins: [
      // new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
      new webpack.DefinePlugin({
        ROOT_URL: '\'' + options.publicurl + '\''
      })
    ]
  };
  if (options.context == 'build') {
    config.entry = path.join(__dirname, 'entries/build.js');
    config.output = {
      filename: '__build.js',
      path: options.publicdir
    };
    config.resolve = {
      alias: {
        'spice$': path.join(__dirname, 'bindings/build.js'),
        'spice-view$': options.entry
      }
    };
  }
  if (options.context == 'server') {
    config.entry = path.join(__dirname, 'entries/server.js');
    config.output = {
      filename: path.basename(options.outfile),
      path: path.dirname(options.outfile),
      libraryTarget: 'commonjs2'
    };
    config.resolve = {
      alias: {
        'spice$': path.join(__dirname, 'bindings/server.js'),
        'spice-view$': options.entry,
        'spice-build$': path.join(options.publicdir, '__manifest.js')
      }
    };
  }
  if (options.context == 'build' || options.context == 'server') {
    config.target = 'node';
    config.node =  {
      __dirname: false,
      __filename: false
    };
    config.externals = nodeModules;
  }
  webpack(config, function(err, stats) {
    callback();
  });
};

/*
rimraf.sync('./bin/*');

// server
  webpack(Object.assign({}, sharedConfig, {
    entry: path.join(__dirname, '/src/spice/server.js'),
    output: {
      filename: 'server-bundle.js',
      path: 'bin'
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: Object.assign({}, nodeModules, {
      'build-config': 'commonjs ./build-config.js'
    }),
    resolve: {
      alias: {
        make: path.resolve('./src/spice/server-make'),
        build: path.resolve('./bin/public/__public.json')
      }
    }
  }), callback);

// client
  webpack(Object.assign({}, sharedConfig, {
    entry: path.join(__dirname, '/src/spice/client.js'),
    output: {
      filename: 'client-bundle.js',
      path: 'bin/public'
    },
    resolve: {
      alias: {
        make: path.resolve('./src/spice/client-make'),
        build: path.resolve('./bin/public/__public.json')
      }
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: [['transform-react-jsx', {
              'pragma': 'createElement'
            }]]
          }
        },
        {
          test: /\.(png|jpg|gif|eot|woff|woff2|svg|ttf)(\?.*)?$/,
          exclude: /node_modules/,
          loader: 'client-image-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
  }), callback);

// deploy
  webpack(Object.assign({}, sharedConfig, {
    entry: path.join(__dirname, '/src/spice/deploy.js'),
    output: {
      filename: 'deploy-bundle.js',
      path: 'bin'
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: Object.assign({}, nodeModules, {
      'build-config': 'commonjs ./build-config.js'
    }),
    resolve: {
      alias: {
        make: path.resolve('./src/spice/deploy-make'),
        build: path.resolve('./bin/public/__public.json')
      }
    }
  }), callback);
});
*/
