const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdn.jsdelivr.net"],
    unoptimized: true,
  },
  i18n,
};

module.exports = nextConfig;
