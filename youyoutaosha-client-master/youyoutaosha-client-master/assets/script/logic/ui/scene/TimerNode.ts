import UIBase from "../UIBase";
import GameDataCenter from "../../../data/GameDataCenter";
import EventMng from "../../../manager/EventMng";
import { GameEvent } from "../../../data/const/EventConst";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/scene/TimerNode")
export default class TimerNode extends UIBase {

	protected static prefabUrl = "";
	protected static className = "TimerNode";

	onUILoad() {
		cc.game.addPersistRootNode(this.node);
		this.createSchedule();

		cc.game.on(cc.game.EVENT_SHOW, function () {
			if (GameDataCenter.account.jwt) {
				//TODO 更新时间戳接口
				GameDataCenter.account.getNowTime();
			}
		});
	}

	onShow() {
	}

	onHide() {
	}

	createSchedule() {
		// 以秒为单位的时间间隔
		var interval = 1;
		// 重复次数
		var repeat = cc.macro.REPEAT_FOREVER;
		// 开始延时
		var delay = 0;
		let player = GameDataCenter.player
		this.schedule(function () {
			// 这里的 this 指向 component
			if (player.serverTime) {
				player.serverTime += 1;
				EventMng.emit(GameEvent.SERVER_TIME_CHANGE);

				// if(player.base && (player.serverTime == player.base["goods50"] || player.serverTime == player.base["goods51"])){
				// 	player.getUser();
				// }
			}

			if (player.serverTime == player.debuffTime1 || player.serverTime == player.debuffTime2) {
				let parameter = GameDataCenter.haoyou.haoyouId ? GameDataCenter.haoyou.haoyouId : ""
				GameDataCenter.animal.loadHall(parameter)
			}
		}, interval, repeat, delay);
	}
}