// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackLib = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
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
    }
    return config;
  },
};

module.exports = nextConfig;
