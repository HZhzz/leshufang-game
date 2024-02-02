import IDataModel from "./IDataModel";
import UIHelp from "../../logic/ui/UIHelp";
import EventMng from "../../manager/EventMng";
import { GameEvent } from "../const/EventConst";
import { DeviceModule } from "./DeviceModule";
import GameDataCenter from "../GameDataCenter";

const PLAYER_ACCOUNT = 'player';

export default class PlayerModel extends IDataModel {
    public _money: number = 0;
    public coupon: number = 0
    public hour: number = 0
    public cash: number = 0
    public weixinid: string = ''
    public qqid: string = ''
    public doudou: number = 0
    public vip: number = 0
    public realnanme: number = 0
    public founder: number = 0
    public avatar: string = ""
    public shangji: string = ""
    public power: string = ""
    //充值 方式
    public recharge: number = 3
    //提现方式
    public withdraw: number = 3

    //付款方式
    public payType: number = 1

    //悠游豆相关设置
    public doudouInfo: any;

    //参与的奖券
    public couponroll: number = 0


    // public _fft: number = 0;
    public name: string = "";
    public serverTime: number = 0;
    public base: object;
    public isWx: boolean;
    public today: number;
    public createDay: number;
    public id: number;
    public level: number;
    public config: object;
    public baseF: object;
    public seeds: object;
    public bankname: string = "";
    public banknum: string = "";
    public bankrealname: string = "";
    public phone: string = "";

    public exp: number;  //经验值
    public curexp: number; //下一级经验

    public debuffTime1;//灾害刷新时间
    public debuffTime2;//灾害刷新时间

    public siginInfo;

    public dawanjia: number = 0;

    public jifen: number = 0;
    public goldcoin: number = null;
    public huiyuanendtime: number = null;
    constructor() {
        super('player');

        this.isWx = cc.sys.platform == cc.sys.WECHAT_GAME;
    }
    public hourGoldCoin :number = null;
    initData(user: object) {
        this.base = user;
        //银子
        this.money = user["coin"]// Math.floor(Number(user["coin"]) * 100) / 100;
        // this.fft = Math.floor(Number(user["goods45"]) * 100) / 100;
        this.coupon = user["coupon"]
        this.hour = user["hour"]
        this.cash = user["money"]
        this.weixinid = user["weixinid"]
        this.qqid = user["qqid"]
        this.doudou = user["fen"]
        this.id = user["id"]
        this.name = user["nickname"];
        this.vip = user["huiyuan"]
        this.realnanme = user["isauthentication"]
        this.founder = user["founder"]
        this.avatar = user["avatar"]
        this.shangji = user["shangji"]
        this.power = user["electricity"]
        this.couponroll = user["couponroll"]
        this.phone = user["phone"];
        this.goldcoin = user['goldcoin'];
        this.dawanjia = user['dawanjia'];

        this.jifen = user['jifen'];
        this.huiyuanendtime = user['huiyuanendtime'];

        EventMng.emit(GameEvent.GET_USER_SUCCESS)
        // this.createDay = user["createtime"];
        //
        // if(this.money!= user["coin"]){
        //     this.level = user["level"];
        //     EventMng.emit(GameEvent.GET_USER_SUCCESS)
        // }
        // this.exp=user["exp"];
        // this.curexp=user["curexp"]
        // EventMng.emit(GameEvent.CHANGE_EXP)

        // this.debuffTime1=user["time_damage_1"]
        // this.debuffTime2=user["time_damage_2"]
        // this.bankname=user["bank_name"]
        // this.banknum=user["bank_number"]
        // this.bankrealname=user["real_name"]
    }
    isVip() {
        return Boolean(this.vip)
    }
    isFounder() {
        return Boolean(this.founder)
    }
    initDataF(user: object) {
        this.baseF = user;
    }

    get money() {
        return this._money;
    }

    set money(_money: number) {
        if (_money == this._money) {
            return;
        }

        this._money = _money;
        EventMng.emit(GameEvent.MONEY_CHANGE);
    }


