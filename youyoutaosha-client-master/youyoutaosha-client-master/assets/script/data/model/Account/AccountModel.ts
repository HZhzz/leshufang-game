import IDataModel from "../IDataModel";
import UIHelp from "../../../logic/ui/UIHelp";
import EventMng from "../../../manager/EventMng";
import { GameEvent } from "../../const/EventConst";
import GameDataCenter from "../../GameDataCenter";
import { DeviceModule } from "../DeviceModule";

const KEY_ACCOUNT = 'account';

export default class AccountModel extends IDataModel {
    public _jwt: string = null;
    get jwt(): string {
        return this._jwt;
    }
    set jwt(v: string) {
        this._jwt = v;
        AccountModel.staticJwt = v;
    }

    public static staticJwt: string = null;
    public uid: number = null;
    public yangzhengma: string = "1";
    public stops: number = null;
    public shareUrl: string = ""

    public xieyi;
    public zhengce;
    public xieyiEn;
    public zhengceEn;

    public bankName;
    public bankNum;
    public bankRealName;

    constructor() {
        super('account');
    }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['logins']: (msg) => { this.G2C_LoginSuccess(msg) },
            // ['hall_register']: (msg) => { this.G2C_ZhuceSuccess(msg) },
            ['smsCode']: (msg) => { this.G2C_YanzhengmaSuccess(msg) },

            ['hall_wxlogin']: (msg) => { this.G2C_WxLoginSuccess(msg) },
            ['hall_getmyinfo']: (msg) => { this.G2C_getUserInfo(msg) },
            ['hall_phonelogin']: (msg) => { this.G2C_PhoneLogin(msg) },
            ['hall_register']: (msg) => { this.G2C_Register(msg) },
            ['hall_resetpwd']: (msg) => { this.G2C_ResetPwd(msg) },
            ['hall_sendsms']: (msg) => { this.G2C_sendCode(msg) },
            ['hall_about']: (msg) => { this.G2C_GetAboutSuccess(msg) },

            ['mine_bindphone']: (msg) => { this.G2C_BindPhone(msg) },
            ['mine_authorization']: (msg) => { this.G2C_getAliRealNameCall(msg) },

            ['personal_getNotice']: (msg) => { this.G2C_GetGonggaoSuccess(msg) },

