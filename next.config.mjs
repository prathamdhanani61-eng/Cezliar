/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The contact page was removed; customers reach us on WhatsApp, Instagram or email.
    return [{ source: '/contact', destination: '/', permanent: true }];
  },
};

export default nextConfig;