    get levelName(): string {
        return this.config['levels'][`goods${this.level}`]["name"];
    }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['hall_getmyinfo']: (msg) => { this.G2C_GSuccess(msg) },
            ['hall_signinfo']: (msg) => { this.G2C_SiginInfo(msg) },
            ['hall_signin']: (msg) => { this.G2C_Sigin(msg) },

            ['hall_buyvip']: (msg) => { this.G2C_onBuyvip(msg) },
            ['hall_buyfounder']: (msg) => { this.G2C_onBuySupervip(msg) },
            ['hall_getrechargewithdrawtype']: (msg) => { this.G2C_getPayType(msg) },
            ['hall_fenmanage']: (msg) => { this.G2C_onSetDoudouInfo(msg) },
            ['hall_dawanjialist']: (msg) => { this.G2C_onSetBigPlayerList(msg) },
            ['hall_gethandbookprize']: (msg) => { this.G2C_onGethandbookprize(msg) },
            ['hall_sendfen']: (msg) => { this.G2C_onGiveSomebadyDou(msg) },
            ['hall_updawanjia']: (msg) => { this.G2C_onUpdataBigPlayer(msg) },
            ['hall_downdawanjia']: (msg) => { this.G2C_onCancleBigPlayer(msg) },
            ['hall_physicallotterylist']: (msg) => { this.G2C_onRealPrizeList(msg) },
            ['hall_addcouponphysical']: (msg) => { this.G2C_onInRealPrize(msg) },
            ['hall_subcouponphysical']: (msg) => { this.G2C_onOutRealPrize(msg) },
            ['hall_getphysicallotteryrollresult']: (msg) => { this.G2C_onGetRealPrize(msg) },


            ['hall_electricity']: (msg) => { this.G2C_oneLectricity(msg) },
            ['hall_fenaddelectricity']: (msg) => { this.G2C_ondoudouPwoerBuy(msg) },
            ['hall_addcoupon']: (msg) => { this.G2C_onCanyuDraw(msg) },
            ['hall_subcoupon']: (msg) => { this.G2C_onOutTicket(msg) },
            ['hall_getlucklist']: (msg) => { this.G2C_onFriendZjlist(msg) },
            ['hall_couponinfo']: (msg) => { this.G2C_onGetTiketPageInfo(msg) },
            ['hall_getrollresult']: (msg) => { this.G2C_onGetTicketResult(msg) },




            ['mine_withdraw']: (msg) => { this.G2C_onTixian(msg) },
            ['mine_getlogs']: (msg) => { this.G2C_onGetLogs(msg) },
            ['mine_getmyteam']: (msg) => { this.G2C_onGetFriendList(msg) },
            ['mine_friendreward']: (msg) => { this.G2C_onSetFriendGift(msg) },
            ['mine_bindshangji']: (msg) => { this.G2C_onbindshangji(msg) },
            ['mine_gethelp']: (msg) => { this.G2C_getHelp(msg) },
            ['hall_getvipfen']: (msg) => { this.G2C_onGetVipFen(msg) },

            ['mine_getvipinfo']: (msg) => { this.G2C_onGetVipGuaFenInfo(msg) },
            ['mine_shejiao']: (msg) => { this.G2C_onWeiXinChanged(msg) },
            ['mine_changenickname']: (msg) => { this.G2C_changenickname(msg) },
            ['mine_changeavatar']: (msg) => { this.G2C_changeavatar(msg) },
            ['hall_gettoken']: (msg) => { this.G2C_gettoken(msg) },
            ['hall_videoCallBack']: (msg) => { this.G2C_videoCallBack(msg) },
            ['hall_getranklist']: (msg) => { this.G2C_getranklist(msg) },
            ['mine_searchfriend']: (msg) => { this.G2C_searchfriend(msg) },
            ['hall_getprice']: (msg) => { this.G2C_getprice(msg) },

