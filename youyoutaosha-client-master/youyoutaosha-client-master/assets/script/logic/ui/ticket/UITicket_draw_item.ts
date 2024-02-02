import auto_ticket_draw_item from "../../../data/autoui/ticket/auto_ticket_draw_item";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UITicket_draw_item")
export default class UITicket_draw_item extends VirtualItem {
	ui: auto_ticket_draw_item = null;

	protected static prefabUrl = "ticket/ticket_draw_item";
	protected static className = "UITicket_draw_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_ticket_draw_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		this.vo = vo

		UIHelp.SetLabel(this.ui.lab_name, vo.name)
		UIHelp.SetLabel(this.ui.lab_doudou, Utils.convertShow(vo.fen))
		UIHelp.SetSpriteFrame(this.ui.sp_face, vo.avatar)
	}
	onClose() {
		UIHelp.CloseUI(UITicket_draw_item);
	}
}