            ['hall_getversion']: (msg) => { this.G2C_checkVersion(msg) },
            ['hall_getagreement']: (msg) => { this.G2C_getAgreement(msg) },
        }
    }

    getNowTime() {
        var params = {
        }

        this.sendHttpMsg("hall/systemTime", params)
    }
    wxLogin() {
        if (!cc.sys.isNative) {
            let code = window.location.search.split("=")[1];
            var params = {
                code: code ? code : "1814730"
            }
            this.sendHttpMsg("hall/wxlogin", params)
        } else {
            DeviceModule.getInstance().wxLogin()
        }
    }
    GetUserWxlogin(_code) {
        let shangji = cc.sys.localStorage.getItem("shangji")
        if (isNaN(Number(shangji))) {
            shangji = "";
        }
        var params = {
            code: _code,
            sjuid: shangji
        }

        this.sendHttpMsg("hall/wxlogin", params)
    }
    deviceid;
    G2C_WxLoginSuccess(msg) {
        console.log("G2C_WxLoginSuccess",msg);
        this.jwt = msg["data"]["jwt"];
        this.uid = msg["data"]["user"]["id"];
        this.deviceid = msg['data']['deviceid'];
        console.log('====================G2C_WxLoginSuccess');
        // if (msg.data.user.phone == null || msg.data.user.phone == "") {
        //     EventMng.emit(GameEvent.NEED_BIND_PHONE);
        //     return;
        // }
        console.log('====================NEED_BIND_PHONE');

        cc.sys.localStorage.setItem("yyOpneid", this.jwt)
        // EventMng.emit(GameEvent.LOGIN_SUCCESS);

        this.getUserInfo(this.jwt)
    }
    getUserInfo(_code) {
        var params = {
            jwt: _code
        }
        this.jwt = _code
        this.sendHttpMsg("hall/getmyinfo", params)
    }
    G2C_getUserInfo(msg) {
        this.shareUrl = msg["data"]["share"]
        this.uid = msg["data"]["user"]["id"];
        EventMng.emit(GameEvent.LOGIN_SUCCESS);

        console.log(`uid: ${this.uid}`);
    }


    //支付宝实名
    aliRealName(code) {
        var params = {
            auth_code: code
        }

        this.sendHttpMsg("mine/authorization", params)
    }
    G2C_getAliRealNameCall(msg) {
        console.log("实名认证回调");
        console.log(msg);
        UIHelp.ShowTips("实名认证成功")
        EventMng.emit(GameEvent.ALIREALNAME);
    }

    // 发送验证码
    sendCode(phone, type = 'register') {
        var params = {
            phone: phone,
            type: type
        }
        this.sendHttpMsg("hall/sendsms", params);
    }
    G2C_sendCode(msg) {
        UIHelp.ShowTips("验证码发送成功");
    }

    phoneRegister(phone, pass, pass2, code) {
        var params = {
            phone: phone,
            password: pass,
            sendpassword: pass2,
            code: code,
        }
        this.sendHttpMsg("hall/register", params);
    }
    G2C_Register(msg) {
        UIHelp.ShowTips("注册成功，请登录");
        EventMng.emit(GameEvent.REGISTER_SUCCESS);
    }

    // hall/resetpwd
    resetPwd(phone, pass, code) {
        var params = {
            phone: phone,
            code: code,
            password: pass,
        }
        this.sendHttpMsg("hall/resetpwd", params);
    }
    G2C_ResetPwd(msg) {
        UIHelp.ShowTips("修改成功");
        EventMng.emit(GameEvent.RESET_SUCCESS);
    }

    // 绑定手机
    bindPhone(phone, phoneCode) {
        var params = {
            phone: phone,
            phonecode: phoneCode
        }
        this.sendHttpMsg("mine/bindphone", params);
    }
    G2C_BindPhone(msg) {
        console.log(msg);
        UIHelp.ShowTips("绑定成功");
        EventMng.emit(GameEvent.BINDPHONE_SUCCESS);
        this.getUserInfo(this.jwt)
    }

    phoneLogin(phone, pass, code) {
        var params = {
            phone: phone,
            password: pass,
            code: code
        }
        if (!code) {
            delete params.code;
        }
        if (!pass) {
            delete params.password;
        }
        this.jwt = null;
        this.sendHttpMsg("hall/phonelogin", params);
    }
    G2C_PhoneLogin(msg) {
        this.uid = msg["data"]["user"]["id"];
        this.jwt = msg["data"]["jwt"];
        this.stops = msg["stops"];

        GameDataCenter.player.config = msg["data"]["config"];
        if (msg.status == 1) {
            UIHelp.ShowTips(UIHelp.getZhEnTips("该账户处于封禁状态"))
            return;
        }

        cc.sys.localStorage.setItem("yyOpneid", this.jwt);
        this.getUserInfo(this.jwt);
    }

    /**请求登录 */
    Login(phone: string, password: string) {
        var params = {
            phone: phone,
            password: password
        };

        if (!phone) {
            if (CC_DEBUG) {
                params.phone = "13677777777";
            } else {
                UIHelp.ShowTips(UIHelp.getZhEnTips("请输入账号"))
                return;
            }
        }

        if (!password) {
            if (CC_DEBUG) {
                params.password = "123456";
            } else {
                UIHelp.ShowTips(UIHelp.getZhEnTips("请输入密码"))
                return;
            }
        }

        this.stops = null;

        this.sendHttpMsg("logins", params)
    }

    /**登录成功 */
    G2C_LoginSuccess(msg) {
        this.uid = msg["data"]["user"]["id"];
        this.jwt = msg["data"]["jwt"];
        this.stops = msg["stops"];

        GameDataCenter.player.config = msg["data"]["config"];
        // GameDataCenter.shop.initData(msg["data"]["config"]["goods"]);

        // GameDataCenter.siliaoku.initData(msg["data"]["configs"]["costs"]);

        // GameDataCenter.player.costs = msg["data"]["configs"]["costs"];
        // GameDataCenter.animal.initAnimal(msg["data"]["pet"]);
        if (msg.status == 1) {
            UIHelp.ShowTips(UIHelp.getZhEnTips("该账户处于封禁状态"))
            return;
        }
        EventMng.emit(GameEvent.LOGIN_SUCCESS);
    }

    sendYanzhengma(phone: string) {
        if (phone == "") {
            UIHelp.ShowTips(UIHelp.getZhEnTips("请输入账号"))
            return;
        }
        var params = {
            phone: phone
        }

        this.sendHttpMsg("smsCode", params)
    }

    G2C_YanzhengmaSuccess(msg) {
        EventMng.emit(GameEvent.YANZHENFMA_SUCCESS);
    }

    /**
     * 注册接口
     * @param params 参数：phone手机号,password密码,realname真实姓名,idnumber身份证号,new_password二次密码,code验证码,inviteCode邀请码
     * @returns 
     */
    zhuce(params) {
        this.sendHttpMsg("hall/register", params)
    }

    G2C_ZhuceSuccess(msg) {
        UIHelp.ShowTips(UIHelp.getZhEnTips("注册成功，请手动登陆"))
        // // EventMng.emit(GameEvent.ZHUCE_SUCCESS);
        // GameDataCenter.account.uid = msg["data"]["user"]["id"];
        // GameDataCenter.account.jwt = msg["data"]["jwt"];
        // GameDataCenter.account.stops = msg["stops"];

        // // GameDataCenter.player.config = msg["data"]["config"];
        // // GameDataCenter.shop.initData(msg["data"]["config"]["goods"]);

        // // GameDataCenter.siliaoku.initData(msg["data"]["configs"]["costs"]);

        // // GameDataCenter.player.costs = msg["data"]["configs"]["costs"];
        // // GameDataCenter.animal.initAnimal(msg["data"]["pet"]);

        // if (msg.status == 1) {
        //     UIHelp.ShowTips(UIHelp.getZhEnTips("该账户处于封禁状态"))
        //     return;
        // }
        EventMng.emit(GameEvent.ZHUCE_SUCCESS);
        // EventMng.emit(GameEvent.GET_CHATS_SUCCESS);
    }

    G2C_WangjiMimaSuccess(msg) {
        UIHelp.ShowTips(UIHelp.getZhEnTips("重置密码成功"))
        EventMng.emit(GameEvent.WANGJI_MIMA_SUCCESS);
    }

    /**用户协议隐私政策 */
    about() {
        var params = {

        }
        this.sendHttpMsg("hall/about", params)
    }

    G2C_GetAboutSuccess(msg) {
        this.xieyi = msg.about.user;
        this.zhengce = msg.about.privacy;
        this.xieyiEn = msg.about.user_en
        this.zhengceEn = msg.about.privacy_en;

        this.bankName = msg.about.bank_name;
        this.bankNum = msg.about.bank_number;
        this.bankRealName = msg.about.realname;
    }

    /**获取公告 */
    getGonggao() {
        var params = {

        }
        this.sendHttpMsg("personal/getNotice", params)
    }

    G2C_GetGonggaoSuccess(msg) {
        if (cc.sys.localStorage.getItem("language") == "zh") {
            EventMng.emit(GameEvent.GET_GONGGAO_SUCCESS, msg.data.notice)
        } else {
            EventMng.emit(GameEvent.GET_GONGGAO_SUCCESS, msg.data.notice_en)
        }
    }

    checkVersion() {
        var params = {};
        this.sendHttpMsg("hall/getversion", params);
    }
    G2C_checkVersion(msg) {
        console.log(msg.data);
        EventMng.emit(GameEvent.CHECK_VERSION_SUCCESS, msg.data);
    }

    getAgreement() {
        var params = {};
        this.sendHttpMsg("hall/getagreement", params);
    }
    G2C_getAgreement(msg) {
        console.log(msg.data);
        EventMng.emit(GameEvent.GET_AGREEMENT_SUCCESS, msg.data);
    }
}