            ['hall_loadjackpot']: (msg) => { this.G2C_loadJackpot(msg) },
            ['hall_joinjackpot']: (msg) => { this.G2C_joinJackpot(msg) },
            ['hall_loadpermit']: (msg) => { this.G2C_loadPermit(msg) },
            ['hall_buypermit']: (msg) => { this.G2C_buyPermit(msg) },
            ['hall_getmypermit']: (msg) => { this.G2C_getPermitList(msg) },
            ['hall_requeirpermit']: (msg) => { this.G2C_getPermitReward(msg) },
            ['hall_vipconfiglist']: (msg) => { this.G2C_getVipConfigList(msg) },
            ['hall_getmyvip']: (msg) => { this.G2C_getMyVip(msg) },
            ['hall_getvipprize']: (msg) => { this.G2C_getVipPrize(msg) },
            ['hall_uservipconfiglist']: (msg) => { this.G2C_getUservipconfiglist(msg) },
            ['mine_shareinfo']: (msg) => { this.G2C_getShareInfo(msg) },
            ['mine_getshangji']: (msg) => { this.G2C_getShangji(msg) },
            ['hall_getfragmentlist']: (msg) => { this.G2C_getfragmentlist(msg) },
            ['hall_exchangefragment']: (msg) => { this.G2C_exchangefragment(msg) },
            ['hall_getfragmentexchangelog']: (msg) => { this.G2C_getfragmentexchangelog(msg) },

            ['mine_getwithdrawlogs']: (msg) => { this.G2C_getwithdrawlogs(msg) },
            ['mine_getjishoulogs']: (msg) => { this.G2C_getjishoulogs(msg) },


