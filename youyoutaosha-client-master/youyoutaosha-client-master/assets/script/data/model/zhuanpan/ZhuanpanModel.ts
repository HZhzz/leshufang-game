import IDataModel from "../IDataModel";
import UIHelp from "../../../logic/ui/UIHelp";
import EventMng from "../../../manager/EventMng";
import { GameEvent } from "../../const/EventConst";
import GameDataCenter from "../../GameDataCenter";
import { Utils } from "../../../utils/Utils";
import GameController from "../../../GameController";

const KEY_CAOLIAOKU = 'zhuanpan';

export default class ZhuanpanModel extends IDataModel {
    rewardId: number;
    roundNum: number;
    des: string;

    constructor() {
        super('zhuanpan');
    }

    get quanNum(): number {
        return GameDataCenter.player.base["roulette_num"];
    }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['rewards']: (msg) => { this.G2C_ChoujiangSuccess(msg) },


            ['hall_rollcount']: (msg) => { this.G2C_LoadRouletteSuccess(msg) },
            ['hall_roll']: (msg) => { this.G2C_RollRouletteSuccess(msg) },
            ['hall_vipfreead']: (msg) => { this.G2C_VipfreeadSuccess(msg) },
        }
    }

    setRoundNum() {
        var list = [];
        var odds = GameDataCenter.player.config["odds"];

        for (let i = 1; i <= 8; i++) {
            let odds_i = odds[`odds${i}`];
            for (let j = 1; j <= odds_i["odds"]; j++) {
                list.push(odds_i["id"]);
            }
        }

        this.roundNum = list[Math.floor(Utils.rand(0, list.length))];

        console.log(this.roundNum);
    }

    choujiangSend() {
        var params = {
            types: this.roundNum
        }

        var odds = GameDataCenter.player.config["odds"][`odds${this.roundNum}`];
        var rewardName = odds["name"];
        if (odds["id"] == 1) {
            var num = GameDataCenter.player.base["goods28"]
        } else {
            var num = odds["num"]
        }

        this.des = `${UIHelp.getZhEnTips("恭喜获得：") + rewardName}x${num}`;
        this.sendHttpMsg("rewards", params)
    }

    //抽奖成功
    G2C_ChoujiangSuccess(msg) {
        EventMng.emit(GameEvent.CHOUJIANG_SUCCESS)
        // TODO 抽奖
        UIHelp.ShowTips(this.des);
    }


    /**获取转盘数据 */
    loadRoulette() {
        var params = {

        }
        this.sendHttpMsg("hall/rollcount", params)
    }

    G2C_LoadRouletteSuccess(msg) {
        console.log("加载转盘数据", msg)
        EventMng.emit(GameEvent.LOAD_ROULETTE_SUCCESS, msg.data)
    }

    /**转转盘 */
    rollRoulette() {
        var params = {

        }
        this.sendHttpMsg("hall/roll", params);
    }

    G2C_RollRouletteSuccess(msg) {
        console.log("roll", msg)
        EventMng.emit(GameEvent.ROLL_ROULETTE_SUCCESS, msg.data)
    }

    vipfreead(name = "转盘") {
        var params = {
            name: name
        }
        this.sendHttpMsg("hall/vipfreead", params);
    }

    G2C_VipfreeadSuccess(msg) {
        console.log("vipfreead", msg)
        EventMng.emit(GameEvent.VIPFREEAD_SUCCESS, msg.data)
        this.loadRoulette();
    }
}