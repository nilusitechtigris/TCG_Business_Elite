import type { NextConfig } from 'next';

// Note: vinext does not implement Next's `headers()`, and `public/_headers`
// only applies to static assets, not to Worker-rendered HTML. Security headers
// for documents are set with a Cloudflare Response Header Transform Rule.
const nextConfig: NextConfig = {};

export default nextConfig;
