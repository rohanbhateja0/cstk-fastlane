import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
// import { useSession, signIn, signOut } from 'next-auth/react' // Only needed for Azure AD

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/logo_light.png" alt="FastLane" style={{ height: 32, marginRight: 8 }} />
      <strong>FastLane Documentation</strong>
    </div>
  ),
  project: {
    link: 'https://github.com/altudo-dev/xmc-fast-lane',
  },
  /* chat: {
    link: 'https://discord.gg/sitecore', // Replace with your Discord
  }, */
  docsRepositoryBase: 'https://github.com/altudo-dev/xmc-fast-lane/tree/develop/docs',
  footer: {
    content: 'Built with ❤️ by Altudo for Sitecore XM Cloud',
  },
    navbar: {
    extraContent: () => {
      // Simple message - password protection handled by Vercel
      return (
        <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
          🔒 Protected by Vercel
        </div>
      )
    },
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  search: {
    placeholder: 'Search documentation...',
  },
  editLink: {
    content: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  toc: {
    backToTop: true,
  },
  gitTimestamp: ({ timestamp }) => (
    <div style={{ fontSize: '12px', color: '#999' }}>
      Last updated on {timestamp.toLocaleDateString()}
    </div>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="FastLane Documentation" />
      <meta property="og:description" content="Component and template library documentation for Sitecore XM Cloud" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  // Note: primaryHue and primarySaturation removed - theming API changed in Nextra 3.x
}

export default config 