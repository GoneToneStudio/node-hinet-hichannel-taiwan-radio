const { HiNetHichannel } = require('..')
// const { HiNetHichannel, Proxy } = require('..')

/*
 * 連線到 Proxy 伺服器
 *
 * 如果運行此程式的伺服器不在台灣，請設定台灣的 Proxy 伺服器，否則取得的串流網址會驗證失敗 (HTTP 403 Forbidden)，
 * 但如果播放端 IP 和用來取得 m3u8 串流網址的伺服器 IP 不同一樣會被阻擋就是了，可以嘗試在伺服端處理好在串流給播放端，就二次串流。
 */
// const proxy = new Proxy('主機名', 3128, 'http')
// proxy.login('帳號', '密碼') // 如果 Proxy 伺服器需要驗證，請調用這登入

const hichannel = new HiNetHichannel()
// const hichannel = new HiNetHichannel(proxy) // Proxy

/* 取得所有電台頻道 */
hichannel.getChannels().then((channels) => {
  console.log('所有電台頻道：')
  console.log(channels)
})

/* 取得指定電台頻道資料 */
hichannel.getChannel('KISS RADIO 大眾廣播電台').then((channel) => { // 請輸入完整頻道名稱
  console.log('指定電台頻道資料：')
  console.log(channel)
})

/* 設定電台頻道 */
hichannel.setChannel('KISS RADIO 大眾廣播電台') // 請輸入完整頻道名稱

/* 取得電台頻道 m3u8 串流網址 */
hichannel.getChannelM3u8Url().then((m3u8Url) => {
  console.log(`電台頻道 m3u8 串流網址：${m3u8Url}`)
})

/* 取得電台頻道節目資訊 */
hichannel.getChannelProgramInfo().then((info) => {
  console.log('電台頻道節目資訊：')
  console.log(info)
})
