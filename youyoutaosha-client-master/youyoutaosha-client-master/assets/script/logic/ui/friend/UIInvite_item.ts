import auto_invite_item from "../../../data/autoui/friend/auto_invite_item";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIInvite_item")
export default class UIInvite_item extends VirtualItem {
	ui: auto_invite_item = null;

	protected static prefabUrl = "friend/invite_item";
	protected static className = "UIInvite_item";
	
	onUILoad() {
		this.ui = this.node.addComponent(auto_invite_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		UIHelp.SetLabel(this.ui.invite_time, vo.date)
		UIHelp.SetLabel(this.ui.invite_one, vo.todayzhituifen)
		UIHelp.SetLabel(this.ui.invite_two, vo.todaykuosanfen)
		UIHelp.SetLabel(this.ui.invite_altogether, vo.total)
	}
	onClose() {
		UIHelp.CloseUI(UIInvite_item);
	}
}