/* eslint-disable @typescript-eslint/no-var-requires */

// @fairdatasociety/fdp-storage assigns to globalThis.crypto at module load time.
// In Node 20+, globalThis.crypto is a read-only getter; make it writable first.
// Temporary shim until fairdrive-theapp migrates off fdp-storage (see #593/#602).
if (typeof globalThis.crypto !== 'undefined') {
  try {
    Object.defineProperty(globalThis, 'crypto', {
      value: globalThis.crypto,
      writable: true,
      configurable: true,
    });
  } catch (e) {}
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  compress: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [''],
  },
});
