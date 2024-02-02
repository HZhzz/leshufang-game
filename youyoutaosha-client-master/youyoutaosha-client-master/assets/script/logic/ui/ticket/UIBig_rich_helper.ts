import auto_big_rich_helper from "../../../data/autoui/ticket/auto_big_rich_helper";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UIBig_rich_helper")
export default class UIBig_rich_helper extends UIBase {
	ui: auto_big_rich_helper = null;

	protected static prefabUrl = "ticket/big_rich_helper";
	protected static className = "UIBig_rich_helper";

	onUILoad() {
		this.ui = this.node.addComponent(auto_big_rich_helper);
	}

	onShow() {

		this.onRegisterEvent(this.ui.btn_close, this.onClose);

	}

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UIBig_rich_helper);
	}
}