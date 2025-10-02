import nextra from 'nextra'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
  outputFileTracingRoot: __dirname,
  typescript: {
    ignoreBuildErrors: true,
  },
}) 