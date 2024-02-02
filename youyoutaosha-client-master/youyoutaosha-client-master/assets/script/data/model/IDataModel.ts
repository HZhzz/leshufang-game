import EventMng from "../../manager/EventMng";
import GameController from "../../GameController";

export default class IDataModel {
    protected modelName: string = 'default';

    /**
     * 本地缓存的数据
     */
    private _dLocalData = {};

    constructor(modelName = 'default') {
        this.modelName = modelName;
        this.LoadStorage();
        this.registerListeners();
    }

    clear() {

    }

    /**
     * 注册网络监听事件
     */
    private registerListeners() {
        let tbMsg = this.getMessageListeners();
        for (const key in tbMsg) {
            if (tbMsg.hasOwnProperty(key)) {
                EventMng.on(key.toString(), function (msg) {
                    tbMsg[key](msg);
                })
            }
        }
    }

    /**
     * 子类需要重写此方法，返回需要注册的监听事件
     */
    getMessageListeners() {
        return {};
    };


    /**
     * 发送协议
     * @param msg 
     */
    sendProtocolMsg(msg) {
        try {
            GameController.network.send(msg);
        } catch (e) {
            console.error('send proto', msg, e);
        }
    }

    /**
     * 发送http协议
     * @param msg 
     */
    sendHttpMsg(cmd, msg, loding: boolean = true) {
        // console.error('cmd', cmd, 'msg', msg);
        try {
        GameController.network.httpSend(cmd, msg, loding);
        } catch (e) {
            console.error('send http proto', msg, e);
        }
    }

    postHttpMsg(cmd, msg) {
        try {
            GameController.network.httpPost(cmd, msg);
        } catch (e) {
            console.error('send http proto', msg, e);
        }
    }

    protected LoadStorage() {
        var self = this;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.getStorage({
                key: `model_${this.modelName}`,
                success(res) {
                    let data = JSON.parse(res.data);

                    if (!data || data === "") {
                        self._dLocalData = {}
                        self.Save();
                    } else {
                        self._dLocalData = data;
                    }
                }
            })
        } else {
            let data = JSON.parse(cc.sys.localStorage.getItem(`model_${this.modelName}`));

            if (!data || data === "") {
                this._dLocalData = {}
                this.Save();
            } else {
                this._dLocalData = data;
            }
        }
    }

    /**
     * protected 只让实现类操作数据  也就是model类型操作数据 对外提供别的方法
     * @param sKey 
     * @param defaultValue 
     */
    protected Query(sKey: string, defaultValue: any = null) {
        if (this._dLocalData[sKey] != undefined) {
            return this._dLocalData[sKey];
        }
        return defaultValue;
    }

    /**
     * 设置成功返回 true，反之返回 false 用于是否保存数据
     * @param sKey 
     * @param value
     */
    protected Set(sKey: string, value: string | number) {
        if (this._dLocalData[sKey] && this._dLocalData[sKey] == value) {
            return false;//一样就不要改了
        }
        this._dLocalData[sKey] = value;
        return true;
    }

    protected Save() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.setStorage({
                key: `model_${this.modelName}`,
                data: JSON.stringify(this._dLocalData)
            })
        } else {
            cc.sys.localStorage.setItem(`model_${this.modelName}`, JSON.stringify(this._dLocalData));
        }
    }
}
