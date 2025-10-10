/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/package-name" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
