import auto_ticket_helper from "../../../data/autoui/ticket/auto_ticket_helper";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UITicket_helper")
export default class UITicket_helper extends UIBase {
	ui: auto_ticket_helper = null;

	protected static prefabUrl = "ticket/ticket_helper";
	protected static className = "UITicket_helper";

	onUILoad() {
		this.ui = this.node.addComponent(auto_ticket_helper);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}

	onHide() {

	}

	onStart() {
		this.scheduleOnce(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop(0.0);
		}, 0.0);
	}

	onClose() {
		UIHelp.CloseUI(UITicket_helper);
	}
}