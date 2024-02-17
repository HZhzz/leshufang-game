import auto_friend_node from "../../../data/autoui/friend/auto_friend_node";
import { GameEvent } from "../../../data/const/EventConst";
import GameDataCenter from "../../../data/GameDataCenter";
import { Utils } from "../../../utils/Utils";
import VirtualList from "../../../virtualList/VirtualList";
import UIWithdrawal_node from "../mine/UIWithdrawal_node";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIFriend_detailed_dou from "./UIFriend_detailed_dou";
import UIFriend_invite_record from "./UIFriend_invite_record";
import UIShare_node from "./UIShare_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIFriend_node")
export default class UIFriend_node extends UIBase {
	ui: auto_friend_node = null;

	protected static prefabUrl = "friend/friend_node";
	protected static className = "UIFriend_node";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_friend_node);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.FRIEND_LIST, this.onFriendData);
		this.initEvent(GameEvent.FRIEND_RED_LIST, this.onFriendRewardData);

		// this.onRegisterEvent(this.ui.btn_Reward_Benefits_tixian, this.onTixian);
		// this.onRegisterEvent(this.ui.btn_Reward_Benefits, this.onShowInvite);
		// this.onRegisterEvent(this.ui.doudou_node, this.onShowFriendYesPrize);
		// this.onRegisterEvent(this.ui.redpack_node, this.onShowFriendInviterecord);
		// this.onRegisterEvent(this.ui.material_node, this.onShowFriendYesPrize);
		// this.onRegisterEvent(this.ui.btn_invent_friend, this.onShowShare);
	}

	onHide() {

	}
	initUI() {
		// UIHelp.SetLabel(this.ui.Reward_Benefits_my_num, GameDataCenter.player.cash + "个")
	}
	onStart() {


		//好友列表
		GameDataCenter.player.onGetFriendList();
		GameDataCenter.player.onSetFriendGift();
		// this.initUI()
	}
	//好有数据
	onFriendData(data) {
		// UIHelp.SetLabel(this.ui.zhitui_num, data.tu)
		// UIHelp.SetLabel(this.ui.tuandui_num, data.mu)

		// UIHelp.SetLabel(this.ui.tu_num, data.tu)
		// UIHelp.SetLabel(this.ui.shui_num, data.shui)
		// UIHelp.SetLabel(this.ui.jin_num, data.jin)
		// UIHelp.SetLabel(this.ui.mu_num, data.mu)
		// UIHelp.SetLabel(this.ui.huo_num, data.huo)
		console.log(this.ui.ScrollView,'ScrollViewScrollViewScrollViewScrollView')
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of data.zhitui) {
			virtualList.push(index);
		}

		// setTimeout(() => {
		// 	this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		// }, 0);

	}
	//好友奖励数据
	onFriendRewardData(data) {
		// UIHelp.SetLabel(this.ui.hongbao_num, `${data.totalreward}元/5000元`);
		// UIHelp.SetLabel(this.ui.Reward_Benefits_lab_num, `${data.totalreward}元/5000元`);
		// UIHelp.SetLabel(this.ui.Reward_Benefits_lab_all, `${data.totalreward}元`);

		// UIHelp.SetLabel(this.ui.doudou_num, `${Utils.convertShow(data.totaldou)}`);
		// UIHelp.SetLabel(this.ui.material_num, `${Utils.convertShow(data.totalfriendfragment)}`);
	}

	onShowInvite() {
		UIHelp.ShowUI(UIFriend_invite_record)
	}
	/**
	 * 提现
	 */
	onTixian() {
		UIHelp.ShowUI(UIWithdrawal_node)
	}
	onClose() {
		UIHelp.CloseUI(UIFriend_node);
	}

	//显示好有中奖奖励
	onShowFriendYesPrize() {
		UIHelp.ShowUI(UIFriend_detailed_dou)
	}
	//显示好有现金奖励
	onShowFriendInviterecord() {
		UIHelp.ShowUI(UIFriend_invite_record)
	}
	//分享
	onShowShare() {
		UIHelp.ShowUI(UIShare_node)
	}
}