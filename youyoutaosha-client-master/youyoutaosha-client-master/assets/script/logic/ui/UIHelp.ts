import UIMng from "../../manager/UIMng";
import UIBase, { UIClass } from "./UIBase";
import { ViewZorder } from "../../data/const/ViewZOrder";
import UITips from "./tips/UITips";
import UIConfirmDialog from "./tips/UIConfirmDialog";
import UILoading from "./loading/UILoading";
import { tipsEnlish, tipsKorean } from "../../data/conF/GameConfiguration";
import { QRCode } from "../../data/model/Common/Qrcode";
import UIConfirmDialogWithCancel from "./tips/UIConfirmDialogWithCancel";

/**确定框界面参数 */
export interface DialogParams {
    title: string,
    content: string,
    okLabel?: string,
    certainCb?: Function,
    cancelCb?: Function
}

export default class UIHelp {

    /** 取档方法 */
    public static getItem(key) {
        let value = cc.sys.localStorage.getItem(key);
        if (value != null) {
            if (value.indexOf('{') == 0) {//判断变量m是不是json对象
                return JSON.parse(value);
            }
            return value;
        }
        return null;
    }

    /** 存档方法 */
    public static setItem(key, value) {
        if (typeof (value) == 'string') {
            cc.sys.localStorage.setItem(key, value);
        } else {
            let item = JSON.stringify(value);
            cc.sys.localStorage.setItem(key, item);

        }
    }

    /** 中韩互译 */
    public static getZhEnTips(str) {
        if (cc.sys.localStorage.getItem("language") == "zh") {
            return str;
        } else {
            return tipsKorean[str]
        }
    }

    public static SetLabel(node: cc.Node, value: string | number) {
        if (typeof value === 'number') {
            value = value.toString();
        } else if (value == undefined) {
            value = "";
        }
        // 文本和富文本只能二选一
        if (node.getComponent(cc.RichText)) {
            let defaultColor = node.color.toHEX('#rrggbb');
            node.getComponent(cc.RichText).string = `<color=${defaultColor}>${value}</c>`;
        } else if (node.getComponent(cc.EditBox)) {
            node.getComponent(cc.EditBox).string = value;
        } else {
            node.getComponent(cc.Label).string = value;
        }
    }

    public static SetLabelColor(node: cc.Node, color: cc.Color) {
        node.getComponent(cc.Label).node.color = color;
    }

    public static GetEditBoxStr(node: cc.Node) {
        return node.getComponent(cc.EditBox).string;
    }

    public static SetProgressBar(node: cc.Node, progress: number) {
        if (typeof progress != 'number') {
            return console.log("参数错误");
        }

        node.getComponent(cc.ProgressBar).progress = progress;
    }

    public static CreateSprite(spriteFrame) {
        //创建一个新的节点，因为cc.Sprite是组件不能直接挂载到节点上，只能添加到为节点的一个组件
        var node = new cc.Node('myNode')
        //调用新建的node的addComponent函数，会返回一个sprite的对象
        const sprite = node.addComponent(cc.Sprite)
        //给sprite的spriteFrame属性 赋值
        sprite.spriteFrame = spriteFrame

        return node;
    }

