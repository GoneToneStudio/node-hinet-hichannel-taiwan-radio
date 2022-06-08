/*
 * Copyright (c) 2014-2022 旋風之音 GoneTone
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

import dotenv from 'dotenv'
import { HiNetHichannel, Proxy } from '../src'

dotenv.config()

describe('HiNetHichannel', () => {
  let hichannel: HiNetHichannel
  test('Init', () => {
    const proxy = new Proxy({
      host: 'gonetone.reh.tw',
      port: 3128,
      protocol: 'http'
    })
    proxy.login(process.env.PROXY_TEST_USERNAME as string, process.env.PROXY_TEST_PASSWORD as string)

    hichannel = new HiNetHichannel(proxy)
  })

  test('Get all channels, "length > 0" return "true"', async () => {
    const channels = await hichannel.getChannels()
    expect(channels.length > 0).toBe(true)
  })

  test('Get channels by keyword "警廣", "length > 0" return "true"', async () => {
    const channels = await hichannel.getChannels('警廣')
    expect(channels.length > 0).toBe(true)
  })

  test('Get ranking channels, "length > 0" return "true"', async () => {
    const channels = await hichannel.getRankingChannels()
    expect(channels.length > 0).toBe(true)
  })

  test('Get specified channel "KISS RADIO 大眾廣播電台" data "channel_title", return "KISS RADIO 大眾廣播電台"', async () => {
    const channel = await hichannel.getChannel('KISS RADIO 大眾廣播電台')
    expect(channel.channel_title).toBe('KISS RADIO 大眾廣播電台')
  })

  test('Set channel "KISS RADIO 大眾廣播電台"', () => {
    hichannel.setChannel('KISS RADIO 大眾廣播電台')
  })

  test('Get channel "KISS RADIO 大眾廣播電台" m3u8 url, return url match RegExp', async () => {
    const m3u8Url = await hichannel.getChannelM3u8Url()
    expect(m3u8Url).toMatch(/https?:\/\/(([a-zA-Z]|[a-zA-Z][a-zA-Z\d-]*[a-zA-Z\d])\.)*([A-Za-z]|[A-Za-z][A-Za-z\d-]*[A-Za-z\d])\/live\/[a-zA-Z\d]+\/playlist\.m3u8\?token=(.*)&expires=(.*)/i)
  })

  test('Get channel "KISS RADIO 大眾廣播電台" program info "channel_title", return "KISS RADIO 大眾廣播電台"', async () => {
    const programInfo = await hichannel.getChannelProgramInfo()
    expect(programInfo.channel_title).toBe('KISS RADIO 大眾廣播電台')
  })

  test('Get channel "KISS RADIO 大眾廣播電台" program info "channel_type", return "音樂"', async () => {
    const programInfo = await hichannel.getChannelProgramInfo()
    expect(programInfo.channel_type).toBe('音樂')
  })
})
