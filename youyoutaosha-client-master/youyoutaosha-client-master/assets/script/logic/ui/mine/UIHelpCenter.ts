import GameDataCenter from "../../../data/GameDataCenter";
import auto_helpCenter from "../../../data/autoui/mine/auto_helpCenter";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIHelpCenter")
export default class UIHelpCenter extends UIBase {
	ui: auto_helpCenter = null;

	protected static prefabUrl = "mine/helpCenter";
	protected static className = "UIHelpCenter";

	onUILoad() {
		this.ui = this.node.addComponent(auto_helpCenter);
	}

	onShow() {
		this.initEvent(GameEvent.HEIP_CENTER, this.initScrollView);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}

	onHide() {

	}

	onStart() {
		GameDataCenter.player.getHelp()
	}
	initScrollView(list) {
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of list) {
			virtualList.push(index);
		}
	}
	onClose() {
		UIHelp.CloseUI(UIHelpCenter);
	}
}