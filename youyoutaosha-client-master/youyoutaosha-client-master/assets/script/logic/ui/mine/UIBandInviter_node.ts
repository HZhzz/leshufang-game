import GameDataCenter from "../../../data/GameDataCenter";
import auto_bandInviter_node from "../../../data/autoui/mine/auto_bandInviter_node";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIMy_inviter_node from "./UIMy_inviter_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIBandInviter_node")
export default class UIBandInviter_node extends UIBase {
	ui: auto_bandInviter_node = null;

	protected static prefabUrl = "mine/bandInviter_node";
	protected static className = "UIBandInviter_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_bandInviter_node);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_copywx, this.onBandid);
		this.onRegisterEvent(this.ui.big_rich_pop_backgunrd, this.onClose);
		this.onRegisterEvent(this.ui.btn_close_pop, this.onClose);
	}

	onHide() {

	}

	onStart() {
		const shangjiId = GameDataCenter.player.shangji || 0;
		if (shangjiId != 0 && shangjiId != '') {
			UIHelp.ShowUI(UIMy_inviter_node);
			this.onClose();
		}
	}

	//手动绑定
	onBandid() {
		let shangjiid = this.ui.EditBox.getComponent(cc.EditBox).string
		if (shangjiid.length <= 0) {
			UIHelp.ShowTips("请输入正确的上级ID");
			return
		}
		GameDataCenter.player.onbindshangji(shangjiid)
	}

	onClose() {
		UIHelp.CloseUI(UIBandInviter_node);
	}
}