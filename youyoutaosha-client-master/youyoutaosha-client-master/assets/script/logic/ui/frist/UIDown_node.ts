import auto_down_node from "../../../data/autoui/frist/auto_down_node";
import { GameEvent } from "../../../data/const/EventConst";

import EventMng from "../../../manager/EventMng";

import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIDown_node")
export default class UIDown_node extends UIBase {

	ui: auto_down_node = null;

	protected static prefabUrl = "frist/down_node";
	protected static className = "UIDown_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_down_node);
	}

	onShow() {
		this.onRegisterEvent(this.ui.toggle1, this.onToggle1);
		this.onRegisterEvent(this.ui.toggle2, this.onToggle2);
		this.onRegisterEvent(this.ui.toggle3, this.onToggle3);
		this.onRegisterEvent(this.ui.toggle4, this.onToggle4);
		this.onRegisterEvent(this.ui.toggle5, this.onToggle5);

	}

	onHide() {

	}

	onStart() {

	}
	onToggle1() {

		EventMng.emit(GameEvent.CHANGEDOWBTAB, 1);
	}
	onToggle2() {

		EventMng.emit(GameEvent.CHANGEDOWBTAB, 2);
	}
	onToggle3() {

		EventMng.emit(GameEvent.CHANGEDOWBTAB, 3);
	}
	onToggle4() {

		EventMng.emit(GameEvent.CHANGEDOWBTAB, 4);
	}
	onToggle5() {

		EventMng.emit(GameEvent.CHANGEDOWBTAB, 5);
	}

	onClose() {
		UIHelp.CloseUI(UIDown_node);
	}
}