


import UIHelp from "../../../logic/ui/UIHelp";
import EventMng from "../../../manager/EventMng";
import GameDataCenter from "../../GameDataCenter";
import { GameEvent } from "../../const/EventConst";
import IDataModel from "../IDataModel";

const PLAYER_ACCOUNT = 'car';

export default class CarModel extends IDataModel {
    public _money: number = 0;
    public car: object;
    public getcarType: number = 0

    constructor() {
        super('car');


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
            ['hall_getmycarpark']: (msg) => { this.G2C_GetCarList(msg) },
            ['hall_loadshop']: (msg) => { this.G2C_GetShopList(msg) },


            ['hall_buycar']: (msg) => { this.G2C_GetBuyCarSussce(msg) },
            ['hall_handbook']: (msg) => { this.G2C_getHandBooklist(msg) },
            ['hall_autographbooklist']: (msg) => { this.G2C_getYeatBooklist(msg) },
            ['hall_loadbox']: (msg) => { this.G2C_onLoadBoxInfo(msg) },
            ['hall_buybox']: (msg) => { this.G2C_onOpenBoxInfo(msg) },
            ['hall_bringtogether']: (msg) => { this.G2C_getYeatBookJqlist(msg) },
            ['hall_exchangeautographbook']: (msg) => { this.G2C_getYeatBookPrize(msg) },

        }
    }

    //我的停车场
    getCarList(type) {
        this.getcarType = type
        var params = {
        }
        this.sendHttpMsg("hall/getmycarpark", params)
    }

    G2C_GetCarList(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.GET_MYSTOPCAR_LIST, this.getcarType, msg.data.list);
    }

    //图鉴
    getHandBooklist() {
        var params = {
        }
        this.sendHttpMsg("hall/handbook", params)
    }
    G2C_getHandBooklist(msg) {
        console.log(msg);


        EventMng.emit(GameEvent.HANDBOOK_LIST, msg.data.list);
    }
    //纪念册
    getYeatBooklist() {
        var params = {
        }
        this.sendHttpMsg("hall/autographbooklist", params)
    }
    G2C_getYeatBooklist(msg) {
        console.log(msg);


        EventMng.emit(GameEvent.YEATBOOK_LIST, msg.data);
    }
    //纪念册已集齐
    getYeatBookJqlist() {
        var params = {
        }
        this.sendHttpMsg("hall/bringtogether", params)
    }
    G2C_getYeatBookJqlist(msg) {
        console.log(msg);


        EventMng.emit(GameEvent.YEATBOOK_LIST_ED, msg.data);
    }
    //领取纪念册奖励
    getYeatBookPrize(id) {
        var params = {
            autographbookid: id
        }
        this.sendHttpMsg("hall/exchangeautographbook", params)
    }
    G2C_getYeatBookPrize(msg) {
        console.log(msg);


        EventMng.emit(GameEvent.YEATBOOK_PRIZE, msg.data);
    }
    //商店
    getShopList() {
        var params = {
        }
        this.sendHttpMsg("hall/loadshop", params)
    }
    G2C_GetShopList(msg) {


        EventMng.emit(GameEvent.SHOP_LIST, msg.data.list);
    }

    //商店 购买
    ShopBuyCar(id) {
        var params = {
            carid: id
        }
        this.sendHttpMsg("hall/buycar", params)
    }
    G2C_GetBuyCarSussce(msg) {

		GameDataCenter.select.getMygarage();
		GameDataCenter.car.getHandBooklist();
        UIHelp.ShowTips("购买成功")
    }
    //领取宝箱
    onLoadBoxInfo() {
        var params = {

        }
        this.sendHttpMsg("hall/loadbox", params)
    }
    G2C_onLoadBoxInfo(msg) {
        console.error(msg);
        EventMng.emit(GameEvent.LOADBOXINFO, msg.data);
    }
    //开宝箱
    onOpenBoxInfo() {
        var params = {

        }
        this.sendHttpMsg("hall/buybox", params)
    }
    G2C_onOpenBoxInfo(msg) {

        EventMng.emit(GameEvent.OPENBOXINFO, msg.data);
    }
}