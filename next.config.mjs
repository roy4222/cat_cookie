/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 設置 CSS 切分為「嚴格」模式，確保 CSS 解析順序正確
    cssChunking: 'strict'
  }
};

export default nextConfig; 