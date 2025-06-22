[13:12:01.127] Running build in Washington, D.C., USA (East) – iad1
[13:12:01.128] Build machine configuration: 4 cores, 8 GB
[13:12:01.144] Cloning github.com/Lannom13/SteerPulse-Dashboard (Branch: main, Commit: 3d3e80f)
[13:12:01.394] Cloning completed: 250.000ms
[13:12:01.574] Restored build cache from previous deployment (9SuLjM4ivCfXmNxW9RGhZKb24Ugb)
[13:12:02.046] Running "vercel build"
[13:12:02.505] Vercel CLI 43.3.0
[13:12:03.051] Installing dependencies...
[13:12:04.345] 
[13:12:04.345] up to date in 1s
[13:12:04.345] 
[13:12:04.345] 133 packages are looking for funding
[13:12:04.345]   run `npm fund` for details
[13:12:04.494] 
[13:12:04.494] > steerpulse-dashboard@0.0.1 build
[13:12:04.494] > vite build
[13:12:04.494] 
[13:12:04.837] [33mThe CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.[39m
[13:12:04.884] [36mvite v5.4.19 [32mbuilding for production...[36m[39m
[13:12:05.230] transforming...
[13:12:05.877] [32m✓[39m 47 modules transformed.
[13:12:05.879] [31mx[39m Build failed in 679ms
[13:12:05.879] [31merror during build:
[13:12:05.879] [31mCould not resolve "../components/AnimatedPage" from "src/pages/Budgeting/BudgetSpreadsheet.jsx"[31m
[13:12:05.879] file: [36m/vercel/path0/src/pages/Budgeting/BudgetSpreadsheet.jsx[31m
[13:12:05.879]     at getRollupError (file:///vercel/path0/node_modules/rollup/dist/es/shared/parseAst.js:401:41)
[13:12:05.879]     at error (file:///vercel/path0/node_modules/rollup/dist/es/shared/parseAst.js:397:42)
[13:12:05.879]     at ModuleLoader.handleInvalidResolvedId (file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21423:24)
[13:12:05.880]     at file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21383:26[39m
[13:12:05.915] Error: Command "npm run build" exited with 1
[13:12:06.102] 
[13:12:08.826] Exiting build container
