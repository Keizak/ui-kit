const alias = require('rollup-plugin-alias');
const { visualizer } = require('rollup-plugin-visualizer');

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

module.exports = {
  rollup(config) {
    config.output = {
      dir: 'dist',
      format: 'esm',
      preserveModules: false,
      sourcemap: false,
      tsconfig: 'tsconfig.json',
      minify: true,
      writeMeta: false,
      transpileOnly: true,
    };
    config.plugins.push(
      visualizer({
        filename: 'stats.html',
      })
    );
    config.plugins.push(
      alias({
        resolve: extensions,
        entries: [
          { find: 'react', replacement: './node_modules/react' },
          { find: 'react-dom', replacement: './node_modules/react-dom' },
        ],
      })
    );

    return config;
  },
};
