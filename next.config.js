/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['img.otruyenapi.com', 'your-bucket-name.r2.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.otruyenapi.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'your-bucket-name.r2.dev',
        pathname: '**',
      },
    ],
  },
  // Cấu hình Cloudflare R2
  env: {
    CLOUDFLARE_R2_ACCOUNT_ID: '04725e5acc15b760fb22bf197ff9799f',
    CLOUDFLARE_R2_BUCKET_NAME: 'your-bucket-name',
  },
};

module.exports = nextConfig; 