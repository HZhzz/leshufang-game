import UIHelp from "../../../logic/ui/UIHelp";
import EventMng from "../../../manager/EventMng";
import { xxtea } from "../../../utils/xxtea";

import { GameEvent } from "../../const/EventConst";
import { VideoEvent } from "../../const/VideoEvent";
import GameDataCenter from "../../GameDataCenter";
import { DeviceModule } from "../DeviceModule";
import IDataModel from "../IDataModel";

export default class BaseSdk extends IDataModel {
    public code: string;
    private type
    private adslotNum

    constructor() {
        super('BaseSdk');
    }

    public videoEvent: VideoEvent;

    wxLogin() {
        // EventMng.emit(GameEvent.SHOW_LOGIN_BTN);
    }

    shareAppMessage() {
        console.error("非微信，无法分享")
    }

    vibrateLong() { }

    createVideo(type: VideoEvent, str, adslotNum: any) {
        this.type = str
        this.adslotNum = adslotNum
        GameDataCenter.player.gettoken(str, adslotNum)
        // // UIHelp.ShowLoding();
        this.videoEvent = type;
        // if (cc.sys.isNative) {
        //     var info = {
        //         adSlot: adslotNum,
        //         reward: 10,
        //         reward_name: "seeAD",
        //         userid: GameDataCenter.account.uid
        //     }
        //     DeviceModule.getInstance().chuanshanjia_reward(JSON.stringify(info))
        // } else {
        //     // GameDataCenter.socketModel.startGuanggao();

        //     this.videoOver();
        // }

    }

    videoCallBack() {
        let _xxtea = xxtea.getInstance();
        GameDataCenter.player.videoCallBack(this.type, _xxtea.strToHexCharCode(_xxtea.encrypt(GameDataCenter.player.sign, "videosign")))
    }

    videoOver() {
        // console.log("视频播放结束");
        // UIHelp.CloseLoding();
        switch (this.videoEvent) {
            //签到
            case VideoEvent.SIGINVIDEO:
                GameDataCenter.player.getSiginInof()
                break;
            //停车收益
            case VideoEvent.TACKCARBACK:
                //看完回来 发送停车
                EventMng.emit(GameEvent.TACKCARBACK_ADV);
                break;
            //转盘
            case VideoEvent.ZHUANGPAN:
                //看完回来 更新转盘次数
                GameDataCenter.zhuanpan.loadRoulette()
                break;
            //回复电量
            case VideoEvent.POWERADV:
                //看完回来 更新转盘次数
                GameDataCenter.player.getUserInfo()
                break;
            //vip瓜分
            case VideoEvent.VIPGETDOUDOU:
                //看完回来 更新转盘次数
                UIHelp.ShowTips("瓜分中，请耐心等待。");
                GameDataCenter.player.onGetVipGuaFenInfo()
                break;
            //五倍宝箱
            case VideoEvent.FIVE_BOX:
                EventMng.emit(GameEvent.ZHUANPAN_FIVE_BOX_ADV);
                break;
            //十倍宝箱
            case VideoEvent.TEN_BOX:
                EventMng.emit(GameEvent.ZHUANPAN_TEN_BOX_ADV);
                break;
            default:
                break;
        }
    }
}