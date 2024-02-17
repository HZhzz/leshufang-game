import UIHelp from "../../logic/ui/UIHelp";
import EventMng from "../../manager/EventMng";
import { GameEvent } from "../const/EventConst";
import GameDataCenter from "../GameDataCenter";


export class DeviceModule {
    private AndroidClassPath = 'org/cocos2dx/javascript/DeviceModule';    //需要修改为DeviceModule对应的位置
    private AliClassPath = 'org/cocos2dx/javascript/AliModule';
    private AndroidCommonClassPath = 'org/cocos2dx/javascript/AppActivity';
    private static instance: DeviceModule;
    public static _clipCallback: Function;

    constructor() {
    }

    //获取这个单例
    static getInstance() {
        if (!this.instance) {
            this.instance = new DeviceModule();
        }
        return this.instance;
    }
    //获取设备名字
    public getDeviceName() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getDeviceName",
                "()Ljava/lang/String;");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "getDeviceName");
        }
        return 'win32';
    }

    //系统类型
    getOsType() {
        var os = '';
        switch (cc.sys.os) {
            case cc.sys.OS_WINDOWS:
                os = 'windows';
                break;
            case cc.sys.OS_ANDROID:
                os = 'android';
                break;
            case cc.sys.OS_IOS:
                os = 'ios';
                break;
            default:
                break;
        }
        return os;
    }

    //获取手机操作系统版本信息
    getSystemVersion() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getSystemVersion",
                "()Ljava/lang/String;");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "getSystemVersion");
        }
        return '1';
    }

    //获取UserToken 设备识别码
    getUserToken() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getUserToken",
                "()Ljava/lang/String;");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "getUserToken");
        }
        return '11111111111';
    }

    //获取应用的vercode
    getAppVerCode() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getAppVerCode",
                "()Ljava/lang/String;");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "getAppVerCode");
        }
        return '19';
    }

    //获取app版本号
    getAppVersion() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getAppVersion",
                "()Ljava/lang/String;");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "getAppVersion");
        }
        return '1.0.1';
    }

    //获取电池电量 返回值是0-1之间的浮点数，1表示满电
    getBatteryLevel(): number {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getBatteryLevel",
                "()F");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "getBatteryLevel");
        }
        return 1;
    }

    //获取网络状态 返回结果为字符串 "wifi" "wwan" "none"
    //wifi是无线网络，wwan是移动网络流量 none是无网络
    getNetworkStatus() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getNetworkStatus",
                "()Ljava/lang/String;");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "getNetworkStatus");
        }
        return 'wifi';
    }

    //格式化时间戳
    strTimestamp() {
        var time = new Date();
        var date = time.getFullYear() + "-" +
            (time.getMonth() + 1) + "-" +
            (time.getDate()) + " ";
        var timeStr = '';
        if (time.getHours() < 10) {
            timeStr += '0';
        }
        timeStr += time.getHours() + ":";
        if (time.getMinutes() < 10) {
            timeStr += '0';
        }
        timeStr += time.getMinutes() + ":";
        if (time.getSeconds() < 10) {
            timeStr += '0';
        }
        timeStr += time.getSeconds();
        return date + timeStr;
    }

    mobileShake(timeMs) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "mobileShake",
                "(I)V", timeMs);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "mobileShake:", timeMs);
        }
    }

    //复制文字到粘贴板
    copyToClipboard(copyText) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "copyToClipboard",
                "(Ljava/lang/String;)V",
                copyText);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("DeviceModule", "copyToClipboard:", copyText);
        }
        else if(cc.sys.isBrowser){
            navigator.clipboard.writeText(copyText);   
        }
    }

    //获取粘贴板文字，安卓只能异步回调 否则某些机型会闪退
    getClipContent(callback) {
        console.log("getClipContent",JSON.stringify(callback),jsb)
        DeviceModule._clipCallback = callback;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "getClipContent",
                "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            let text = jsb.reflection.callStaticMethod("DeviceModule", "getClipContent");
            callback(text);
        }
    }

    //获取复制内容回调
    clipCallback(text) {
        console.log("clipCallback",text)
        if (DeviceModule._clipCallback) {
            DeviceModule._clipCallback(text);
        }
    }

    openWechat() {
        cc.sys.openURL('weixin://');
    }

    openQQ(qqStr) {
        cc.sys.openURL(`mqqwpa://im/chat?chat_type=wpa&uin=${qqStr}&version=1`);
    }

    openDingding() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            cc.sys.openURL('dingtalk://qr.dingtalk.com/ding/home.html');
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            cc.sys.openURL('dingtalk://');
        }
    }

    //打开系统设置
    openSysSetting() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "openSysSetting",
                "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("DeviceModule", "openSysSetting");
        }
    }

    //选择相册图片    
    selectPhoto() {
        let tmpPath = jsb.fileUtils.getWritablePath() + 'tmpPhoto.jpg';
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "selectPhoto",
                "(Ljava/lang/String;)V",
                tmpPath);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("DeviceModule", "selectPhoto:", tmpPath);
        } else {
            let path = jsb.fileUtils.getWritablePath() + 'tmpPhoto.jpg';
            cc.director.emit("SelectPhotoCallback", path);
        }
    }

    //选择相册回调
    selectPhotoCallback(result, path) {
        if (result) {
            cc.director.emit("SelectPhotoCallback", path);
            //获取远程图片地址 用于传递给服务器 实现更换头像等功能
            var url = cc.sys.localStorage.getItem("imageInfo")
            // console.log("url======>",url)
        } else {
            // console.log('选择相册失败');
        }
    }

    captureScreen() {
        let node = new cc.Node();
        node.parent = cc.director.getScene();
        let camera = node.addComponent(cc.Camera);
        camera.cullingMask = -2;

        let visibleSize = cc.view.getVisibleSize();
        let width = Math.floor(visibleSize.width);
        let height = Math.floor(visibleSize.height);
        node.x = width / 2;
        node.y = height / 2;

        let texture = new cc.RenderTexture();
        // 初始化纹理大小，如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        //cc.game._renderContext.STENCIL_INDEX8 36168
        texture.initWithSize(width, height, 36168);
        camera.targetTexture = texture;
        camera.render();

        let data = texture.readPixels();
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }

        let filePath = this.getScreenShotImagePath()

        let success = jsb["saveImageData"](picData, width, height, filePath);
        if (success) {
            console.log("save image data success, file: " + filePath);
            return filePath;
        }
        else {
            console.error("save image data failed!");
            return "";
        }


    }


    /**
     * shareNode 要截图的节点
     * hideNodes 要隐藏的节点列表
     * hasMask   是否含有Mask
     */
    shareScreenShoot(shareNode, hideNodes, hasMask) {
        if (!cc.sys.isNative) {
            return;
        }
        //如果待截图的场景中含有 mask，请使用下面注释的语句来创建 renderTexture
        var renderTexture;
        if (!hasMask) {
            renderTexture = cc.RenderTexture.create(shareNode.width, shareNode.height);
        } else {
            renderTexture = cc.RenderTexture.create(shareNode.width, shareNode.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        }
        //实际截屏的代码
        var position = shareNode.position;
        renderTexture.begin();
        shareNode.position = cc.v2(shareNode.width / 2, shareNode.height / 2);
        var setBtnVisible = function (hideNodes, active) {
            for (var index in hideNodes) {
                hideNodes[index].active = active;
            }
        }
        setBtnVisible(hideNodes, false);
        shareNode._sgNode.visit();
        renderTexture.end();
        var imagePath = this.getScreenShotImagePath();
        //saveToFile 是放在jsb.fileUtils.getWritablePath()的路径中，只能传入文件名。传不了路径
        renderTexture.saveToFile("ScreenShotShare.png", cc.ImageFormat.PNG, true, function () {
            if (jsb.fileUtils.isFileExist(jsb.fileUtils.getWritablePath() + "ScreenShotShare.png")) {
                if (cc.sys.os == cc.sys.OS_ANDROID) {//安卓的分享路径比较坑，只能重新写文件
                    var fileData = jsb.fileUtils.getDataFromFile(jsb.fileUtils.getWritablePath() + "ScreenShotShare.png");
                    jsb.fileUtils.writeDataToFile(fileData, imagePath);
                    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath() + "ScreenShotShare.png");//写了新文件后删除旧文件
                }
                //shareImage(imagePath);//微信分享接口，需要自己实现
                DeviceModule.getInstance().shareImage(imagePath)
            }
            shareNode.position = position;
            setBtnVisible(hideNodes, true);
        });
    }


    //安卓分享路径。。。坑
    getScreenShotImagePath() {
        var fullPath = jsb.fileUtils.getWritablePath() + 'share.png'; //拿到可写路径，将图片保存在本地，可以在ios端或者java端读取该文件
        // if (cc.sys.os == cc.sys.OS_ANDROID) {
        //     fullPath = '/sdcard/share.png';
        // }
        if (jsb.fileUtils.isFileExist(fullPath)) {
            jsb.fileUtils.removeFile(fullPath);
        }
        return fullPath;
    }

    saveFileToPhoto(path) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "saveFileToPhoto",
                "(Ljava/lang/String;)V",
                path);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("DeviceModule", "saveFileToPhoto:", path);
        }
    }

    wxLogin() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "wxLogin",
                "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "wxLogin");
        }
    }

    iphoneLogin() {
        jsb.reflection.callStaticMethod("AppController", "iphone_login");
    }

    // registerWX() {
    //     if (cc.sys.os === cc.sys.OS_ANDROID) {
    //         jsb.reflection.callStaticMethod(
    //             this.AndroidClassPath,
    //             "registerToWX",
    //             "(Ljava/lang/String;)V",
    //             ConfigModule.WX_APPID);
    //     } else if (cc.sys.os === cc.sys.OS_IOS) {
    //         jsb.reflection.callStaticMethod("AppController", "registerToWX:", ConfigModule.WX_APPID);
    //     }
    // }

    //微信登录
    wxLoginCallback(code: any) {
        console.log("微信登录code", code);
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            var _code = code;
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            var _code = code["CODE"];
        }

        GameDataCenter.account.GetUserWxlogin(_code);
    }

    getXxTea(code) {
        let _xxtea = xxtea.getInstance();    //获取实例
        let encrypt_data = _xxtea.strToHexCharCode(_xxtea.encrypt(code, "admin123456"))
        return encrypt_data
    }

    shareLink(url) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "ShareWeb",
                "(Ljava/lang/String;)V",
                url);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "shareLink:", url);
        }
    }

    shareImage(shareInfo) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "imageShare",
                "(Ljava/lang/String;)V",
                shareInfo);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "sendImageContent:", shareInfo);
        }
    }

    //支付宝实名
    goToAliRealName() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AliClassPath,
                "openAuthScheme",
                "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "openAliPay");
        } else if (!cc.sys.isNative) {
            console.log("请添加debug实名");
        }
    }


    AliCallback(ali_result, ali_openID) {

        if (ali_result) {
            GameDataCenter.account.aliRealName(ali_openID)
        }
        else{
            UIHelp.ShowTips("获取支付宝授权失败")
        }
      
    }

    bannerShow() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "loadBanner",
                "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("RootViewController", "showBannerVideo:", ConfigModule.BANNER_ID);
        }
    }

    bannerHide() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "closeBanner",
                "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("RootViewController", "closeBannerVideo");
        }
    }

    chuanshanjia_reward(ad_id) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            console.log('android 加载广告',ad_id);
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "loadAd",
                "(Ljava/lang/String;)V", ad_id);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "showRewardVideo:", ad_id);
        }
    }

    playVideoAd(ad_id) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "loadAd",
                "(Ljava/lang/String;)V", ad_id);
            // "(Ljava/lang/String;)V", "window.reward_callback");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // jsb.reflection.callStaticMethod("AppController", "showRewardVideo:",ad_id);
        }
    }

    chuanshanjia_chaping(ad_id) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "chuanShanJiaInsertAd",
                "(Ljava/lang/String;)V", ad_id);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "showInsertVideo:", ad_id);
        }
    }
    reward_callback(rewardinfo) {
        console.log("激励激励激励=>", JSON.stringify(rewardinfo))
        console.log(rewardinfo)
        // UIHelp.CloseLoding();
        if (Number(rewardinfo) == 1) {
            GameDataCenter.baseSdk.videoOver();
        } else {
            UIHelp.ShowTips("没有合适的广告")
            // EventMng.emit(GameEvent.NOT_SEE_AD)
        }
    }
    capture(actionNode: cc.Node) {
        let node = new cc.Node();
        node.parent = cc.director.getScene();
        node.width = cc.view.getVisibleSize().width;
        node.height = cc.view.getVisibleSize().height;

        //注意了，这里要讲节点的位置改为右上角，不然截图只有1/4
        node.x = node.width / 2;
        node.y = node.height / 2;

        let camera = node.addComponent(cc.Camera);
        // 设置你想要的截图内容的 cullingMask
        camera.cullingMask = -4;

        // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        let texture = new cc.RenderTexture();
        texture.initWithSize(node.width, node.height);
        camera.targetTexture = texture;

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        node.parent.scaleY = -1;  // 截图默认是y轴反转的，渲染前需要将图像倒过来，渲染完倒回去
        camera.render();
        node.parent.scaleY = 1

        // 这样我们就能从 RenderTexture 中获取到数据了
        let data = texture.readPixels();
        let width = texture.width;
        let height = texture.height;
        this.captureAction(actionNode, node, width, height); //做个截屏的动作
        let filePath = this.getScreenShotImagePath()
        let success = jsb.saveImageData(data, width, height, filePath);
        if (success) {
            // console.log("save image data success, file: " + filePath);
            return filePath;
        }
        else {
            console.error("save image data failed!");
            return "";
        }
    }

    //截屏动画
    captureAction(node, capture, width, height) {
        let scaleAction = cc.scaleTo(1, 0.3);
        let targetPos = cc.v2(width - width / 6, height / 4);
        let moveAction = cc.moveTo(1, targetPos);
        let spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
        let blinkAction = cc.blink(0.1, 1);
        node.runAction(blinkAction);
    }
    //微信支付
    gotoWXPay(info: any) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidCommonClassPath,
                "toWXPay",
                "(Ljava/lang/String;)V",
                info);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "toWXPay:", info);
        }
    }
    //支付宝支付
    gotoAliPay(info: any) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AliClassPath,
                "alipay",
                "(Ljava/lang/String;)V",
                info);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppController", "openAliPay");
        } else if (!cc.sys.isNative) {
            console.log("请添加debug实名");
        }
    }
    share_image() {
        // 新建一个 RenderTexture,如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.gfx.RB_FMT_S8);

        // 创建一个camera, 并且设置 camera 的 targetTexture 为新建的 RenderTexture
        // 这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        var node = new cc.Node();
        node.parent = cc.director.getScene();
        node.x = cc.visibleRect.width * 0.5
        node.y = cc.visibleRect.height * 0.5

        var camera = node.addComponent(cc.Camera);
        camera.targetTexture = texture;
        camera.enabled = true
        camera.cullingMask = -4;

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render();

        // 这样我们就能从 RenderTexture 中获取到数据了
        var data = texture.readPixels();

        // 获取到的截图数据是颠倒的，我们要处理data
        // 用 filpYImage 函数把图捋顺喽(该函数在第一部分第2条)
        var width = texture.width
        var height = texture.height
        console.log(width, height);

        var picData = this.filpYImage(data, width, height)

        camera.enabled = false
        node.removeFromParent()

        // 1、如果你想本地测试一下截图是否成功，可以打开下面这段注释
        // var spriteFrame = new cc.SpriteFrame()
        // spriteFrame.setTexture(texture)

        // var sprite_node = new cc.Node()
        // var sprite = sprite_node.addComponent(cc.Sprite)
        // sprite.spriteFrame = spriteFrame
        // cc.director.getScene().addChild(sprite_node)
        // sprite_node.x = 375;
        // sprite_node.y = 667;

        // 2、将截图传递给Native设备，设置一下可读写路径，并返回该路径
        var filePath = jsb.fileUtils.getWritablePath() + 'render_to_image.png';
        var succeed = jsb.saveImageData(picData, width, height, filePath)
        if (succeed) {
            console.log("saveImageData   succeed");
            // 路径设置成功之后，我们开始分享                
            // 调用java交互访问第二大部分的函数share_img
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "share_img", "(Ljava/lang/String;II)V", filePath, width, height);

            // jsb.reflection.callStaticMethod
            //     (
            //         packageName.replace(/\./g, '/') + "/SDKInterfaces",   //包名 + SDK文件
            //         "share_img",    //调用SDK中的share_img函数(在第二部分)
            //         "(Ljava/lang/String;II)V",  //函数的参数类型
            //         filePath,
            //         width,
            //         height
            //     )
        } else {
            console.log("saveImageData   error");
        }
    }

    filpYImage(data, width, height) {
        var picData = new Uint8Array(width * height * 4)
        var rowBytes = width * 4
        for (var row = 0; row < height; row++) {
            var srow = height - 1 - row
            var start = srow * width * 4
            var reStart = row * width * 4

            for (var i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i]
            }
        }
        return picData
    }
}
