import GameDataCenter from "../../../data/GameDataCenter";
import auto_my_inviter_node from "../../../data/autoui/mine/auto_my_inviter_node";
import { GameEvent } from "../../../data/const/EventConst";
import { DeviceModule } from "../../../data/model/DeviceModule";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIBandInviter_node from "./UIBandInviter_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIMy_inviter_node")
export default class UIMy_inviter_node extends UIBase {
	ui: auto_my_inviter_node = null;

	protected static prefabUrl = "mine/my_inviter_node";
	protected static className = "UIMy_inviter_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_my_inviter_node);
	}

	onShow() {
		this.onRegisterEvent(this.ui.mask_close_my_inviter, this.onClose);
		this.onRegisterEvent(this.ui.btn_close_my_inviter, this.onClose);
		this.onRegisterEvent(this.ui.btn_copy_wx, this.onCopyWx);
		this.onRegisterEvent(this.ui.btn_copy_qq, this.onCopyQq);

		this.initEvent(GameEvent.GETSHANGJI, this.onGetShangji);
	}

	vo = null;
	onGetShangji(data) {
		console.log('onGetShangji', data);
		this.vo = data;

		UIHelp.SetSpriteFrame(this.ui.head_img, data.sjuser.avatar);

		UIHelp.SetLabel(this.ui.inviter_name, data.sjuser.nickname);
		UIHelp.SetLabel(this.ui.label_inviter_friend_num, data.zhituicount);
		UIHelp.SetLabel(this.ui.label_inviter_second_friend_num, data.kuosancount);
		if (data.sjuser.weixinid != '') {
			UIHelp.SetLabel(this.ui.label_inviter_wx, data.sjuser.weixinid);
		} else {
			this.ui.btn_copy_wx.getComponent(cc.Button).interactable = false;
		}
		if (data.sjuser.qqid != '') {
			UIHelp.SetLabel(this.ui.label_inviter_qq, data.sjuser.qqid);
		} else {
			this.ui.btn_copy_qq.getComponent(cc.Button).interactable = false;
		}
	}
	onCopyQq() {
		DeviceModule.getInstance().copyToClipboard(this.vo.sjuser.qqid);
		UIHelp.ShowTips('复制成功');
	}
	onCopyWx() {
		DeviceModule.getInstance().copyToClipboard(this.vo.sjuser.weixinid);
		UIHelp.ShowTips('复制成功');
	}

	onHide() {

	}

	onStart() {
		const shangjiId = GameDataCenter.player.shangji || 0;
		if (shangjiId == 0 || shangjiId == '') {
			UIHelp.ShowUI(UIBandInviter_node);
			this.onClose();
		}

		GameDataCenter.player.getShangji();
	}

	onClose() {
		UIHelp.CloseUI(UIMy_inviter_node);
	}
}