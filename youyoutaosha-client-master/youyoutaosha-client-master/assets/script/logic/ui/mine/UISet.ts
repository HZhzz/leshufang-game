import GameDataCenter from "../../../data/GameDataCenter";
import auto_set from "../../../data/autoui/mine/auto_set";
import { GameEvent } from "../../../data/const/EventConst";
import { ConfigModule } from "../../../data/model/ConfigModule";
import { SdkHelperForDuoLiang } from "../../../data/model/SdkHelpers/SdkHelperForDuoLiang";
import UIBase from "../UIBase";
import UIHelp, { DialogParams } from "../UIHelp";
import UISetPassword from "../login/UISetPassword";
import UIXieyi from "../xieyi/UIXieyi";
import UIHelpCenter from "./UIHelpCenter";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UISet")
export default class UISet extends UIBase {
	ui: auto_set = null;

	protected static prefabUrl = "mine/set";
	protected static className = "UISet";

	onUILoad() {
		this.ui = this.node.addComponent(auto_set);
	}

	onShow() {
		this.initEvent(GameEvent.BANDSHANGJIID, this.onCloseBandid);
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.exit, this.onExitToLogin);
		this.onRegisterEvent(this.ui.ys, this.onYinSiXieyi);
		this.onRegisterEvent(this.ui.yq, this.onShowShangji);
		this.onRegisterEvent(this.ui.btn_copywx, this.onBandid);
		this.onRegisterEvent(this.ui.btn_close_pop, this.onCloseBandid);
		this.onRegisterEvent(this.ui.pass, this.onShowPass);

		this.onRegisterEvent(this.ui.dlyx, this.onShowDuoLiang);

		this.onRegisterEvent(this.ui.yh, this.onShowYongHuXieYi);
		this.onRegisterEvent(this.ui.gy, this.onShowGuanYuWoMen);


		this.ui.wx_number_edit.on('editing-did-ended', this.onWxNumberChanged.bind(this));
		this.ui.qq_number_edit.on('editing-did-ended', this.onQqNumberChanged.bind(this));
	}

	_count = 0;
	onShowDuoLiang() {
		// if (this._count < 10) {
		// 	this._count++;
		// 	return;
		// }
		// this._count = 0;
		console.log("onShowDuoLiang");

		SdkHelperForDuoLiang.jumpAdList(GameDataCenter.player.id.toString());
	}

	onShowPass() {
		UIHelp.ShowUI(UISetPassword);
	}

	onWxNumberChanged() {
		const wxNumber = this.ui.wx_number_edit.getComponent(cc.EditBox).string;
		const qqNumber = this.ui.qq_number_edit.getComponent(cc.EditBox).string;
		if (!wxNumber.match(/^[a-zA-Z0-9_-]{0,49}$/)) {
			UIHelp.ShowTips("请输入正确的微信号");
			this.ui.wx_number_edit.getComponent(cc.EditBox).string = GameDataCenter.player.weixinid;
			return;
		}
		GameDataCenter.player.onWeiXinQqChanged(wxNumber, qqNumber);
	}

	onQqNumberChanged() {
		const wxNumber = this.ui.wx_number_edit.getComponent(cc.EditBox).string;
		const qqNumber = this.ui.qq_number_edit.getComponent(cc.EditBox).string;
		if (!qqNumber.match(/^[a-zA-Z0-9_-]{0,49}$/)) {
			UIHelp.ShowTips("请输入正确的QQ号");
			this.ui.qq_number_edit.getComponent(cc.EditBox).string = GameDataCenter.player.qqid;
			return;
		}
		GameDataCenter.player.onWeiXinQqChanged(wxNumber, qqNumber);
	}

	onHide() {

	}

	onStart() {

		this.initUI()
	}
	initUI() {
		if (GameDataCenter.player.shangji != "") {
			UIHelp.SetLabel(this.ui.lab_shangji, "ID:" + GameDataCenter.player.shangji);
			this.ui.qy_zhi.active = false;
		}
		else {
			UIHelp.SetLabel(this.ui.lab_shangji, "");
		}
		UIHelp.SetLabel(this.ui.wx_number_edit, GameDataCenter.player.weixinid)
		UIHelp.SetLabel(this.ui.qq_number_edit, GameDataCenter.player.qqid)
		UIHelp.SetLabel(this.ui.versionLab, ConfigModule.VERSION);

	}

	onShowGuanYuWoMen() {
		UIHelp.ShowDialog({
			title: '乐乐个游',
			content: '乐乐个游\n'+ ConfigModule.VERSION,
		});
	}

	onShowHelpCenter() {
		UIHelp.ShowUI(UIHelpCenter);
	}

	onYinSiXieyi() {
		UIHelp.ShowUI(UIXieyi, null, UIXieyi.YINSI_XIEYI)
	}

	onShowYongHuXieYi() {
		UIHelp.ShowUI(UIXieyi, null, UIXieyi.YONGHU_XIEYI)
	}

	onExitToLogin() {
		GameDataCenter.account.jwt = ""
		cc.sys.localStorage.setItem("yyOpneid", "")
		cc.director.loadScene("login")
	}


	//上级id
	onShowShangji() {
		if (GameDataCenter.player.shangji != "") {
			UIHelp.ShowTips("您已经绑定过上级ID");
			return
		}
		this.ui.bandID.active = true
		this.ui.EditBox.getComponent(cc.EditBox).string = ""
	}
	onCloseBandid() {
		this.ui.bandID.active = false
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
		UIHelp.CloseUI(UISet);
	}
}