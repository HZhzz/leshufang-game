export class ConfigModule {
    public static WS_URL = "xxxxx"                //正式服地址
    public static HTTP_URL = "http://api.leshufang.cn:9080/api";           //正式服地址
    // public static HTTP_URL = "http://192.168.3.158:20000/api";           //正式服地址
    // public static HTTP_URL = "http://47.107.72.73:9080/api";           //测试服
    // public static HTTP_URL = "http://admin-game.leshufang.cn:9080"

    public static WS_URL_LOCAL = "xxxx"           //内网地址
    public static HTTP_URL_LOCAL = "";      //内网地址
    public static SHARE_URL = "https://youyoutaosha-cocos.oss-cn-beijing.aliyuncs.com/share/";           //分享下载页链接
    public static VERSION = "v1.7.7"
    public static VERSION_CODE = "3"
    public static SHOW_LOG = true;                    //是否展示log
    public static IS_RELEASE = false;                 //是否是正式版
    public static APPID = "5395923"      //android                   //微信开放平台appid
    // wx7dab65d0fcd01d76
    public static UNIVERSAL_LINK = ""     //ios微信跳转链接

    public static IS_ZHEN_GSHI_FU = false;

    //正式服
    public static VIDEO_ID = {
        SIGINVIDEO: "954740318",
        ZHUANGPAN: "954740320",
        VIPGETDOUDOU: "954740543",
        POWERADV: "954740549",
        TACKCARBACK: "954740604",
        FIVE_BOX: "954743546",
        TEN_BOX: "954743560",

        SIGINVIDEO_IOS: "",
        POWERADV_IOS: "",
    }

    public static VIDEO_NAME = {
        SIGINVIDEO: "签到",
        ZHUANGPAN: "恢复转盘次数",
        VIPGETDOUDOU: "vip瓜分乐豆",
        POWERADV: "恢复电量",
        TACKCARBACK: "提前结算收益",
        FIVE_BOX: "5倍宝箱",
        TEN_BOX: "10倍宝箱",
    }

    // 开屏:888298377

    public static VIDEO_TYPE = {

    }

    //测试服
    public static VIDEO_ID_CESHIFU = {

    }
}