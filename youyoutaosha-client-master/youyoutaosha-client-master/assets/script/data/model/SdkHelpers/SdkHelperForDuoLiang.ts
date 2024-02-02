import IDataModel from "../IDataModel";

export class SdkHelperForDuoLiang extends IDataModel {

    private static AndroidClassPath = 'org/cocos2dx/javascript/sdkHelpers/DuoLiangSdkHelper';

    constructor() {
        super('SdkHelperForDuoLiang');
    }

    static jumpAdList(userId: string) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.AndroidClassPath,
                "jumpAdList",
                "(Ljava/lang/String;)V",
                userId);
        }
    }
}
