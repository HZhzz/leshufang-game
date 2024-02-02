import GameDataCenter from "../../../data/GameDataCenter";
import auto_friend_detailed_dou from "../../../data/autoui/friend/auto_friend_detailed_dou";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIFriend_detailed_dou")
export default class UIFriend_detailed_dou extends UIBase {
	ui: auto_friend_detailed_dou = null;

	protected static prefabUrl = "friend/friend_detailed_dou";
	protected static className = "UIFriend_detailed_dou";

	onUILoad() {
		this.ui = this.node.addComponent(auto_friend_detailed_dou);
	}

	onShow() {
		this.initEvent(GameEvent.FRIEND_RED_LIST, this.onFriendData);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}

	onHide() {

	}

	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		GameDataCenter.player.onSetFriendGift()
	}
	//好有数据
	onFriendData(data) {
		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of data.list) {
			virtualList.push(index);
		}

		UIHelp.SetLabel(this.ui.todey_lab, data.totaldou)
		UIHelp.SetLabel(this.ui.accumulative_lab, data.totalfriendfragment)
	}
	onClose() {
		UIHelp.CloseUI(UIFriend_detailed_dou);
	}
}