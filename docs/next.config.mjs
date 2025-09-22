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
  // Next.js 15 config options
  // Removed deprecated experimental.appDir option
  // Removed NextAuth environment variables since using Vercel password protection
}) 