// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackLib = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
  //   console.log(config.externals);
    if (!isServer) {
      config.plugins.push(
        // new webpackLib.ProvidePlugin({
        //     process: "process/browser",
        //     Buffer: ["buffer", "Buffer"],
        // }),
        new webpackLib.NormalModuleReplacementPlugin(/node:/, (resource) => {
            const mod = resource.request.replace(/^node:/, "");
            switch (mod) {
                case "buffer":
                    resource.request = "buffer";
                    break;
                case "stream":
                    resource.request = "stream";
                    break;
                default:
                    throw new Error(`Not found ${mod}`);
            }
        }),
    );
    // config.ignoreWarnings = [/Failed to parse source map/];
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
      // config.resolve.alias = {
      //   ...(config.resolve.alias || {}),
      //   'node:buffer': require.resolve('buffer/')
      // };
      // config.resolve.fallback = {
      //   ...(config.resolve.fallback || {}),
  //       'buffer': false,
  //       'Buffer': false,
  //       // 'node:buffer': false,
  //       // buffer: require.resolve('buffer/'),
  //       // Buffer: require.resolve('buffer/'),
        // 'node:buffer': require.resolve('buffer/'),
  //       // 'node:Buffer': require.resolve('buffer/')  
      // };

      // config.externals = [
      //   ...(config.externals || []),
  //       {
  //         // 'buffer': 'buffer',
  //         // 'stream': 'node:stream',
  //         // 'node:buffer': 'buffer',
  //         // 'node:stream': 'stream',
  //         // buffer: 'commonjs node:buffer',
  //         'node:buffer': 'buffer',
  //         // stream: 'commonjs node:stream',
  //         'node:stream': 'stream',
  //       }
  //       // 'utf-8-validate',
  //     ];
  //     // config.plugins = [
  //     //   ...(config.plugins || []),
  //     //   new webpackLib.ProvidePlugin({
  //     //     Buffer: ['buffer', 'Buffer', 'node:buffer'],
  //     //     'node:buffer': ['buffer', 'Buffer', 'node:buffer'],
  //     // }),
      // ];


    }
    return config;
  },
};

module.exports = nextConfig;
