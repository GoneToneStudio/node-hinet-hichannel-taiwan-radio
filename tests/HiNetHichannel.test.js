/*
 * Copyright (c) 2014-2021 旋風之音 GoneTone
 *
 * Website: https://blog.reh.tw/
 * GitHub: https://github.com/GoneTone
 * Facebook: https://www.facebook.com/GoneToneDY
 * Twitter: https://twitter.com/TPGoneTone
 *
 *                               _oo0oo_
 *                              o8888888o
 *                              88" . "88
 *                              (| -_- |)
 *                              0\  =  /0
 *                            ___/`---'\___
 *                          .' \\|     |# '.
 *                         / \\|||  :  |||# \
 *                        / _||||| -:- |||||- \
 *                       |   | \\\  -  #/ |   |
 *                       | \_|  ''\---/''  |_/ |
 *                       \  .-\__  '-'  ___/-. /
 *                     ___'. .'  /--.--\  `. .'___
 *                  ."" '<  `.___\_<|>_/___.' >' "".
 *                 | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *                 \  \ `_.   \_ __\ /__ _/   .-` /  /
 *             =====`-.____`.___ \_____/___.-`___.-'=====
 *                               `=---='
 *           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *               佛祖保佑                       永無 BUG
 *
 * Project GitHub: https://github.com/GoneToneStudio/node-google-play-api
 */

'use strict'

require('dotenv').config()

const { HiNetHichannel, Proxy } = require('..')

let hichannel
test('Init', () => {
  const proxy = new Proxy('gonetone.reh.tw', 3128, 'http')
  proxy.login(process.env.PROXY_TEST_USERNAME, process.env.PROXY_TEST_PASSWORD)

  hichannel = new HiNetHichannel(proxy)
})

test('Get All Channels', async () => {
  const channels = await hichannel.getChannels()
  expect(Array.isArray(channels)).toBe(true)
}, 150000)

test('Get Specified Channel Data', async () => {
  const channel = await hichannel.getChannel('KISS RADIO 大眾廣播電台')
  expect(channel && typeof channel === 'object').toBe(true)
}, 150000)

test('Set Channel', () => {
  hichannel.setChannel('KISS RADIO 大眾廣播電台')
})

test('Get Channel m3u8 Url', async () => {
  const m3u8Url = await hichannel.getChannelM3u8Url()
  expect(m3u8Url).toMatch(/https?:\/\/(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])\/live\/[a-zA-Z0-9]+\/chunklist\.m3u8\?token=(.*)&expires=(.*)/i)
}, 150000)

test('Get Channel Program Info', async () => {
  const programInfo = await hichannel.getChannelProgramInfo()
  expect(programInfo && typeof programInfo === 'object').toBe(true)
}, 150000)
