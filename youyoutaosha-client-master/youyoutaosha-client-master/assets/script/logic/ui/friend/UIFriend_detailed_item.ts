import auto_friend_detailed_item from "../../../data/autoui/friend/auto_friend_detailed_item";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIFriend_detailed_item")
export default class UIFriend_detailed_item extends VirtualItem {
	ui: auto_friend_detailed_item = null;

	protected static prefabUrl = "friend/friend_detailed_item";
	protected static className = "UIFriend_detailed_item";

	onUILoad() {
		this.ui = this.node.addComponent(auto_friend_detailed_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		if (vo.date.toString().match(/(\d{4})(\d{2})(\d{2})/)) {
			UIHelp.SetLabel(this.ui.invite_time, vo.date.toString().replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3'));
		} else {
			UIHelp.SetLabel(this.ui.invite_time, vo.date);
		}
		UIHelp.SetLabel(this.ui.invite_doudou, vo.total)
		UIHelp.SetLabel(this.ui.invite_fragment, Utils.convertShow(vo.todayfragmentcount));
	}
	onClose() {
		UIHelp.CloseUI(UIFriend_detailed_item);
	}
}