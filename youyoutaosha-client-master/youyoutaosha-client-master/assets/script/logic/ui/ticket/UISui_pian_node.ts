import GameDataCenter from "../../../data/GameDataCenter";
import auto_sui_pian_node from "../../../data/autoui/ticket/auto_sui_pian_node";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UISui_pian_record from "./UISui_pian_record";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UISui_pian_node")
export default class UISui_pian_node extends UIBase {
	ui: auto_sui_pian_node = null;

	protected static prefabUrl = "ticket/sui_pian_node";
	protected static className = "UISui_pian_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_sui_pian_node);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_record, this.onRecord);
		
		this.initEvent(GameEvent.GETFRAGMENTLIST, this.onGetFragmentList);
		this.initEvent(GameEvent.EXCHANGEFRAGMENT, this.onStart);
	}

	onRecord() {
		UIHelp.ShowUI(UISui_pian_record);
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
		GameDataCenter.player.getfragmentlist();
	}

	onClose() {
		UIHelp.CloseUI(UISui_pian_node);
	}
}