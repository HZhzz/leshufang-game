import { SocketDelegate } from "./SocketDelegate";
import { Log } from "../utils/Log";
import { Utils } from "../utils/Utils";
import { Http } from "./Http";
import EventMng from "../manager/EventMng";
import GameController from "../GameController";
import GameDataCenter from "../data/GameDataCenter";
import UIHelp from "../logic/ui/UIHelp";
import { ConfigModule } from "../data/model/ConfigModule";
import { Base64 } from "js-base64";

export class Network {
    private _socket: SocketDelegate = null;
    private _url: string = ConfigModule.WS_URL;
    private _httpurl: string = ConfigModule.HTTP_URL;
    private _httpurltest: string = ConfigModule.HTTP_URL_LOCAL;

    constructor() {
        // this.safeConnectSocket();
    }

    close() {
        this.safeCloseSocket();
    }

    send(msg) {
        if (!this._socket.isSocketOpened()) {
            Log.error('send message but socket not open!')
            return;
        }
        this._socket.send(msg);
    }

    connect() {
        this.safeConnectSocket();
    }

    private safeConnectSocket() {
        if (this._socket != null) {
            this._socket.closeConnect();
        }
        this._socket = new SocketDelegate();
        this._socket.connect(this._url);
    }

    private safeCloseSocket() {
        if (this._socket != null) {
            this._socket.closeConnect();
        }
        this._socket = null;
    }


    randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt((Math.random() * minNum + 1) + '', 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }

    //http请求
    httpSend(cmd, params, loding) {
        var self = this;

        // if(loding){
        //     UIHelp.ShowLoding();
        // }

        if (params && GameDataCenter.account.jwt) {
            params["jwt"] = GameDataCenter.account.jwt;
        }

        if (params && GameDataCenter.account.uid) {
            params["uid"] = GameDataCenter.account.uid;
        }

        if (params && ConfigModule.VERSION_CODE) {
            params['isnew'] = ConfigModule.VERSION_CODE;
        }
        let md5 = require('md5');
        let randStr: string = this.randomNum(10000, 99999) + '&' + this.randomNum(10000, 99999);
        randStr = md5(randStr);
        let key: string = "@&hsSAaaxsUDH2d812heusdaaqwwshd)I()@hd8wD";
        params['deviceid'] = GameDataCenter.account.deviceid;
        params['noncestr'] = randStr;
        let timestamp: number = Math.ceil(new Date().getTime() / 1000);
        params['timestamp'] = timestamp;
        var param = Utils.obj_contact(params);
        let strPar = param;
        strPar = strPar.replace("?", "");
        let sign = md5(strPar + key);
        sign = Base64.encode(sign).toLowerCase();
        var url = encodeURI(self._httpurl + "/" + cmd + param);





        Http.get(url, param, GameDataCenter.account.deviceid, randStr, timestamp, sign, (eventName: string, xhr: XMLHttpRequest) => {
            // if(loding){
            //     UIHelp.CloseLoding();
            // }
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    let replace = cmd.replace(/\//g, '_')
                    console.log('_____httpSend:', url)
                    console.log(`_____:${replace}`, JSON.stringify(response))

                    //-------所有请求回调都带有user，刷新user数据， 可修改----------
                    if (response["errcode"]) {
                        console.error('errcode', response, response['errcode']);
                        if (response["errcode"] == 3) {
                            UIHelp.ShowTips(response["msg"]);
                        } else if (response["errcode"] == 4) {
                            UIHelp.ShowTips(UIHelp.getZhEnTips("服务器更新中..."));
                            cc.director.loadScene("loginScene");
                        } else {
                            if (response["errcode"] == 1) {
                                cc.director.loadScene("loginScene");
                            }
                            UIHelp.ShowTips(response["errmsg"]);
                            // if (cc.sys.localStorage.getItem("language") == "zh") {
                            //     UIHelp.ShowTips(response["errmsg"]);
                            // } else {
                            //     UIHelp.ShowTips(response["errmsgen"]);
                            // }

                            // UIHelp.ShowTips(UIHelp.getZhEnTips(`${response["errmsg"]}`));
                        }

                        return;
                    }

                    if (GameDataCenter.account.stops != null && GameDataCenter.account.stops != response["stops"]) {
                        UIHelp.ShowTips(UIHelp.getZhEnTips("服务器更新中..."));
                        cc.director.loadScene("loginScene");
                    }

                    if (response["data"] && response["data"]["fuser"]) {
                        GameDataCenter.player.initData(response["data"]["fuser"]);
                        GameDataCenter.player.initDataF(response["data"]["user"]);
                    } else if (response["data"] && response["data"]["user"]) {
                        GameDataCenter.player.initData(response["data"]["user"]);
                    }

                    if (response["data"] && response["data"]["seeds"]) {
                        GameDataCenter.player.seeds = response["data"]["seeds"][0];
                    }

                    // if (response["data"] && response["data"]["landsF"]) {
                    //     GameDataCenter.animal.initData(response["data"]["landsF"]);
                    // } else if (response["data"] && response["data"]["land"]) {
                    //     GameDataCenter.animal.initData(response["data"]["land"]);
                    // }

                    if (response["today"]) {
                        GameDataCenter.player.today = response["today"];
                    }

                    if (response["systemTime"]) {
                        GameDataCenter.player.serverTime = response["systemTime"];
                    }
                    //-------所有请求回调都带有user，刷新user数据， 可修改----------

                    EventMng.emit(replace, response);
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                this.et.emit('TIMEOUT', {})
                cc.log("添加提示连接网关超时")
            } else if (eventName == 'ERROR') {
                //TODO:添加提示连接网关发生错误
                cc.log("添加提示连接网关发生错误")
            }
        }, this);
    }

    httpPost(cmd, params) {
        var self = this;

        UIHelp.ShowLoding();

        // console.log(url)
        // console.log(reqData)
        //1.拼接请求参数
        var param = "";
        for (var item in params) {
            param += item + "=" + params[item] + "&";
        }
        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // UIHelp.CloseLoding();
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    let replace = cmd.replace(/\//g, '_')
                    // console.log(response)
                    if (response) {
                        if (response["errcode"]) {
                            UIHelp.ShowTips(response["errmsg"]);
                            return;
                        }

                        var responseJson = JSON.parse(response);
                        EventMng.emit(replace, responseJson);
                    } else {
                        console.log("返回数据不存在")
                    }
                } else {
                    console.log("请求失败")
                }
            }
        };
        xhr.open("POST", self._httpurltest + "/" + cmd, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(param);//reqData为字符串形式： "key=value"
    }
}