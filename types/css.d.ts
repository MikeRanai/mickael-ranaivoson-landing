// Ambient declaration so TypeScript accepts side-effect CSS imports
// (e.g. `import "./globals.css"`). Next/Turbopack handle the actual
// bundling — this only silences the editor's TS2882 diagnostic.
declare module "*.css";
