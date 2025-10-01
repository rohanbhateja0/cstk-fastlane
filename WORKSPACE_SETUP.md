# Contentstack Fast Lane Workspace Setup

This repository contains both the main Contentstack Fast Lane website and its documentation in a single codebase.

## Project Structure

```
contentstack-fast-lane/
├── app/                    # Main Next.js application
├── components/             # Main app components
├── docs/                   # Documentation (Nextra)
├── scripts/                # Build scripts
├── package.json            # Main project dependencies
└── vercel.json             # Vercel configuration
```

## Available Commands

### Main Project (Contentstack Fast Lane Website)
```bash
# Development
npm run dev                 # Start main app on port 3000

# Production
npm run build              # Build main app
npm run start              # Start built main app

# Linting
npm run lint               # Lint main app
```

### Documentation Project
```bash
# Development
npm run dev:docs           # Start docs on port 3001

# Production
npm run build:docs         # Build docs (isolated)
npm run start:docs         # Start built docs

# Combined
npm run build:all          # Build both projects
```

## Build Isolation

The workspace is configured to prevent build conflicts between the main project and docs:

1. **Separate Dependencies**: Each project has its own `node_modules` and `package.json`
2. **Isolated Build Process**: The docs build runs in an isolated environment
3. **TypeScript Exclusion**: Main project excludes docs folder from compilation
4. **Separate Vercel Deployments**: Each project can be deployed independently

## Deployment

### Main Project
- Deploy from root directory
- Uses `vercel.json` configuration
- Build command: `npm run build`

### Documentation
- Deploy from `docs/` directory
- Uses `docs/vercel.json` configuration
- Build command: `npm run build`

## Development Workflow

1. **Start both projects**:
   ```bash
   # Terminal 1 - Main app
   npm run dev
   
   # Terminal 2 - Docs
   npm run dev:docs
   ```

2. **Build both projects**:
   ```bash
   npm run build:all
   ```

3. **Deploy individually**:
   - Main app: Deploy from root
   - Docs: Deploy from `docs/` folder

## Troubleshooting

### Build Conflicts
If you encounter build conflicts:
1. Ensure each project has its own `node_modules`
2. Run `npm run build:docs` for isolated docs build
3. Check that `tsconfig.json` excludes docs folder

### Windows ESM Issues
The docs build may show ESM loader warnings on Windows. These are non-blocking and don't affect the build success.

## File Structure Notes

- `scripts/build-docs.js`: Isolated build script for docs
- `package-workspace.json`: Workspace configuration (reference only)
- `docs/`: Complete Nextra documentation project
- Main project excludes `docs/` from TypeScript compilation
