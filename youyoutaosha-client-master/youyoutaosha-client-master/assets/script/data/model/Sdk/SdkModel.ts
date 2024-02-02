import IDataModel from "../IDataModel";
import EventMng from "../../../manager/EventMng";
import { GameEvent } from "../../const/EventConst";
import GameDataCenter from "../../GameDataCenter";

const KEY_SDK = 'sdk';

export default class SdkModel extends IDataModel {
    public openid: string = "12";
    public nickName: string = this.openid;
    public avatarUrl: string = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4iaauHk6qmCLM3ASY3ia0CKibSPF3FzFyc3IXR5yZA9uAFXVyGaDTqyX1LB6WpjrB4picu4K7lnXgGw/132";

    constructor() {
        super('sdk');

        if(GameDataCenter.player.isWx){
            wx.showShareMenu();

            wx.onShareAppMessage(() => {
                return {
                title: '转发标题',
                imageUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4iaauHk6qmCLM3ASY3ia0CKibSPF3FzFyc3IXR5yZA9uAFXVyGaDTqyX1LB6WpjrB4picu4K7lnXgGw/132" // 图片 URL
                }
            })

            wx.onShow((res) => {
                if(GameDataCenter.xuanfu.statusId == 0 && res["scene"] == 1131){
                    GameDataCenter.xuanfu.setWindow();
                }
            })
        }
    }

    public shareAppMessage(){
        wx.shareAppMessage({
            title: "I'm Shark",
            imageUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4iaauHk6qmCLM3ASY3ia0CKibSPF3FzFyc3IXR5yZA9uAFXVyGaDTqyX1LB6WpjrB4picu4K7lnXgGw/132" // 图片 URL
        })
    }

    public login(){
        var self = this;

        wx.login({
            success (res) {
                if (res.code) {
                    console.log("login_success:",res.code);

                    self.openid = res.code;
                    self.getSetting();
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }

    private getSetting(){
        var self = this;
        wx.getSetting({
            success (res) {
                if (res.authSetting['scope.userInfo']) {
                    console.log("用户已授权，下一步getUserInfo");

                    self.getUserInfo();
                }else{
                    console.log("用户没有授权");
                    EventMng.emit(GameEvent.WEI_SHOU_QUAN);
                }
            }
        })
    }

    private getUserInfo(){
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称

        var self = this;

        wx.getUserInfo({
            success: function(res) {
                console.log("userInfo:", res.userInfo)
                var userInfo = res.userInfo

                self.nickName = userInfo.nickName;
                self.avatarUrl = userInfo.avatarUrl;
            }
        })
    }

    createAuthorizeBtn(btnNode:cc.Node) {
		let btnSize = cc.size(btnNode.width+10,btnNode.height+10);
		let frameSize = cc.view.getFrameSize();
		let winSize = cc.director.getWinSize();
		//适配不同机型来创建微信授权按钮
		let left = (winSize.width*0.5+btnNode.x-btnSize.width*0.5)/winSize.width*frameSize.width;
		let top = (winSize.height*0.5-btnNode.y-btnSize.height*0.5)/winSize.height*frameSize.height;
		let width = btnSize.width/winSize.width*frameSize.width;
		let height = btnSize.height/winSize.height*frameSize.height;

		var btnAuthorize = wx.createUserInfoButton({
			type: 'text',
			text: '',
			style: {
				left: left,
				top: top,
				width: width,
				height: height,
				lineHeight: 0,
				backgroundColor: '',
				color: '#ffffff',
				textAlign: 'center',
				fontSize: 16,
				borderRadius: 4
			}
		})

		btnAuthorize.onTap((uinfo) => {
			console.log("onTap uinfo: ",uinfo);
			if (uinfo.userInfo) {
				console.log("wxLogin auth success");
                wx.showToast({title:"授权成功"});
                btnAuthorize.destroy()
			}else {
				console.log("wxLogin auth fail");
				wx.showToast({title:"授权失败"});
			}
		});
	}
}