import { GameEvent } from '../data/const/EventConst';
import GameDataCenter from '../data/GameDataCenter';
import { DeviceModule } from '../data/model/DeviceModule';
import UIHelp from '../logic/ui/UIHelp';



//获取复制内容回调(原生层的全局回调)
window["clipCallback"] = function clipCallback(text) {
    // if (DeviceModule._clipCallback) {
    //     DeviceModule._clipCallback(text);
    // }
    DeviceModule.getInstance().clipCallback(text)
}

//选择相册回调
window["selectPhotoCallback"] = function selectPhotoCallback(result, path) {
    DeviceModule.getInstance().selectPhotoCallback(result, path);
}

//微信登录回调
window["wxLoginCallback"] = function wxLoginCallback(code) {
    DeviceModule.getInstance().wxLoginCallback(code);
}

//支付宝实名回调
window["AliCallback"] = function AliCallback(result,code) {
    DeviceModule.getInstance().AliCallback(result,code);
}
//广告回调
window["reward_callback"] = function reward_callback(result) {
    // DeviceModule.getInstance().reward_callback(result);
    GameDataCenter.baseSdk.videoCallBack()
}
//支付回调
window['wx_paySuccess'] = function wx_paySuccess(result){
    console.log('微信支付===>',result)
    if(result == 0) {
        UIHelp.ShowTips("支付成功")
        GameDataCenter.player.getUserInfo();
    }else{
        UIHelp.ShowTips("支付失败")
    }
}


