import auto_help_item from "../../../data/autoui/mine/auto_help_item";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIHelp_item")
export default class UIHelp_item extends VirtualItem {
	ui: auto_help_item = null;

	protected static prefabUrl = "mine/help_item";
	protected static className = "UIHelp_item";

	onUILoad() {
		this.ui = this.node.addComponent(auto_help_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {

		UIHelp.SetLabel(this.ui.lab_name, vo.title)
		UIHelp.SetLabel(this.ui.lab_content, vo.content)

	}
	onClose() {
		UIHelp.CloseUI(UIHelp_item);
	}
}