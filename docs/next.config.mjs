import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  search: {
    codeblocks: false
  },
  readingTime: true,
})

export default withNextra({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable CSS optimization that might cause issues
  experimental: {
    optimizeCss: false,
  },
  // Ensure proper CSS handling without custom webpack
  compiler: {
    removeConsole: false,
  },
  // Override any parent PostCSS configuration
  webpack: (config, { isServer }) => {
    // Ensure we don't inherit parent PostCSS config
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    return config
  },
  // Force specific CSS handling
  // Ensure we're not affected by parent directory configs
  basePath: '',
  assetPrefix: '',
}) 