import auto_withdrawal_record_item from "../../../data/autoui/mine/auto_withdrawal_record_item";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIWithdrawal_record_item")
export default class UIWithdrawal_record_item extends VirtualItem {
	ui: auto_withdrawal_record_item = null;

	protected static prefabUrl = "mine/withdrawal_record_item";
	protected static className = "UIWithdrawal_record_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_withdrawal_record_item);
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
		if (this.vo.type == "issue") {
			UIHelp.SetLabel(this.ui.iname, `期号：${vo.issue}`);
		} else {
			UIHelp.SetLabel(this.ui.iname, vo.explain)
		}
		UIHelp.SetLabel(this.ui.time, vo.createtime)
		const flg = vo.t == '2' ? "-" : "+";
		UIHelp.SetLabel(this.ui.money, flg + Utils.convertShow(vo.balance))

		const color = vo.t == '2' ? cc.color(50, 150, 69) : cc.color(227, 108, 69);
		this.ui.money.color = color;
	}
	onClose() {
		UIHelp.CloseUI(UIWithdrawal_record_item);
	}
}