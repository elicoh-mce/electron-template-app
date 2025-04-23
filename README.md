# Electron TypeScript React Project

This project is a modern Electron application built with TypeScript and React, featuring fast development reload capabilities and optimized production builds.

## Project Structure

```
electron-builder-example2/
├── src/
│   ├── main/          # Main process code
│   └── renderer/      # Renderer process code (React)
├── public/            # Static assets
├── webpack-config/    # Webpack configuration files
└── build/            # Build output directory
```

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- Yarn (recommended by Electron for better dependency management)

### Installation

1. Clone the repository
2. Install dependencies using Yarn (recommended by Electron):
```bash
yarn install
```

### Development Mode

To start the application in development mode with fast reload:

```bash
yarn dev
```

This will:
- Start the main process
- Launch the renderer process with hot module replacement (HMR)
- Enable fast reload for both main and renderer processes

### Testing Fast Reload

1. **Renderer Process Changes**:
   - Open `src/renderer/renderer.tsx`
   - Make changes to the React components
   - Changes should appear instantly without a full reload

2. **Main Process Changes**:
   - Open `src/main/main.js`
   - Make changes to the main process code
   - The application will automatically restart with your changes

## Webpack Configuration

The project uses separate webpack configurations for development and production:

### Development Configuration (`webpack.renderer.dev.config.js`)

- Enables React Fast Refresh
- Uses TypeScript with `transpileOnly: true` for faster builds
- Configures hot module replacement
- Sets up development server on port 3000

### Production Configuration (`webpack.renderer.prod.config.js`)

- Optimizes the build for production
- Disables development features
- Generates minified output

### Main Process Configuration (`webpack.main.config.js`)

- Handles the Electron main process
- Copies static assets from public directory
- Configures TypeScript compilation

## Building for Production

To create a production build:

```bash
yarn build
```

This will:
- Compile TypeScript files
- Bundle the application
- Generate optimized production assets

## Creating Installers

The project uses electron-builder to create installers for different platforms.

### Windows Installer

To create a Windows installer:

```bash
yarn dist
```

This will generate:
- `.exe` installer in the `dist` directory
- Portable version of the application

### macOS Installer

To create a macOS installer:

```bash
yarn dist
```

This will generate:
- `.dmg` installer in the `dist` directory
- `.app` bundle for direct installation

### Directory Builds

To create a directory build without packaging:

```bash
yarn dist:dir
```

This will create an unpacked version of the application in the `dist` directory.

Note: Building for macOS requires a Mac computer with Xcode installed. Cross-platform builds are not supported.

## TypeScript Configuration

The project uses TypeScript with the following features:
- Strict type checking
- React JSX support
- Path aliases for cleaner imports
- Source map generation for debugging

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 