import { Network } from "./network/Network";
import { SingletonFactory } from "./utils/SingletonFactory";
import GameDataCenter from "./data/GameDataCenter";

class GameController {
    network: Network = null;

    constructor() {
    }

    init() {
        // 新建一个网络单例
        this.network = SingletonFactory.getInstance(Network);
        // 初始化数据模块
        GameDataCenter.initModule();
    }
}

export default new GameController();