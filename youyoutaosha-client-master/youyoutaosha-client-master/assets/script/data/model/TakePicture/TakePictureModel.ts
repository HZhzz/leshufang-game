import IDataModel from "../IDataModel";
import UIHelp from "../../../logic/ui/UIHelp";
import EventMng from "../../../manager/EventMng";
import { GameEvent } from "../../const/EventConst";
import GameDataCenter from "../../GameDataCenter";

export default class TakePictureModel extends IDataModel {
    constructor() {
        super('takePicture');
    }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['server_img_upload']: (msg) => { this.G2C_FasongSuccess(msg) },
        }
    }

    G2C_FasongSuccess(msg) {
        EventMng.emit(GameEvent.GET_PICTURE_URL_SUCCESS, msg["src"]);
    }

    setQRCode(strQR){
        var strQR1 = strQR.replace(/\r|\n/g, '').replace('data:image/jgp;base64,', '').replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,','');
        
        this.postHttpMsg("server/img/upload", {info: strQR1});
    }

    takePicture(){
        var self = this;
        var input_picture = document.getElementById('input_picture');
        input_picture.onchange = function (event1) {
            var files = event1.target.files;
            if (files && files.length > 0) {
                try {
                    //实例化一个FileReader
                    var fileReader = new FileReader();
                    //监听onloadend读取完成事件
                    fileReader.onload = function (event2) {　　　　// 获取照片的base64编码
                        if (fileReader.readyState == fileReader.DONE) {
                            // compressPicture(event2.target.result);　　// 压缩照片
                            console.log(event2);
                            self.setQRCode(event2.target.result);
                        }
                    };
                    //使用readAsDataURL()方法读取文件流
                    fileReader.readAsDataURL(files[0]);
                }
                catch (e) {
                    alert(common.MESSAGE.title.error, '拍照失败,请联系客服或尝试更换手机再试!');
                }
            }
        }
        // 添加需要处理的代码
        input_picture.click();
    }
}