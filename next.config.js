/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/csv-converter" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
