import GameDataCenter from "../../../data/GameDataCenter";
import auto_superVip_node from "../../../data/autoui/mine/auto_superVip_node";
import { GameEvent } from "../../../data/const/EventConst";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIPay_node from "../frist/UIPay_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UISuperVip_node")
export default class UISuperVip_node extends UIBase {
	ui: auto_superVip_node = null;

	protected static prefabUrl = "mine/superVip_node";
	protected static className = "UISuperVip_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_superVip_node);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.onClose);
		this.onRegisterEvent(this.ui.btn_open, this.onBuy);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}

	onHide() {

	}

	onStart() {

	}

	onBuy() {
		UIHelp.ShowUI(UIPay_node, null, "founder")
	}

	onClose() {
		UIHelp.CloseUI(UISuperVip_node);
	}
}