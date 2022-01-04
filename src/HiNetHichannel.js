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

// eslint-disable-next-line
const Proxy = require('./Proxy')

const axios = require('axios')
const HttpsProxyAgent = require('https-proxy-agent')
const m3u8Parser = require('m3u8-parser')

class HiNetHichannel {
  /**
   * HiNetHichannel constructor.
   *
   * @param {Proxy|null} proxy 代理伺服器 (預設不使用代理)
   */
  constructor (proxy = null) {
    this._hichannelUrl = 'https://hichannel.hinet.net'

    this._hichannelRadioPath = '/radio/'
    this._hichannelImagePath = '/upload/radio/channel/'

    this._hichannelApiChannelList = 'channelList.do'
    this._hichannelApiRanking = 'getRanking.do'
    this._hichannelApiPlayerUrl = 'cp.do'
    this._hichannelApiProgramList = 'getProgramList.do'
    this._hichannelApiNowProgram = 'getNowProgram.do'

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    this._axiosInstance = axios.create({
      baseURL: this._hichannelUrl,
      headers: {
        'User-Agent': userAgent,
        Referer: `${this._hichannelUrl}${this._hichannelRadioPath}index.do`
      }
    })

    if (proxy) {
      this._axiosInstance.defaults.httpsAgent = new HttpsProxyAgent(proxy.get())
    }

    this._hichannelChannelName = ''
  }

  /**
   * 取得所有電台頻道
   *
   * @returns {Promise<[]>}
   */
  async getChannels () {
    try {
      const response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiChannelList}`)
      return response.data.list
    } catch (e) {
      throw Error(`取得所有 Hichannel 電台頻道時發生錯誤：${e.message}`)
    }
  }

  /**
   * 取得熱門排行電台頻道
   *
   * @returns {Promise<[]>}
   */
  async getRankingChannels () {
    try {
      const response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiRanking}`)
      return response.data.list
    } catch (e) {
      throw Error(`取得 Hichannel 熱門排行電台頻道時發生錯誤：${e.message}`)
    }
  }

  /**
   * 取得指定電台頻道資料
   *
   * @param {String} hichannelChannelName Hichannel 電台頻道名稱
   *
   * @returns {Promise<{id: String, title: String, imageUrl: String, programName: String, isChannel: Boolean, radioType: String}>}
   */
  async getChannel (hichannelChannelName) {
    try {
      const response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiChannelList}`, {
        params: {
          keyword: hichannelChannelName
        }
      })

      const channels = response.data.list
      const channel = channels.find(channel => channel.channel_title === hichannelChannelName)

      if (channel) {
        return {
          id: channel.channel_id,
          title: channel.channel_title,
          imageUrl: `${this._hichannelUrl}${this._hichannelImagePath}${channel.channel_image}`,
          programName: channel.program_name,
          isChannel: channel.isChannel,
          radioType: channel.radio_type
        }
      }
    } catch (e) {
      throw Error(`取得 Hichannel 電台頻道「${hichannelChannelName}」時發生錯誤：${e.message}`)
    }

    throw Error(`Hichannel 電台頻道名稱「${hichannelChannelName}」未找到。`)
  }

  /**
   * 設定電台頻道
   *
   * @param {String} hichannelChannelName Hichannel 電台頻道名稱
   */
  setChannel (hichannelChannelName) {
    this._hichannelChannelName = hichannelChannelName
  }

  /**
   * 取得電台頻道 m3u8 串流網址
   *
   * @returns {Promise<string>}
   */
  async getChannelM3u8Url () {
    if (this._hichannelChannelName) {
      const channel = await this.getChannel(this._hichannelChannelName)

      try {
        const response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiPlayerUrl}`, {
          params: {
            id: channel.id
          }
        })

        const m3u8Url = response.data._adc
        const m3u8 = await this._axiosInstance.get(m3u8Url)

        const parseUrl = new URL(m3u8Url)
        const parserM3u8Url = new m3u8Parser.Parser()

        parserM3u8Url.push(m3u8.data)
        parserM3u8Url.end()

        return `${parseUrl.protocol}//${parseUrl.hostname}${parseUrl.pathname.replace('playlist.m3u8', parserM3u8Url.manifest.playlists[0].uri)}`
      } catch (e) {
        throw Error(`取得 Hichannel 電台頻道「${channel.title}」m3u8 網址時發生錯誤：${e.message}`)
      }
    }

    throw Error('未設定 Hichannel 電台頻道，請使用 "hichannel.setChannel(\'電台頻道名稱\')" 來設定頻道。')
  }

  /**
   * 取得電台頻道節目資訊
   *
   * @returns {Promise<{id: String, title: String, desc: String, area: String, type: String, imageUrl: String, isToday: Boolean, preDate: String, showDate: String, nextDate: String, nowProgramName: String, programList: []}>}
   */
  async getChannelProgramInfo () {
    if (this._hichannelChannelName) {
      const channel = await this.getChannel(this._hichannelChannelName)

      try {
        const programList = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiProgramList}`, {
          params: {
            channelId: channel.id
          }
        })

        const nowProgram = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiNowProgram}`, {
          params: {
            id: channel.id,
            program: 1
          }
        })

        return {
          id: channel.id,
          title: programList.data.channel_title,
          desc: programList.data.channel_desc,
          area: programList.data.channel_area,
          type: programList.data.channel_type,
          imageUrl: `${this._hichannelUrl}${this._hichannelImagePath}${programList.data.channel_image}`,
          isToday: programList.data.isToday,
          preDate: programList.data.preDate,
          showDate: programList.data.showDate,
          nextDate: programList.data.nextDate,
          nowProgramName: nowProgram.data.programName,
          programList: programList.data.list
        }
      } catch (e) {
        throw Error(`取得 Hichannel 電台頻道「${channel.title}」節目資訊時發生錯誤：${e.message}`)
      }
    }

    throw Error('未設定 Hichannel 電台頻道，請使用 "hichannel.setChannel(\'電台頻道名稱\')" 來設定頻道。')
  }
}

module.exports = HiNetHichannel
