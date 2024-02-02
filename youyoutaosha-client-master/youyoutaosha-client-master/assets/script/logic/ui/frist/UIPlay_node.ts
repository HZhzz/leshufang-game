import auto_play_node from "../../../data/autoui/frist/auto_play_node";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIPlay_node")
export default class UIPlay_node extends UIBase {
	ui: auto_play_node = null;

	protected static prefabUrl = "frist/play_node";
	protected static className = "UIPlay_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_play_node);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}

	onHide() {

	}

	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
	}

	onClose() {
		UIHelp.CloseUI(UIPlay_node);
	}
}