            // 

        }
    }

    //个人信息
    getUserInfo() {
        var params = {
        }
        this.sendHttpMsg("hall/getmyinfo", params)
    }

    G2C_GSuccess(msg) {
        EventMng.emit(GameEvent.GET_USER_SUCCESS);
    }
    //签到信息
    getSiginInof() {
        var params = {

        }
        this.sendHttpMsg("hall/signinfo", params)
    }
    G2C_SiginInfo(msg) {
        // console.log(msg);
        this.siginInfo = msg.data;
        EventMng.emit(GameEvent.SIGININFO_LOGIN);

    }
    //签到
    Sigin() {
        var params = {

        }
        this.sendHttpMsg("hall/signin", params)
    }
    G2C_Sigin(msg) {
        // console.log(msg.errmsg);
        //获取签到信息
        UIHelp.ShowDialog({
            title: "提示",
            content: "领取成功",
        })
        this.getSiginInof()
        // this.siginInfo = msg.data;
        // EventMng.emit(GameEvent.SIGININFO_LOGIN);

    }
    //帮助中心
    getHelp() {
        var params = {

        }
        this.sendHttpMsg("mine/gethelp", params)
    }
    G2C_getHelp(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.HEIP_CENTER, msg.data);
    }
    //获取提现方式
    getPayType() {
        var params = {

        }
        this.sendHttpMsg("hall/getrechargewithdrawtype", params)
    }
    G2C_getPayType(msg) {
        this.recharge = msg.data.recharge
        this.withdraw = msg.data.withdraw
    }
    //提现 1现金 2悠游豆
    onTixian(amount, tp, payt) {
        var params = {
            amount: amount,
            type: tp,
            paytype: payt
        }
        this.sendHttpMsg("mine/withdraw", params)
    }
    G2C_onTixian(msg) {
        UIHelp.ShowTips("申请提现成功！请等待审核")
    }
    //赠送悠游豆
    onGiveSomebadyDou(num, id) {
        var params = {
            num: num,
            friendid: id,
            type:1
        }
        this.sendHttpMsg("hall/sendfen", params)
    }
    G2C_onGiveSomebadyDou(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GIVEDOUDOU_SUCESS);
        UIHelp.ShowTips("赠送成功")
    }

    //赠送金币
    onGiveSomebadyGold(num, id) {
        var params = {
            num: num,
            friendid: id,
            type:2
        }
        this.sendHttpMsg("hall/sendfen", params)
    }
    G2C_onGiveSomebadyGold(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GIVEGOLD_SUCESS);
        UIHelp.ShowTips("赠送成功")
    }

    getFee() {
        var params = {

        }
        this.sendHttpMsg("hall/getFee", params)
    }
    G2C_getFee() {
        EventMng.emit(GameEvent.GetFee);
    }

    //购买Vip
    onBuyvip(type) {
        this.payType = type
        var params: any = {}
        if (type) {
            params.type = type
        }
        this.sendHttpMsg("hall/buyvip", params)
    }
    G2C_onBuyvip(msg) {
        UIHelp.ShowTips("购买成功!")
        console.log(msg);
        if (this.payType == 1) {
            DeviceModule.getInstance().gotoWXPay(JSON.stringify(msg.res))
        }
        if (this.payType == 2) {
            DeviceModule.getInstance().gotoAliPay(msg.res)
        }
    }

    //购买创始人
    onBuySupervip(type) {
        this.payType = type
        var params = {
            type: type
        }
        this.sendHttpMsg("hall/buyfounder", params)
    }
    G2C_onBuySupervip(msg) {
        console.log(msg.res);
        if (this.payType == 2) {

            DeviceModule.getInstance().gotoAliPay(msg.res)
        }
        else {
            DeviceModule.getInstance().gotoWXPay(JSON.stringify(msg.res))
        }

    }

    public logs: any = {};
    public logType: string = "";
    //获取记录
    onGetLogs(type: string, page = 1, limit = 5) {
        this.logType = type;
        var params = { type, page, limit };
        this.sendHttpMsg("mine/getlogs", params)
    }
    G2C_onGetLogs(msg) {
        console.log(msg);
        if (!this.logs[this.logType]) {
            this.logs[this.logType] = [];
        }
        const logList = this.logs[this.logType];
        const idList = logList.map((item) => item.id);
        logList.push(...msg.data.list.filter((item) => {
            return idList.indexOf(item.id) == -1;
        }));
        logList.sort((a, b) => {
            return b.id - a.id;
        });
        EventMng.emit(GameEvent.GAME_LOGS, { list: logList });

        // DeviceModule.getInstance().gotoWXPay(msg.data)
    }

    getGiveLogs(type: string, page = 1, limit = 5) {
        this.logType = type;
        var params = { type, page, limit };
        this.sendHttpMsg("mine/getGiveLogs", params)
    }
    G2C_getGiveLogs(msg) {
        console.log('????',msg);
        if (!this.logs[this.logType]) {
            this.logs[this.logType] = [];
        }
        const logList = this.logs[this.logType];
        const idList = logList.map((item) => item.id);
        logList.push(...msg.data.list.filter((item) => {
            return idList.indexOf(item.id) == -1;
        }));
        logList.sort((a, b) => {
            return b.id - a.id;
        });
        EventMng.emit(GameEvent.GetGiveLogs, { list: logList });

        // DeviceModule.getInstance().gotoWXPay(msg.data)
    }


    //好友列表
    onGetFriendList() {
        var params = {

        }
        this.sendHttpMsg("mine/getmyteam", params)
    }
    G2C_onGetFriendList(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.FRIEND_LIST, msg.data);
        // DeviceModule.getInstance().gotoWXPay(msg.data)
    }
    //悠游豆相关设置
    onSetDoudouInfo() {
        var params = {

        }
        this.sendHttpMsg("hall/fenmanage", params)
    }
    G2C_onSetDoudouInfo(msg) {
        console.log(msg);
        this.doudouInfo = msg.data[0]
        EventMng.emit(GameEvent.DOUDOUINFO, msg.data);
        // DeviceModule.getInstance().gotoWXPay(msg.data)
    }
    //大玩家排行榜
    onSetBigPlayerList() {
        var params = {

        }
        this.sendHttpMsg("hall/dawanjialist", params)
    }
    G2C_onSetBigPlayerList(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.BIGRICHLIST, msg.data.list);
        // DeviceModule.getInstance().gotoWXPay(msg.data)
    }
    //好友现金奖励
    onSetFriendGift() {
        var params = {

        }
        this.sendHttpMsg("mine/friendreward", params)
    }
    G2C_onSetFriendGift(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.FRIEND_RED_LIST, msg.data);
        // DeviceModule.getInstance().gotoWXPay(msg.data)
    }

    //好友现金奖励
    onbindshangji(id) {
        var params = {
            sjuid: id
        }
        this.sendHttpMsg("mine/bindshangji", params)
    }
    G2C_onbindshangji(msg) {

        UIHelp.ShowTips("绑定成功")
        EventMng.emit(GameEvent.BANDSHANGJIID);
        // DeviceModule.getInstance().gotoWXPay(msg.data)
    }
    //领取图鉴奖励
    onGethandbookprize(id) {
        var params = {
            carid: id
        }
        this.sendHttpMsg("hall/gethandbookprize", params)
    }
    G2C_onGethandbookprize(msg) {
        console.log(msg);
        UIHelp.ShowTips("领取成功")
        EventMng.emit(GameEvent.GETHANDLISTSUESS);
    }
    //好有中奖列表
    onFriendZjlist() {
        var params = {

        }
        this.sendHttpMsg("hall/getlucklist", params)
    }
    G2C_onFriendZjlist(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.FRIENDZHONGJIANGLISE, msg.data.list);
    }
    //实物奖励列表
    onRealPrizeList() {
        var params = {

        }
        this.sendHttpMsg("hall/physicallotterylist", params)
    }
    G2C_onRealPrizeList(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.REALPRIZELIST, msg.data.list);
    }
    //参与实物奖励
    onInRealPrize(code) {
        var params = {
            code: code
        }
        this.sendHttpMsg("hall/addcouponphysical", params)
    }
    G2C_onInRealPrize(msg) {
        console.log(msg);
        UIHelp.ShowTips("参与成功")
        this.onRealPrizeList()
        // EventMng.emit(GameEvent.REALPRIZELIST, msg.data.list);
    }
    onOutRealPrize(code) {
        var params = {
            code: code
        }
        this.sendHttpMsg("hall/subcouponphysical", params)
    }
    G2C_onOutRealPrize(msg) {
        console.log(msg);
        UIHelp.ShowTips("取消成功")
        this.onRealPrizeList()
        // EventMng.emit(GameEvent.REALPRIZELIST, msg.data.list);
    }

    _getRealPrizeMap = {}
    //获取实物奖励
    onGetRealPrize(code) {
        const time = new Date().getTime();
        if (this._getRealPrizeMap[code]) {
            if (time - this._getRealPrizeMap[code] < 1000) {
                return;
            }
        }
        this._getRealPrizeMap[code] = time;

        var params = {
            code: code
        }
        this.sendHttpMsg("hall/getphysicallotteryrollresult", params);
    }
    G2C_onGetRealPrize(msg) {
        // UIHelp.ShowTips("领取成功")
        // this.onRealPrizeList()
        EventMng.emit(GameEvent.GETREALPRIZE, msg.data);
    }

    //升级大玩家
    onUpdataBigPlayer(num, wx, qq) {
        var params = {
            num: num,
            weixin: wx,
            qq: qq,
        }
        this.sendHttpMsg("hall/updawanjia", params)
    }
    G2C_onUpdataBigPlayer(msg) {
        console.log(msg);
        UIHelp.ShowTips("销毁成功")
        this.onSetBigPlayerList()
        // EventMng.emit(GameEvent.GETHANDLISTSUESS);
    }
    // 取消大玩家
    onCancleBigPlayer() {
        var params = {
        }
        this.sendHttpMsg("hall/downdawanjia", params)
    }
    G2C_onCancleBigPlayer(msg) {
        console.log(msg);
        // UIHelp.ShowTips("申请已提交")
        UIHelp.ShowTips("后台正在审核7天内无交易且未被举报\n平台将自动退还销毁乐豆");
    }
    //乐豆电量比例
    oneLectricity() {
        var params = {

        }
        this.sendHttpMsg("hall/electricity", params)
    }
    G2C_oneLectricity(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.POWERDOUDOUINFO, msg.data);
    }
    //乐豆购买电量
    ondoudouPwoerBuy(num) {
        var params = {
            num: num
        }
        this.sendHttpMsg("hall/fenaddelectricity", params)
    }
    G2C_ondoudouPwoerBuy(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.POWERDOUDOUSUCCSE);
    }

    //奖券抽奖额面
    onGetTiketPageInfo() {
        var params = {

        }
        this.sendHttpMsg("hall/couponinfo", params)
    }
    G2C_onGetTiketPageInfo(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.TICKETPAGEINFO, msg.data);
    }

    // 获取奖券抽奖结果
    onGetTicketResult() {
        var params = {

        }
        this.sendHttpMsg("hall/getrollresult", params)
    }
    G2C_onGetTicketResult(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.TICKETRESULT, msg.data);
    }

    //参与奖券抽奖
    onCanyuDraw() {
        var params = {

        }
        this.sendHttpMsg("hall/addcoupon", params)
    }
    G2C_onCanyuDraw(msg) {
        console.log(msg);

        //页面信息
        this.onGetTiketPageInfo()
    }
    //取出奖券
    onOutTicket() {
        var params = {

        }
        this.sendHttpMsg("hall/subcoupon", params)
    }
    G2C_onOutTicket(msg) {
        console.log(msg);

        this.onGetTiketPageInfo()
    }
    //获取vip瓜分
    onGetVipGuaFenInfo() {
        var params = {

        }
        this.sendHttpMsg("mine/getvipinfo", params)
    }
    G2C_onGetVipGuaFenInfo(msg) {
        console.log(msg);

        EventMng.emit(GameEvent.VIPGUANFEPIRZE, msg[0].data);
    }
    onGetVipFen() {
        var params = {

        }
        this.sendHttpMsg("hall/getvipfen", params)
    }
    G2C_onGetVipFen(msg) {
        console.log(msg);
        UIHelp.ShowDialog({
            title: '提示',
            content: `成功领取${msg.res.amount}个`,
        });
        this.onGetVipGuaFenInfo();
    }



    onWeiXinQqChanged(weixin, qq) {
        const params = {
            weixin: weixin,
            qq: qq
        };
        this.sendHttpMsg("mine/shejiao", params)
    }
    G2C_onWeiXinChanged(msg) {
        console.log(msg);
        // EventMng.emit(GameEvent.VIPGUANFEPIRZE, msg[0].data);
    }

    changenickname(nickname) {
        const params = {
            nickname: nickname,
        };
        this.sendHttpMsg("mine/changenickname", params)
    }
    G2C_changenickname(msg) {
        console.log(msg);
    }

    changeavatar(avatar) {
        const params = {
            avatar: avatar,
        };
        this.sendHttpMsg("mine/changeavatar", params)
    }
    G2C_changeavatar(msg) {
        EventMng.emit(GameEvent.GET_USER_SUCCESS);
    }
    getprice() {
        const params = {
        };
        this.sendHttpMsg("hall/getprice", params)
    }

    G2C_getprice(msg) {
        console.log(msg);
        // this.getfounder = msg.data.founder
        // this.getvip = msg.data.vip
        EventMng.emit(GameEvent.GET_VIP_PRICE, msg.data);
    }

    getaixin(){
        const params = {
        };
        this.sendHttpMsg("hall/getLove", params)
    }
    G2C_getaixin(msg){
        console.log(msg);
        // this.getfounder = msg.data.founder
        // this.getvip = msg.data.vip
        EventMng.emit(GameEvent.GetLove, msg.data);
    }


    private adslotNum
    gettoken(reward_name, adslotNum) {
        this.adslotNum = adslotNum
        const params = {
            reward_name: reward_name
        };
        this.sendHttpMsg("hall/gettoken", params)
    }
    public sign
    G2C_gettoken(msg) {
        this.sign = msg.data.sign
        var info = {
            adSlot: this.adslotNum,
            reward: 10,
            reward_name: "seeAD",
            userid: GameDataCenter.account.uid
        }
        DeviceModule.getInstance().chuanshanjia_reward(JSON.stringify(info));
        // GameDataCenter.baseSdk.videoCallBack()
    }
    videoCallBack(reward_name, sign) {
        const params = {
            reward_name: reward_name,
            sign: sign
        };
        this.sendHttpMsg("hall/videoCallBack", params)
    }

    G2C_videoCallBack(msg) {
        console.log(msg)
        GameDataCenter.baseSdk.videoOver()
    }
    getranklist() {
        const params = {
            type: "fen",
        };
        this.sendHttpMsg("hall/getranklist", params)
    }

    G2C_getranklist(msg) {
        EventMng.emit(GameEvent.GETRANKLIST_SUCCESS, msg.data.list)
    }
    searchfriend(friendid) {
        const params = {
            friendid: friendid,
        };
        this.sendHttpMsg("mine/searchfriend", params)
    }
    G2C_searchfriend(msg) {
        console.log(msg)
        EventMng.emit(GameEvent.SOUSUO_SUCCESS, msg.data.list)
    }

    loadJackpot() {
        const params = {
        };
        this.sendHttpMsg("hall/loadjackpot", params);
    }
    G2C_loadJackpot(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.LOADJACKPOT, msg.data);
    }

    joinJackpot() {
        const params = {
        };
        this.sendHttpMsg("hall/joinjackpot", params);
    }
    G2C_joinJackpot(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.JOINJACKPOT, msg.data);
    }

    loadPermit() {
        const params = {
        };
        this.sendHttpMsg("hall/loadpermit", params);
    }
    G2C_loadPermit(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.LOADPERMIT, msg.data);
    }

    buyPermit(permitid) {
        const params = {
            permitid: permitid,
        };
        this.sendHttpMsg("hall/buypermit", params);
    }
    G2C_buyPermit(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.BUYPERMIT, msg.data);
    }

    getPermitList() {
        const params = {
        };
        this.sendHttpMsg("hall/getmypermit", params);
    }
    G2C_getPermitList(msg) {
        EventMng.emit(GameEvent.GETPERMITLIST, msg.data);
    }

    getPermitReward() {
        const params = {
        }
        this.sendHttpMsg("hall/requeirpermit", params);
    }
    G2C_getPermitReward(msg) {
        console.log(msg);
        this.getPermitList();
        EventMng.emit(GameEvent.GETPERMITREWARD, msg.data);
    }

    getVipConfigList() {
        const params = {
        };
        this.sendHttpMsg("hall/vipconfiglist", params);
    }
    G2C_getVipConfigList(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETVIPCONFIGLIST, msg.data);
    }

    getMyVip() {
        const params = {
        };
        this.sendHttpMsg("hall/getmyvip", params);
    }
    G2C_getMyVip(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETMYVIP, msg.data);
    }

    getVipPrize(type) {
        const params = {
            type: type,
        };
        this.sendHttpMsg("hall/getvipprize", params);
    }
    G2C_getVipPrize(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETVIPPRIZE, msg.data);
    }

    getUservipconfiglist(_lvl: number) {
        const params = {
            lvl: _lvl,
        };
        this.sendHttpMsg("hall/uservipconfiglist", params);
    }
    G2C_getUservipconfiglist(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETUSERVIPCONFIGLIST, msg.data);
    }

    getShareInfo() {
        const params = {
        };
        this.sendHttpMsg("mine/shareinfo", params);
    }
    G2C_getShareInfo(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETSHAREINFO, msg.data);
    }

    getShangji() {
        const params = {
        };
        this.sendHttpMsg("mine/getshangji", params);
    }
    G2C_getShangji(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETSHANGJI, msg.data);
    }

    getfragmentlist() {
        const params = {
        };
        this.sendHttpMsg("hall/getfragmentlist", params);
    }
    G2C_getfragmentlist(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETFRAGMENTLIST, msg.data);
    }

    exchangefragment(code, name, phone, address) {
        const params = { code, name, phone, address };
        this.sendHttpMsg("hall/exchangefragment", params);
    }
    G2C_exchangefragment(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.EXCHANGEFRAGMENT, msg.data);
        UIHelp.ShowTips("兑换成功");
    }

    getfragmentexchangelog() {
        const params = {};
        this.sendHttpMsg("hall/getfragmentexchangelog", params);
    }
    G2C_getfragmentexchangelog(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETFRAGMENTEXCHANGELOG, msg.data);
    }
    // mine/getwithdrawlogs
    getwithdrawlogs(page = 0, limit = 20) {
        const params = {
            page: page,
            limit: limit,
        };
        this.sendHttpMsg("mine/getwithdrawlogs", params);
    }
    G2C_getwithdrawlogs(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETWITHDRAWLOGS, msg.data);
    }
    // mine/getjishoulogs
    getjishoulogs(page = 0, limit = 20) {
        const params = {
            page: page,
            limit: limit,
        };
        this.sendHttpMsg("mine/getjishoulogs", params);
    }
    G2C_getjishoulogs(msg) {
        console.log(msg);
        EventMng.emit(GameEvent.GETJISHOULOGS, msg.data);
    }
}