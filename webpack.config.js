const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const packageJson = require('./package.json');

const date = new Date();
const copyrightYear = (date.getFullYear() !== 2020) ? `2020-${date.getFullYear()}` : date.getFullYear();

const banner = `Copyright ${copyrightYear} GoneTone

HiNet hichannel 台灣電台 v${packageJson.version}
https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio

@author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
@license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>`;

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
    },
    plugins: [
        new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false
                }
            },
            extractComments: false
        }),
        new webpack.BannerPlugin({
            banner: banner
        })
    ]
};
