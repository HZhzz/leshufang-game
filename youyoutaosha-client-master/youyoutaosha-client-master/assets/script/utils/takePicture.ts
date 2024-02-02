// const {ccclass, property} = cc._decorator;

// @ccclass
export default class TakePicture{
    // @property(cc.Sprite)
    // aSprite: cc.Sprite = null;

    public static aSprite: cc.Sprite;
    // onLoad () {
    //     var self = this
    // }

    public static setQRCode(strQR){
        let strImg = /*"data:image/jpeg;base64," + */strQR;
        let img = new Image();
        img.src = strImg;
        let texture = new cc.Texture2D();
        texture.initWithElement(img);
        texture.handleLoadedTexture();
        this.aSprite.spriteFrame = new cc.SpriteFrame(texture);
    }

    public static takePicture(aSprite){
        var self = this;
        self.aSprite = aSprite;
        var input_picture = document.getElementById('input_picture');
        console.log(input_picture)
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

    // start () {
    //     var self = this
    // }

    // update (dt) {
    //     var self = this
    // }
}
