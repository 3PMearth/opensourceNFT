/** @type {import('next').NextConfig} */
/*
const nextConfig = {
  reactStrictMode: true,
  
}

module.exports = nextConfig
*/


module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      crypto: false,
      fs: false,
      path: false,
      http: false,
      https: false,
      stream: false,
      os: false,
      constants: false,
      path: false,
      tty: false,
      zlib: false,
    };

    return config;
  },

};
/*
module.exports = {
  entry: './webpack.js',
  output: {
      filename: 'caver.min.js',
      path: `${__dirname}/dist`,
  },
  resolve: {
      fallback: {
          fs: false,
          net: false,
          stream: require.resolve('stream-browserify'),
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify/browser'),
      },
  },
}
*/