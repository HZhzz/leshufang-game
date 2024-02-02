import GameDataCenter from "../../../data/GameDataCenter";
import auto_friend_invite_record from "../../../data/autoui/friend/auto_friend_invite_record";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIFriend_invite_record")
export default class UIFriend_invite_record extends UIBase {
	ui: auto_friend_invite_record = null;

	protected static prefabUrl = "friend/friend_invite_record";
	protected static className = "UIFriend_invite_record";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_friend_invite_record);
	}

	onShow() {

		this.initEvent(GameEvent.FRIEND_RED_LIST, this.onFriendData);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}

	onHide() {

	}

	onStart() {
		GameDataCenter.player.onSetFriendGift()
	}
	//好有数据
	onFriendData(data) {
		this.vo = data
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of data.list) {
			virtualList.push(index);
		}

		virtualList.push({
			date: '2023-07-10',
			todayzhituifen: '110',
			todaykuosanfen: '12',
			total: '122',
		});

		UIHelp.SetLabel(this.ui.todey_lab, data.todayreward)
		UIHelp.SetLabel(this.ui.accumulative_lab, data.totalreward)
	}
	onClose() {
		UIHelp.CloseUI(UIFriend_invite_record);
	}
}