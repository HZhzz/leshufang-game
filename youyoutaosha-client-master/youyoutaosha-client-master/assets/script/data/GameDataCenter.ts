import IDataModel from "./model/IDataModel";
import AccountModel from "./model/Account/AccountModel";
import SystemModel from "./model/System/SystemModel";
import { SingletonFactory } from "../utils/SingletonFactory";
import PlayerModel from "./model/PlayerModel";
import SdkModel from "./model/Sdk/SdkModel";
import TakePictureModel from "./model/TakePicture/TakePictureModel";

import H5WxSdkModel from "./model/Sdk/H5WxSdkModel";
import ZhuanpanModel from "./model/zhuanpan/ZhuanpanModel";
import BaseSdk from "./model/Sdk/BaseSdk";
import CarModel from "./model/Car/CarModel";
import selectMode from "./model/frist/selectMode";
import ConsignmentModel from "./model/Car/ConsignmentModel";




class GameDataCenter {
    private _tModel: Array<IDataModel> = [];

    account: AccountModel = null;
    system: SystemModel = null;
    player: PlayerModel = null;
    sdk: SdkModel = null;
    takePicture: TakePictureModel = null;
    car:CarModel = null
    select:selectMode = null

    h5WxSdk: H5WxSdkModel = null;
    zhuanpan: ZhuanpanModel = null;
    baseSdk:BaseSdk = null;
    consignment:ConsignmentModel = null;


    public static instance

    constructor() {
        GameDataCenter.instance = this;
    }

    newModel<T extends IDataModel>(c: { new(): T }): T {
        let obj = SingletonFactory.getInstance(c);
        this._tModel.push(obj);
        return obj;
    }

    clear() {
        this._tModel.forEach(m => {
            m.clear();
        });
    }

    initModule() {
        this.account = this.newModel(AccountModel);
        this.player = this.newModel(PlayerModel);
        this.sdk = this.newModel(SdkModel);
        this.system = this.newModel(SystemModel);
        this.takePicture = this.newModel(TakePictureModel);
        this.zhuanpan = this.newModel(ZhuanpanModel);
        this.h5WxSdk = this.newModel(H5WxSdkModel);
        this.baseSdk = this.newModel(BaseSdk);
        this.car = this.newModel(CarModel)
        this.select = this.newModel(selectMode)
        this.consignment = this.newModel(ConsignmentModel)
    
    }
}

export default new GameDataCenter();
(window as any).GameDataCenter = GameDataCenter;