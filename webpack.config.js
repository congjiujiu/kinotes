module.exports = {
  // other options...
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        // edit this for additional asset file types
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'url?limit=5000&hash=sha512&digest=hex&name=[name].[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
    ],
  },
  // vue-loader configurations
  vue: {
    // ... other vue options
    loaders: {
      scss: 'style!css!sass',
    },
  },
};
