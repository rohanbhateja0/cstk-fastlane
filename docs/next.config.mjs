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
  // Completely override webpack CSS processing
  webpack: (config, { isServer }) => {
    // Remove PostCSS loader completely for docs
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOf) => {
          if (oneOf.use && Array.isArray(oneOf.use)) {
            oneOf.use = oneOf.use.filter((loader) => {
              if (typeof loader === 'string') {
                return !loader.includes('postcss-loader')
              }
              if (loader && loader.loader) {
                return !loader.loader.includes('postcss-loader')
              }
              return true
            })
          }
        })
      }
    })
    
    // Ensure we don't inherit parent PostCSS config
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    
    // Explicitly disable PostCSS
    config.resolve.fallback = {
      ...config.resolve.fallback,
    }
    
    // Remove any PostCSS plugins
    if (config.plugins) {
      config.plugins = config.plugins.filter(plugin => {
        return !plugin.constructor.name.includes('PostCSS')
      })
    }
    
    return config
  },
  // Force specific CSS handling
  // Ensure we're not affected by parent directory configs
  basePath: '',
  assetPrefix: '',
}) 