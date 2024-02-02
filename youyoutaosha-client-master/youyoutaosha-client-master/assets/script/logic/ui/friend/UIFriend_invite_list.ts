import GameDataCenter from "../../../data/GameDataCenter";
import auto_friend_invite_list from "../../../data/autoui/friend/auto_friend_invite_list";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIFriend_invite_list")
export default class UIFriend_invite_list extends UIBase {
	ui: auto_friend_invite_list = null;

	protected static prefabUrl = "friend/friend_invite_list";
	protected static className = "UIFriend_invite_list";
	type: number = 1
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_friend_invite_list);
	}

	onShow() {
		this.initEvent(GameEvent.FRIEND_LIST, this.onFriendData);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);

		this.onRegisterEvent(this.ui.toggle1, this.onSelet1);
		this.onRegisterEvent(this.ui.toggle2, this.onSelet2);
		this.onRegisterEvent(this.ui.toggle3, this.onSelet3);
	}
	onSelet1() {
		this.type = 1
		this.onFriendData(this.vo)
	}
	onSelet2() {
		this.type = 2
		this.onFriendData(this.vo)
	}
	onSelet3() {
		this.type = 3
		this.onFriendData(this.vo)
	}
	onInit(params): void {
		console.log("UIFriend_invite_list", params);
		if (params) {
			this.type = params[0];
		}
	}
	//好有数据
	onFriendData(data) {
		this.vo = data
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();
		if (this.type == 1) {
			for (let index of data.zhitui) {
				virtualList.push(index);
			}
		}
		else if (this.type == 2) {
			for (let index of data.kuosan) {
				virtualList.push(index);
			}
		}
		else if (this.type == 3) {
			for (let index of data.unauthentication) {
				virtualList.push(index);
			}
		}
	}
	onHide() {

	}

	onStart() {
		GameDataCenter.player.onGetFriendList()
		if (this.type) {
			this.ui[`toggle${this.type}`].getComponent(cc.Toggle).isChecked = true;
		}
	}

	onClose() {
		UIHelp.CloseUI(UIFriend_invite_list);
	}
}