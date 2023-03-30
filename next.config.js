const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  pageExtensions: ["page.tsx", "api.ts"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

module.exports = nextConfig;
