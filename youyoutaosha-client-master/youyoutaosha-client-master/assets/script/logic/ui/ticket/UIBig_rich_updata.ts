import GameDataCenter from "../../../data/GameDataCenter";
import auto_big_rich_updata from "../../../data/autoui/ticket/auto_big_rich_updata";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIBig_rich_helper from "./UIBig_rich_helper";
import UITicket_helper from "./UITicket_helper";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UIBig_rich_updata")
export default class UIBig_rich_updata extends UIBase {
	ui: auto_big_rich_updata = null;

	protected static prefabUrl = "ticket/big_rich_updata";
	protected static className = "UIBig_rich_updata";

	onUILoad() {
		this.ui = this.node.addComponent(auto_big_rich_updata);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.InitUI);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_zhiya, this.onUpdataBigPlayer);
		this.onRegisterEvent(this.ui.btn_helper, this.onHelper);
	}

	onHelper() {
		UIHelp.ShowUI(UIBig_rich_helper);
	}

	onHide() {

	}

	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		this.InitUI();
	}
	InitUI() {
		UIHelp.SetSpriteFrame(this.ui.updata_useinfo_img, GameDataCenter.player.avatar)
		UIHelp.SetLabel(this.ui.updata_useinfo_name, Utils.cutString(GameDataCenter.player.name, 10));
		UIHelp.SetLabel(this.ui.updata_useinfo_doudou, `您有${Utils.convertShow(GameDataCenter.player.doudou)}乐豆`)
		this.ui.edit_wx.getComponent(cc.EditBox).string = GameDataCenter.player.weixinid + ""
		this.ui.edit_qq.getComponent(cc.EditBox).string = GameDataCenter.player.qqid + ""
	}
	onUpdataBigPlayer() {
		let zhiya = this.ui.edit_zhiya.getComponent(cc.EditBox).string
		if (!zhiya) {
			UIHelp.ShowTips("请输入正确的销毁数量")
			return
		}
		let wx = this.ui.edit_wx.getComponent(cc.EditBox).string
		let qq = this.ui.edit_qq.getComponent(cc.EditBox).string
		GameDataCenter.player.onUpdataBigPlayer(zhiya, wx, qq)
	}
	onClose() {
		UIHelp.CloseUI(UIBig_rich_updata);
	}
}