import EventMng from "../../manager/EventMng";
import GameDataCenter from "../../data/GameDataCenter";
import GameController from "../../GameController";

export interface UIClass<T extends UIBase> {
    new(): T;
    getUrl(): string;
    getName(): string;
}

interface RegisterEvent {
    callback: Function,
    target?: any,
    playAudio?: boolean,
}

const PREFAB_UI_DIR = 'prefab/';

const { ccclass, property } = cc._decorator;
@ccclass
export default abstract class UIBase extends cc.Component {
    protected static prefabUrl;
    protected static className;

    protected mTag: any;
    public get tag(): any {
        return this.mTag;
    }
    public set tag(value: any) {
        this.mTag = value;
    }

    /**
     * 得到prefab的路径，相对于resources目录
     */
    public static getUrl(): string {
        return PREFAB_UI_DIR + this.prefabUrl;
    }

    /**
     * 类名，用于给UI命名
     */
    public static getName(): string {
        return this.className;
    }

    /**通知事件列表 */
    private _notifyEventList: Map<string, Function>;
    /**点击事件列表 */
    private _registerEventList: Map<string, any>;

    /* ----------------------------- 以下方法不能在子类重写 ----------------------------- */
    /**初始化函数，在onLoad之前被调用，params为打开ui是传入的不定参数数组 */
    init(params) {
        this.onInit(params);
    }

    /**onLoad 会在组件被首次加载的时候被回调。且优先于任何start */
    onLoad() {
        this._notifyEventList = new Map<string, Function>();
        this._registerEventList = new Map<string, any>();

        this.onUILoad();
    }

    onDestroy() {
        this.onUIDestroy();
    }

    onEnable() {
        this.onShow();
    }

    onDisable() {
        this.onHide();

        let self = this;
        this._notifyEventList.forEach((f, key) => {
            EventMng.off(key, f, self);
        }, this);
        this._notifyEventList.clear();

        this._registerEventList.forEach((f, key) => {
            f["node"].off(f["type"]);
        }, this);
        this._registerEventList.clear();
    }

    /**注册notice事件，disable的时候会自动移除 */
    initEvent(eventName: string, cb: Function) {
        console.log('eventName', eventName);
        EventMng.on(eventName, cb, this);
        this._notifyEventList.set(eventName, cb);
    }

    private touchEvent(event) {
        event.stopPropagation();
    }

    start() {
        this.onStart();
        this.scheduleOnce(() => {
            this.onAfterStart();
        }, 0);
    }

    update(dt) {
        this.onUpdate(dt);
    }
    /* ---------------------------------------------------------------------------------- */


    onInit(params) {

    }

    onUILoad() {

    }

    onUIDestroy() {

    }

    onShow() {

    }

    onHide() {

    }

    onStart() {

    }

    onAfterStart() {

    }

    onUpdate(dt) {

    }

    onClose() {

    }


    /**
     * 注册touch事件
     * @param node 
     * @param callback 
     * @param target 
     * @param playAudio 是否播放音效，默认播放
     */

    onRegisterEvent(node: cc.Node, callback, audioclip = 'ui_click', playAudio = true) {
        var btn = node.getComponent(cc.Button);
        var toggle = node.getComponent(cc.Toggle);
        var self = this;

        if (!node) {
            console.error("no node");
            return;
        }

        if (btn) {
            btn.node.on("click", () => {
                if (playAudio && GameDataCenter.setting) {
                    GameDataCenter.setting.playSFX(audioclip);
                }

                callback.call(self, btn);
            }, self);

            this._registerEventList.set(node.uuid, { node: node, type: "click" });
        } else if (toggle) {
            toggle.node.on("toggle", () => {
                if (playAudio && GameDataCenter.setting) {
                    GameDataCenter.setting.playSFX(audioclip);
                }

                callback.call(self, toggle);
            }, self);

            this._registerEventList.set(node.uuid, { node: node, type: "toggle" });
        } else {
            console.error("not btn or toggle");
        }
    }

    unRegisterEvent(node: cc.Node, callback, target = null, playAudio = true) {

        // var btn = node.getComponent(cc.Button);
        // if(btn){
        //     btn.node.off("click");
        // }else{
        //     node.off(cc.Node.EventType.TOUCH_END, callback, target);
        // }
    }
}