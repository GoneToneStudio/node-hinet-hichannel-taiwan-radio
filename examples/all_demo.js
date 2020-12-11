const {HiNetHichannel} = require("..");
//const {HiNetHichannel, Proxy} = require("..");

/*
 * 連線到 Proxy 伺服器
 * 如果運行此程式的伺服器不在台灣，請設定台灣的 Proxy 伺服器，否則取得的串流網址會驗證失敗 (HTTP 403 Forbidden)，但如果播放端 IP 在國外一樣會被阻擋就是了。
 */
//const proxy = new Proxy("主機名", 3128, "http");
//proxy.login("帳號", "密碼"); //如果 Proxy 伺服器需要驗證，請調用這登入

const hichannel = new HiNetHichannel("KISS RADIO 大眾廣播電台"); //請輸入完整頻道名稱
//const hichannel = new HiNetHichannel("KISS RADIO 大眾廣播電台", proxy); //Proxy

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

        /* 取得 HiNet hichannel 頻道目前節目名稱 */
        console.log(`頻道目前節目名稱：${hichannel.nowProgramName()}`);

        /* 取得 HiNet hichannel 頻道節目表 */
        console.log("頻道節目表：");
        console.log(hichannel.programList());
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
