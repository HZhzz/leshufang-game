


import UIHelp from "../../../logic/ui/UIHelp";
import EventMng from "../../../manager/EventMng";
import { GameEvent } from "../../const/EventConst";
import IDataModel from "../IDataModel";

const PLAYER_ACCOUNT = 'consignment';

export default class ConsignmentModel extends IDataModel {
    public _money: number = 0;
    public car: object;
    public getcarType: number = 0

    constructor() {
        super('consignment');


    }

    initData(car: object) {
        this.car = car;
        this.money = car["coin"]// Math.floor(Number(user["coin"]) * 100) / 100;

    }

    initDataF(user: object) {
        // this.baseF = user;
    }

    get money() {
        return this._money;
    }

    set money(_money: number) {
        if (_money == this._money) {
            return;
        }

        this._money = _money;
        // EventMng.emit(GameEvent.MONEY_CHANGE);
    }


    // get levelName(): string {
    //    // return this.config['levels'][`goods${this.level}`]["name"];
    // }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['hall_salelist']: (msg) => { this.G2C_getCarSaleList(msg) },
            ['hall_mysale']: (msg) => { this.G2C_getCarMySale(msg) },
            ['hall_mywantbuy']: (msg) => { this.G2C_getCarMyNeedBuy(msg) },
            ['hall_buyspecial']: (msg) => { this.G2C_getCarBuyspecial(msg) },
            ['hall_salemyspecial']: (msg) => { this.G2C_getCarSelcspecial(msg) },
            ['hall_rarecarlist']: (msg) => { this.G2C_getAllSpecialCarlist(msg) },
            ['hall_wantbuyspecial']: (msg) => { this.G2C_getSendQiuGou(msg) },
            ['hall_salespecial']: (msg) => { this.G2C_getSendChuShou(msg) },
            ['hall_cancelorder']: (msg) => { this.G2C_getcancelorder(msg) },

        }
    }

    //我的寄售列表
    getCarSaleList(type, carid = undefined) {
        //1 出售 2求购
        this.getcarType = type
        var params: any = {
            type: type
        }
        if (carid != undefined) {
            params.carid = carid;
        }
        this.sendHttpMsg("hall/salelist", params)
    }

    G2C_getCarSaleList(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.SALECARCON_LIST, msg.data.list);
    }
    //我的出售
    getCarMySale() {

        var params = {
        }
        this.sendHttpMsg("hall/mysale", params)
    }

    G2C_getCarMySale(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.MYSALECARLIST, msg.data.list);
    }
    //我的求购
    getCarMyNeedBuy() {

        var params = {
        }
        this.sendHttpMsg("hall/mywantbuy", params)
    }

    G2C_getCarMyNeedBuy(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.MYSALECARLIST, msg.data.list);
    }

    //购买稀有车
    getCarBuyspecial(id, num) {

        var params = {
            saleid: id,
            num: num
        }
        this.sendHttpMsg("hall/buyspecial", params)
    }

    G2C_getCarBuyspecial(msg) {
        console.log(msg);

        if (msg.errcode == 0) {
            UIHelp.ShowTips("购买成功");
        }

        EventMng.emit(GameEvent.BUYSUPERCARD);
        this.getCarSaleList(1);
    }
    //出售稀有车
    getCarSelcspecial(id, num) {

        var params = {
            saleid: id,
            num: num
        }
        this.sendHttpMsg("hall/salemyspecial", params)
    }

    G2C_getCarSelcspecial(msg) {
        console.log(msg);

        if (msg.errcode == 0) {
            UIHelp.ShowTips("出售成功");
        }

        EventMng.emit(GameEvent.BUYSUPERCARD);
        this.getCarSaleList(2);
    }

    //稀有车列表
    getAllSpecialCarlist() {

        var params = {

        }
        this.sendHttpMsg("hall/rarecarlist", params)
    }

    G2C_getAllSpecialCarlist(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.ALLSUPERCARLIST, msg.data.list);
    }
    //发布求购
    getSendQiuGou(id, num, price) {

        var params = {
            carid: id,
            num: num,
            price: price
        }
        this.sendHttpMsg("hall/wantbuyspecial", params)
    }

    G2C_getSendQiuGou(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.APPLIY_BUY_SUCCSE);
    }
    //发布出售
    getSendChuShou(id, num, price) {

        var params = {
            carid: id,
            num: num,
            price: price
        }
        this.sendHttpMsg("hall/salespecial", params)
    }

    G2C_getSendChuShou(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.APPLIY_SOID_SUCCSE);
    }
    //取消订单
    getcancelorder(id) {

        var params = {
            saleid: id
        }
        this.sendHttpMsg("hall/cancelorder", params)
    }

    G2C_getcancelorder(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.CANCEL_APPLIY);
    }

}