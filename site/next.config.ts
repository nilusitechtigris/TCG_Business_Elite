import type { NextConfig } from 'next';

// Note: vinext does not implement Next's `headers()`, and `public/_headers`
// only applies to static assets, not to Worker-rendered HTML. Security headers
// for documents are set with a Cloudflare Response Header Transform Rule.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tcgbusinesselite.com' }],
        destination: 'https://tcgbusinesselite.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://tcgbusinesselite.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
