import auto_doudouToMoneyRecord_item from "../../../data/autoui/mine/auto_doudouToMoneyRecord_item";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIDoudouToMoneyRecord_item")
export default class UIDoudouToMoneyRecord_item extends VirtualItem {
	ui: auto_doudouToMoneyRecord_item = null;

	protected static prefabUrl = "mine/doudouToMoneyRecord_item";
	protected static className = "UIDoudouToMoneyRecord_item";

	onUILoad() {
		this.ui = this.node.addComponent(auto_doudouToMoneyRecord_item);
	}

	public onInitItem(data): void {
		UIHelp.SetLabel(this.ui.lab_date, data.createtime);
		UIHelp.SetLabel(this.ui.lab_dou, data.balance);
		UIHelp.SetLabel(this.ui.lab_dou, data.balance);
		UIHelp.SetLabel(this.ui.lab_money, `${data.money}元`);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UIDoudouToMoneyRecord_item);
	}
}