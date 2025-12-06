/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [],
  options: {
    /* Do not follow external modules */
    doNotFollow: {
      path: 'node_modules',
    },
    
    /* Include TypeScript files */
    includeOnly: '^src',
    
    /* TypeScript support */
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: './tsconfig.json',
    },
    
    /* Module resolution */
    moduleSystems: ['es6', 'cjs'],
    
    /* Enhanced resolve for Next.js */
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    
    /* Reporter options */
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
    },
  },
};
