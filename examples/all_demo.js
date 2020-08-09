const HiNetHichannel = require("..");

const hichannel = new HiNetHichannel("KISS RADIO 大眾廣播電台"); //請輸入完整頻道名稱

/* 加載 HiNet hichannel API */
hichannel.loadApi().then(() => {
    /* 取得 HiNet hichannel m3u8 串流網址 */
    hichannel.playUrl().then(playUrl => {
        console.log(`m3u8 串流網址：${playUrl}`);
    }).catch(e => {
        console.error(e);
    });

    try {
        /* 取得 HiNet hichannel 頻道名稱 */
        console.log(`頻道名稱：${hichannel.title()}`);

        /* 取得 HiNet hichannel 頻道 ID */
        console.log(`頻道 ID：${hichannel.id()}`);

        /* 取得 HiNet hichannel 頻道描述 */
        console.log(`頻道描述：${hichannel.desc()}`);

        /* 取得 HiNet hichannel 頻道區域 */
        console.log(`頻道區域：${hichannel.area()}`);

        /* 取得 HiNet hichannel 頻道類型 */
        console.log(`頻道類型：${hichannel.type()}`);

        /* 取得 HiNet hichannel 頻道圖片網址 */
        console.log(`頻道圖片網址：${hichannel.imageUrl()}`);

        /* 取得 HiNet hichannel 頻道節目表 */
        console.log(`頻道節目表：${JSON.stringify(hichannel.programList())}`);

        /* 取得 HiNet hichannel 頻道目前節目名稱 */
        console.log(`頻道目前節目名稱：${hichannel.nowProgramName()}`);
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
