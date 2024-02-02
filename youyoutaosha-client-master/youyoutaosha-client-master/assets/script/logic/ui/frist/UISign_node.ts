import GameDataCenter from "../../../data/GameDataCenter";
import auto_sign_node from "../../../data/autoui/frist/auto_sign_node";
import { GameEvent } from "../../../data/const/EventConst";
import { VideoEvent } from "../../../data/const/VideoEvent";
import { ConfigModule } from "../../../data/model/ConfigModule";
import { DeviceModule } from "../../../data/model/DeviceModule";
import BaseSdk from "../../../data/model/Sdk/BaseSdk";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UISign_node")
export default class UISign_node extends UIBase {
	ui: auto_sign_node = null;

	protected static prefabUrl = "frist/sign_node";
	protected static className = "UISign_node";
	siginInfo;
	btns: any[] = [];

	onUILoad() {
		this.ui = this.node.addComponent(auto_sign_node);
	}

	onShow() {
		this.initEvent(GameEvent.SIGININFO_LOGIN, this.onSetSiginInfo);
		this.initEvent(GameEvent.VIPFREEAD_SUCCESS, this.vipfreeadSuccess);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_sign, this.onSigin);
	}

	onHide() {

	}

	onStart() {
		this.btns[0] = (this.ui.sing_1)
		this.btns[1] = (this.ui.sing_2)
		this.btns[2] = (this.ui.sing_3)
		this.btns[3] = (this.ui.sing_4)
		this.btns[4] = (this.ui.sing_5)
		this.btns[5] = (this.ui.sing_6)
		this.btns[6] = (this.ui.sing_7)
		GameDataCenter.player.getSiginInof()
	}

	onlogic() {

	}

	vipfreeadSuccess() {
		GameDataCenter.player.getSiginInof()
	}

	onSetSiginInfo() {
		this.siginInfo = GameDataCenter.player.siginInfo
		console.log('this.siginInfo', this.siginInfo);

		//按钮
		for (let i = 0; i < 7; i++) {
			if (i + 1 <= this.siginInfo.signcount) {
				this.btns[i].getComponent(cc.Button).interactable = false
				this.ui['check_' + (i + 1)].active = true;
			} else {
				this.btns[i].getComponent(cc.Button).interactable = true
				this.ui['check_' + (i + 1)].active = false;
			}
		}
		this.onSetlab()
	}
	onSetlab() {
		UIHelp.SetLabel(this.ui.lab_now_num, this.siginInfo.signcount);

		let nameMap = new Map();
		nameMap.set('fen', "乐豆");
		nameMap.set("coupon", "奖券");
		nameMap.set("coin", "银两");
		nameMap.set('goldcoin', "金币");
		let strs: string[] = ["零", "一", "二", "三", "四", "五", "六", "七"];
		const liangciMap = {
			'银两': '个',
			'乐豆': '个',
			'奖券': '张',
		};

		for (let i = 1; i <= 7; i++) {
			const prizeData = this.siginInfo.prize["day" + i];
			console.log(prizeData);
			UIHelp.SetLabel(this.ui["lab_" + i + "_num"], Utils.convertShow(prizeData.num) + "\n" + nameMap.get(prizeData.tp));
			UIHelp.SetLabel(this.ui["lab_" + i], `第${strs[i]}天`);
		}

		if (this.siginInfo.watchvideocount >= 3 || GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
			this.ui.btn_sign.getComponent(cc.Button).interactable = !Boolean(this.siginInfo.issign)
			UIHelp.SetLabel(this.ui.btn_sign_lab, "领取奖励")
		} else {
			this.ui.btn_sign.getComponent(cc.Button).interactable = true
			UIHelp.SetLabel(this.ui.btn_sign_lab, "看广告 " + this.siginInfo.watchvideocount + "/3")
		}

		UIHelp.SetLabel(this.ui.lab_content, `看<color=#00CFE2>3</color>个广告签到成功，当前已观看<color=#00CFE2>${this.siginInfo.watchvideocount}</color>个广告`)
	}
	onSigin() {
		if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
			GameDataCenter.player.Sigin()
			return;
		}
		if (this.siginInfo.watchvideocount < 3) {
			console.log("看签到广告");
			GameDataCenter.baseSdk.createVideo(VideoEvent.SIGINVIDEO, ConfigModule.VIDEO_NAME.SIGINVIDEO, ConfigModule.VIDEO_ID.SIGINVIDEO);
		}
		else {
			GameDataCenter.player.Sigin()
		}

	}
	onClose() {
		UIHelp.CloseUI(UISign_node);
	}
}