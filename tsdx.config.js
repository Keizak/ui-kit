const alias = require("rollup-plugin-alias");

const extensions = ['.js', '.ts', '.jsx', '.tsx'];


module.exports = {
    rollup(config, options) {
        config.output =  {
            dir: 'dist',
                format: 'esm',
                preserveModules: true,
                preserveModulesRoot: 'src',
                sourcemap: true,
        }
        config.plugins.push(
            alias({
                resolve: extensions,
                entries: [
                    {find: 'react', replacement: './node_modules/react'},
                    {find: 'react-dom', replacement: './node_modules/react-dom'},
                ]
            }),
        );
        return config;
    },
};