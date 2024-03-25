/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites(){
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/v1/:path*'
      },
      {
        source: '/ajax/:path*',
        destination: 'http://localhost:3001/:path*'
      },
    ]
  }
};

export default nextConfig;