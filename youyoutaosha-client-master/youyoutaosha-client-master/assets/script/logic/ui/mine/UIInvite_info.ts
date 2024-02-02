import GameDataCenter from "../../../data/GameDataCenter";
import auto_invite_info from "../../../data/autoui/mine/auto_invite_info";
import { GameEvent } from "../../../data/const/EventConst";
import { DeviceModule } from "../../../data/model/DeviceModule";
import EventMng from "../../../manager/EventMng";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIFriend_invite_list from "../friend/UIFriend_invite_list";
import UIFriend_invite_record from "../friend/UIFriend_invite_record";
import UIShare_node from "../friend/UIShare_node";
import UIBandInviter_node from "./UIBandInviter_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIInvite_info")
export default class UIInvite_info extends UIBase {
	ui: auto_invite_info = null;

	protected static prefabUrl = "mine/invite_info";
	protected static className = "UIInvite_info";

	onUILoad() {
		this.ui = this.node.addComponent(auto_invite_info);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_my_inviter, this.onMyInviter);
		this.onRegisterEvent(this.ui.btn_copy_my_invite_code, this.onCopyMyInviteCode);
		this.onRegisterEvent(this.ui.btn_friend_list, this.onFriendList);
		this.onRegisterEvent(this.ui.btn_second_friend_list, this.onSecondFriendList);
		this.onRegisterEvent(this.ui.btn_yqhy, this.onIviteFriend);

		this.initEvent(GameEvent.GETSHAREINFO, this.onGetShareInfo);
		this.initEvent(GameEvent.FRIEND_LIST, this.onGetFriendList);
	}
	onIviteFriend() {
		UIHelp.ShowUI(UIShare_node);
	}
	onFriendList() {
		UIHelp.ShowUI(UIFriend_invite_list, null, 1);
	}
	onSecondFriendList() {
		UIHelp.ShowUI(UIFriend_invite_list, null, 2);
	}
	onGetFriendList(data) {
		console.log("onGetFriendList", data);
		UIHelp.SetLabel(this.ui.label_friend_num, data.zhituicount);
		UIHelp.SetLabel(this.ui.label_second_friend_num, data.kuosancount);
	}

	onMyInviter() {
		UIHelp.ShowUI(UIBandInviter_node);
	}

	onCopyMyInviteCode() {
		DeviceModule.getInstance().copyToClipboard(this._myInviteCode);
		UIHelp.ShowTips("复制成功");
	}

	onHide() {

	}

	_myInviteCode: string = "";
	onGetShareInfo(data) {
		console.log("onGetShareInfo", data);
		this._myInviteCode = data.code;
		UIHelp.SetLabel(this.ui.label_my_invite_code, data.code);
	}

	onStart() {
		GameDataCenter.player.getShareInfo();
		GameDataCenter.player.onGetFriendList();
	}

	onAfterStart(): void {
		this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop();
	}

	onClose() {
		UIHelp.CloseUI(UIInvite_info);
	}
}