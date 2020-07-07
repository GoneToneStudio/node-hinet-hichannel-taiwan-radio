const network = require("network");
const HiNetHichannel = require("..");

network.get_public_ip(function(err, ip) {
    if (!err) {
        const hichannel = new HiNetHichannel("hich-ra000040", ip); //hich-ra000040 => KISS RADIO 大眾廣播電台

        /* 取得 HiNet hichannel m3u8 串流網址 */
        hichannel.buildPlayUrl().then(m3u8Url => {
            console.log(`m3u8 串流網址：${m3u8Url}`);
        }).catch(e => {
            console.error(e);
        });

        /* 取得 HiNet hichannel Token */
        const expire1 = (Math.floor(Date.now() / 1000) + (60 * 5));
        const expire2 = (expire1 + (60 * 60 * 24));

        console.log(`Token1：${hichannel.getToken(expire1, 1)}`);
        console.log(`Token2：${hichannel.getToken(expire2, 2)}`);
    } else {
        console.log(`無法取得 IP：${err}`);
    }
});
