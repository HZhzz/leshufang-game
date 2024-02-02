import GameDataCenter from "../../../data/GameDataCenter";
import auto_sui_pian_record from "../../../data/autoui/ticket/auto_sui_pian_record";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UISui_pian_record")
export default class UISui_pian_record extends UIBase {
	ui: auto_sui_pian_record = null;

	protected static prefabUrl = "ticket/sui_pian_record";
	protected static className = "UISui_pian_record";

	onUILoad() {
		this.ui = this.node.addComponent(auto_sui_pian_record);
	}

	onShow() {
		this.initEvent(GameEvent.GETFRAGMENTEXCHANGELOG, this.onGetFragmentList);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}

	vo: any;
	onGetFragmentList(data) {
		this.vo = data;
		const list = this.ui.ScrollView.getComponent(VirtualList);
		list.clearAll();
		data.list.forEach(item => {
			list.push(item);
		});
	}

	onHide() {

	}

	onStart() {
		GameDataCenter.player.getfragmentexchangelog();
	}

	onClose() {
		UIHelp.CloseUI(UISui_pian_record);
	}
}