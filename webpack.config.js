const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        HiNetHichannel: './src/HiNetHichannel.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: '[name]'
    }
};
