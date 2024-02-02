import IDataModel from "../IDataModel";
import EventMng from "../../../manager/EventMng";
import { GameEvent } from "../../const/EventConst";
import GameDataCenter from "../../GameDataCenter";

export default class H5WxSdkModel extends IDataModel {

    constructor() {
        super('H5WxSdkModel');
    }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['getSha1']: (msg) => { this.G2C_GetSha1Success(msg) },
        }
    }

    //获取签名
    getSign() {
        // let url = location.href.split('#')[0];
        // var params = {
        //     url: url
        // }
        
        // this.sendHttpMsg("getSha1",params, false)
    }

    G2C_GetSha1Success(msg) {
        // 请求后端拿到签名
        let wxConfig = msg;
        // 更新配置
        wx.config({
            debug: false,
            appId: "wx0b5c1750a4b23ea2",
            timestamp: wxConfig.data.timestamp,
            nonceStr: wxConfig.data.noncestr,
            signature: wxConfig.data.sha1,
            jsApiList: [
                'updateAppMessageShareData',  // 分享给朋友
                'updateTimelineShareData'  // 朋友圈
            ]
        });
        wx.error(() => {
            console.log(666666644)
        })
    }

    public shareAppMessage(){
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({ 
                title: "分享标题", // 分享标题
                desc: "分享描述", // 分享描述
                link: "https://www.baidu.com/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                // imgUrl: shareInfo.data.data.imageUrl, // 分享图标
                success: function () {
                
                }
            })
            // wx.updateTimelineShareData({ 
            //     title: "分享标题", 
            //     link: "https://www.baidu.com/",
            //     // imgUrl: shareInfo.data.data.imageUrl, 
            //     success: function () {
                
            //     }
            // })
        }); 
    }
}