


import UIHelp from "../../../logic/ui/UIHelp";
import EventMng from "../../../manager/EventMng";
import GameDataCenter from "../../GameDataCenter";
import { GameEvent } from "../../const/EventConst";
import IDataModel from "../IDataModel";

const PLAYER_ACCOUNT = 'car';

export default class selectMode extends IDataModel {
    public money: number = 0;
    public car: object;
    public myParkData: any;

    constructor() {
        super('select');


    }

    initData(car: object) {
        this.car = car;
        this.money = car["coin"]// Math.floor(Number(user["coin"]) * 100) / 100;

    }


    // get levelName(): string {
    //    // return this.config['levels'][`goods${this.level}`]["name"];
    // }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数

            ['hall_getmypark']: (msg) => { this.G2C_GetCargarage(msg) },
            ['hall_usecar']: (msg) => { this.G2C_SetStopCard(msg) },
            ['hall_sellcar']: (msg) => { this.G2C_SetSellCarPt(msg) },
            ['hall_sellallcar']: (msg) => { this.G2C_SetSellAllCarPt(msg) },
            ['hall_takeback']: (msg) => { this.G2C_getBackCar(msg) },
            ['hall_getmyrarepark']: (msg) => { this.G2C_getMyXiyouCar(msg) },
            ['hall_takebackcount']: (msg) => { this.G2C_getLookTackTimes(msg) },

        }
    }


    getMyCar() {
        let params = {};
        this.sendHttpMsg("hall/getMyCar", params);
    }

    G2C_GetMyCar(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GET_MYCARLIST, msg.data);
    }

    //车库
    getMygarage() {
        var params = {
        }
        this.sendHttpMsg("hall/getmypark", params)
    }
    G2C_GetCargarage(msg) {
        console.log(msg);

        this.myParkData = msg.data;
        EventMng.emit(GameEvent.GET_MYCARDLIST, msg.data);
    }
    //我的资产
    getMyXiyouCar() {
        var params = {
        }
        this.sendHttpMsg("hall/getmyrarepark", params)
    }
    G2C_getMyXiyouCar(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.GET_MYRAREPARK, msg.data);
    }
    //停车
    setStopCar(code) {
        var params = {
            goodsid: code
        }
        this.sendHttpMsg("hall/usecar", params)
    }
    G2C_SetStopCard(msg) {
        UIHelp.ShowTips("摆放成功")
        // console.log(msg);
        EventMng.emit(GameEvent.STOP_CAR);
        // EventMng.emit(GameEvent.GET_MYCARDLIST,msg.data[0].list);
    }
    //出售
    SetSellCarPt(code) {
        var params = {
            carid: code
        }
        this.sendHttpMsg("hall/sellcar", params)
    }
    G2C_SetSellCarPt(msg) {
        console.log(msg);
        this.getMygarage();
        // EventMng.emit(GameEvent.GET_MYCARDLIST,msg.data[0].list);
    }
    //一键出售
    SetSellAllCarPt() {
        var params = {
        }
        this.sendHttpMsg("hall/sellallcar", params)
    }
    G2C_SetSellAllCarPt(msg) {
        console.log(msg);
        UIHelp.ShowTips("出售成功")
        EventMng.emit(GameEvent.SELL_ALLCAR_SUCCSE);
    }
    //取回
    getBackCar(code) {
        var params = {
            parkid: code
        }
        this.sendHttpMsg("hall/takeback", params)
    }
    G2C_getBackCar(msg) {
        UIHelp.ShowTips("取出成功");
        console.log(msg);
        EventMng.emit(GameEvent.TACKBACK_CAR);
        GameDataCenter.player.getUserInfo();
        // EventMng.emit(GameEvent.GET_MYCARDLIST,msg.data[0].list);
    }

    //看视频取回次数
    getLookTackTimes() {
        var params = {
        }
        this.sendHttpMsg("hall/takebackcount", params)
    }
    G2C_getLookTackTimes(msg) {

        console.log(msg);
        EventMng.emit(GameEvent.TACKBACK_CAR_TIMES, msg.data);

    }
}