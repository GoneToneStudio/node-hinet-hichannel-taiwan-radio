/**
 * Copyright 2020 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 */

'use strict';

const HiNetHichannel = require("./src/HiNetHichannel");
const Proxy = require("./src/Proxy");

Object.defineProperty(exports, "__esModule", {
    value: true
});

module.exports = {
    HiNetHichannel,
    Proxy
};

exports.default = HiNetHichannel;
