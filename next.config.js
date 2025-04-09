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
  // Tối ưu webpack để chia nhỏ các bundle
  webpack: (config, { isServer }) => {
    // Giữ các chunk nhỏ hơn 25MB
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
      minSize: 20000,
      maxSize: 20 * 1024 * 1024, // 20MB
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          name: 'framework',
          test: /[\\/]node_modules[\\/](@vercel\/analytics|react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          chunks: 'all',
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
        shared: {
          name: 'shared',
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    };
    
    return config;
  },
};

module.exports = nextConfig; 