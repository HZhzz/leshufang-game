import GameDataCenter from "../../../data/GameDataCenter";
import auto_early_back from "../../../data/autoui/frist/auto_early_back";
import { GameEvent } from "../../../data/const/EventConst";
import { VideoEvent } from "../../../data/const/VideoEvent";
import { ConfigModule } from "../../../data/model/ConfigModule";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIVip_node from "./UIVip_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIEarly_back")
export default class UIEarly_back extends UIBase {
	ui: auto_early_back = null;

	protected static prefabUrl = "frist/early_back";
	protected static className = "UIEarly_back";
	carid: number = 0;
	onUILoad() {
		this.ui = this.node.addComponent(auto_early_back);
	}

	onShow() {

		this.initEvent(GameEvent.TACKBACK_CAR_TIMES, this.initUI);
		this.initEvent(GameEvent.TACKBACK_CAR, this.onEarlyTackBack);
		this.initEvent(GameEvent.TACKCARBACK_ADV, this.onLooked);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_open, this.onLookadv);
		this.onRegisterEvent(this.ui.btn_vip, this.openVIp);
	}

	onHide() {

	}
	onInit(params: any): void {
		this.carid = params[0]
	}
	onStart() {

		//获取次数
		GameDataCenter.select.getLookTackTimes()
	}
	//次数
	initUI(data) {
		UIHelp.SetLabel(this.ui.lab_back_time, `每天12:00、19:00、24:00重置视频次数(剩余${data.count}次)`)
		UIHelp.SetLabel(this.ui.lab_asked, data.friendcount)
		if (data.count == 0) {
			this.ui.btn_open.getComponent(cc.Button).interactable = false;
		} else {
			this.ui.btn_open.getComponent(cc.Button).interactable = true;
		}
		this.ui.btn_open.opacity = 255;

		console.log(data.list);
		for (let i = 0; i < 5; i++) {
			if (!data.list || !data.list[i]) {
				continue;
			}
			const headImgNode = this.ui[`img_face${i + 1}`];
			UIHelp.SetSpriteFrame(headImgNode, data.list[i].uid);
		}
	}
	//看广告领取
	onLookadv() {
		GameDataCenter.baseSdk.createVideo(VideoEvent.TACKCARBACK, ConfigModule.VIDEO_NAME.TACKCARBACK, ConfigModule.VIDEO_ID.TACKCARBACK);
	}
	//打开vip
	openVIp() {
		//提前取回
		if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
			GameDataCenter.select.getBackCar(this.carid)
		} else {
			UIHelp.ShowUI(UIVip_node)
			this.onClose()
		}
	}
	//看广告回来
	onLooked() {
		GameDataCenter.select.getBackCar(this.carid)
	}
	//提前收车
	onEarlyTackBack() {
		UIHelp.CloseUI(UIEarly_back);
	}
	onClose() {
		UIHelp.CloseUI(UIEarly_back);
	}
}