(function() {
    /*判断设备环境（终极版，可验证模拟器）*/
    // mobile(手机浏览器)  weixin(微信)  weixinpc(微信PC端)   pc(电脑)  pcp(手机模拟器)
    window.deviceType = 'null';

    if (!isPC()) {
        if (isWX()) {
            window.window.deviceType = 'weixin';
        } else {
            window.deviceType = 'mobile';
        }
    }else{
        if (isWX()) {
            window.deviceType = 'weixinpc';
        }else{
            window.deviceType = 'pc';
        }
    }

    var fn = function() {};
    fn.toString = function() {
        window.deviceType = 'pc';
        
        if (isWX()|| (!isPC()) ) {
            window.deviceType = 'pcp';
        }
    };
    console.log("%c", fn);

    function isWX() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    }

    function isPC() {
        var ua = navigator.userAgent.toLowerCase();
        return (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(ua)) ? false : true;
    }

    /*判断设备环境END*/
})();