    public static drawErweima(node: cc.Node, url: string) {
        var qrcode = new QRCode(-1, 2);
        qrcode.addData(url);
        qrcode.make();

        var ctx = node.addComponent(cc.Graphics);

        console.log('qrcode.getModuleCount() = ' + qrcode.getModuleCount());
        // compute tileW/tileH based on node width and height
        var tileW = node.width / qrcode.getModuleCount();
        var tileH = node.height / qrcode.getModuleCount();

        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                // ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                if (qrcode.isDark(row, col)) {
                    ctx.fillColor = cc.Color.BLACK;
                } else {
                    ctx.fillColor = cc.Color.WHITE;
                }
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                ctx.fill();
            }
        }
    }

    public static SetSpriteFrame(node: cc.Node, dAtlas: cc.SpriteAtlas | string, imgPath: string = "") {
        return new Promise<void>((resolve, reject) => {
            if (typeof dAtlas === 'string') {
                if (dAtlas.slice(dAtlas.length - 4) == ".png") {
                    cc.loader.load(dAtlas, function (err, texture) {
                        if (!err) {
                            var frame = new cc.SpriteFrame(texture);
                            if (node.name != "") {
                                node.getComponent(cc.Sprite).spriteFrame = frame;
                            }
                            resolve();
                        } else {
                            console.log("加载头像失败");
                            reject();
                        }
                    });
                } else {

                    cc.loader.load({ url: dAtlas, type: 'png' }, function (err, texture) {
                        if (err) return;
                        if (!err) {
                            var frame = new cc.SpriteFrame(texture);
                            if (node.name != "") {
                                node.getComponent(cc.Sprite).spriteFrame = frame;
                            }
                            resolve();
                        } else {
                            console.log("加载头像失败");
                            reject();
                        }
                    });
                }
            } else {
                let framec = dAtlas.getSpriteFrame(imgPath);
                if (node.name != "") {
                    node.getComponent(cc.Sprite).spriteFrame = framec;
                }
                resolve();
            }
        });
    }

    /**按钮灰化，只有注册click事件，才会真正被禁用 */
    public static SetBtnGrayState(node: cc.Node, isGray) {
        let button = node.getComponent(cc.Button);
        if (!button) {
            return;
        }
        button.interactable = !isGray;
        button.enableAutoGrayEffect = isGray;
    }

    public static IsBtnGray(node: cc.Node) {
        let button = node.getComponent(cc.Button);
        if (!button) {
            return false;
        }
        return !button.interactable;
    }

    public static ShowUI<T extends UIBase>(uiClass: UIClass<T>, callback?: Function, ...args: any[]) {
        console.table({ name: uiClass.name });
        UIMng.getInstance().openUI(uiClass, ViewZorder.UI, callback, null, ...args);
    }
    // public static ShowAddUI(addNode:cc.Node) {
    //     let scrollView = cc.find("pop/ScrollView").getComponent(cc.ScrollView)
    //     if (scrollView) {
    //         let content = scrollView.content
    //         content.removeAllChildren()
    //         content.addChild(addNode)
    //     }
    // }
    public static ShowLoding() {
        cc.find("loding").getComponent("UILoading").showLoding();
    }

    public static CloseLoding() {
        cc.find("loding").getComponent("UILoading").hideLoding();
    }

    public static CloseUI<T extends UIBase>(uiClass: UIClass<T>) {
        UIMng.getInstance().closeUI(uiClass);
    }

    public static IsShowingUI<T extends UIBase>(uiClass: UIClass<T>) {
        return UIMng.getInstance().isShowing(uiClass);
    }

    public static ShowTips(message: string, ...param: any[]) {
        let tipUI = UIMng.getInstance().getUI(UITips) as UITips;
        if (!tipUI) {
            UIMng.getInstance().openUI(UITips, ViewZorder.Tips, (ui) => {
                UIHelp.ShowTips(message);
            });
        } else {
            tipUI.showTip(message);
        }
    }

    public static ShowDialog(data: DialogParams) {
        if (!data.cancelCb) {
            UIMng.getInstance().openUI(UIConfirmDialog, ViewZorder.Dialog, null, null, data);
        } else {
            UIMng.getInstance().openUI(UIConfirmDialogWithCancel, ViewZorder.Dialog, null, null, data);
        }
    }


    public static loadPng(node: cc.Node, url: string) {
        let sprite: cc.Sprite = node.getComponent(cc.Sprite);
        if (!sprite) sprite = node.addComponent(cc.Sprite);
        cc.loader.load({ url, type: 'png' }, (err, texture) => {
            if (err) return;
            let spf: cc.SpriteFrame = new cc.SpriteFrame(texture);
            sprite.spriteFrame = spf;
            this.resetImageSize(node, texture);
        });
    }

    /**
     * 将精灵在一个安全区域内做响应式适配
     * @param node 图片所在节点
     * @param tex 原始图片
     */
    public static resetImageSize(node: cc.Node, tex: cc.Texture2D | cc.Rect): cc.Size {
        let safeSize: cc.Size;
        if (node['rSize']) {
            safeSize = node['rSize'];
        } else {
            safeSize = node.getContentSize();;
        }
        let imgSize: cc.Size = new cc.Size(tex.width, tex.height);
        let safeProp: number = safeSize.width / safeSize.height;
        let imgProp: number = imgSize.width / imgSize.height;
        let newSize: cc.Size = new cc.Size(0, 0);
        if (safeProp >= imgProp) {
            //height
            newSize.height = safeSize.height;
            newSize.width = safeSize.height / imgSize.height * imgSize.width;
        } else {
            //width
            newSize.width = safeSize.width;
            newSize.height = safeSize.width / imgSize.width * imgSize.height;
        }
        node['rSize'] = safeSize;
        console.log(newSize);
        node.height = newSize.height;
        node.width = newSize.width;
        // node.setContentSize(newSize);
        return newSize;
    }

    public static resetImageSizeOnlyNode(node: cc.Node) {
        let sprite: cc.Sprite = node.getComponent(cc.Sprite);
        if (!sprite) {
            console.error('can`t find sprite');
            return;
        }
        let texture: cc.Texture2D = sprite.spriteFrame.getTexture();
        this.resetImageSize(node, texture);
    }
}
