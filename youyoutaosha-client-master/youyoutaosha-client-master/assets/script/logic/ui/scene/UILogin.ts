import GameController from "../../../GameController";
import GameDataCenter from "../../../data/GameDataCenter";
import auto_login from "../../../data/autoui/scene/auto_login";
import { GameEvent } from "../../../data/const/EventConst";
import { DeviceModule } from "../../../data/model/DeviceModule";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIHotupdate from "../hotupdate/UIHotupdate";
import UIBindPhone from "../login/UIBindPhone";
import UIPhoneLogin from "../login/UIPhoneLogin";
import UIRegister from "../login/UIRegister";
import UIXieyi from "../xieyi/UIXieyi";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/scene/UILogin")
export default class UILogin extends UIBase {
	ui: auto_login = null;

	protected static prefabUrl = "";
	protected static className = "UILogin";

	onUILoad() {
		this.ui = this.node.addComponent(auto_login);
		GameController.init();
	}

	onShow() {
		this.initEvent(GameEvent.LOGIN_SUCCESS, this.loginsucess);
		// this.initEvent(GameEvent.NEED_BIND_PHONE, this.needbindphone);
		this.initEvent(GameEvent.CHECK_VERSION_SUCCESS, this.checkVersionSuccess);

		this.onRegisterEvent(this.ui.lab2, this.onUserxy);
		this.onRegisterEvent(this.ui.lab3, this.onYinxy);
		this.onRegisterEvent(this.ui.btn_wx, this.onWxlogin);
		this.onRegisterEvent(this.ui.btn_phone, this.onPhoneLogin);
		this.onRegisterEvent(this.ui.btn_register, this.onRegister);
	}

	needbindphone() {
		UIHelp.ShowTips("请先绑定手机号");
		UIHelp.ShowUI(UIBindPhone);
	}

	onHide() {

	}
	onUserxy() {
		UIHelp.ShowUI(UIXieyi, null, 1)
	}
	onYinxy() {
		UIHelp.ShowUI(UIXieyi, null, 0)
	}
	onStart() {
		GameDataCenter.account.checkVersion();
		DeviceModule.getInstance().getClipContent(function (text) {
			console.log("上级", text)
			cc.sys.localStorage.setItem("shangji", text)
		});
	}
	checkVersionSuccess(data: any) {
		const sysVersion = DeviceModule.getInstance().getAppVerCode();
		if (parseInt(sysVersion) >= parseInt(data.version)) {
			this.onAutoLogin();
			return;
		}

		if (data.force) {
			UIHelp.ShowDialog({
				title: "版本更新",
				content: "有新版本更新，请前往更新！",
				certainCb: () => {
					cc.sys.openURL(data.url);
					cc.game.end();
				}
			});
		} else {
			UIHelp.ShowDialog({
				title: "版本更新",
				content: "有新版本更新，是否前往更新？",
				certainCb: () => {
					cc.sys.openURL(data.url);
				},
				cancelCb: () => {
					this.onAutoLogin();
				}
			});
		}
	}

	onAutoLogin() {
		const hotUpdate = this.ui.Hotupdate.getComponent(UIHotupdate);
		hotUpdate.onCheckUpdateOver(() => {
			this.autoLogin();
		});
	}

	autoLogin() {
		let openid = cc.sys.localStorage.getItem("yyOpneid")
		if (openid && openid != "") {
			this.onWxlogin(this.ui.btn_wx.getComponent(cc.Button));
			return;
			this.disableAllBtn();
			GameDataCenter.account.getUserInfo(openid);
			cc.tween(this.node)
				.delay(2)
				.call(() => {
					this.enableAllBtn();
				})
				.start();
		}
	}

	disableAllBtn() {
		this.ui.btn_wx.getComponent(cc.Button).interactable = false;
		this.ui.btn_phone.getComponent(cc.Button).interactable = false;
		this.ui.btn_register.getComponent(cc.Button).interactable = false;
	}

	enableAllBtn() {
		this.ui.btn_wx.getComponent(cc.Button).interactable = true;
		this.ui.btn_phone.getComponent(cc.Button).interactable = true;
		this.ui.btn_register.getComponent(cc.Button).interactable = true;
	}

	onClose() {
		UIHelp.CloseUI(UILogin);
	}
	onWxlogin(target: cc.Button) {
		const hotUpdate = this.ui.Hotupdate.getComponent(UIHotupdate);
		if (hotUpdate.checkUpdateOver) {
			target.interactable = false;
			cc.tween(target.node)
				.delay(1)
				.call(() => {
					target.interactable = true;
				})
				.start();
			GameDataCenter.account.wxLogin();
		}
	}
	onPhoneLogin(btn_phone: cc.Node, onPhoneLogin: any) {
		UIHelp.ShowUI(UIPhoneLogin);
	}
	onRegister(btn_register: cc.Node, onRegister: any) {
		UIHelp.ShowUI(UIRegister);
	}
	loginsucess() {
		cc.director.loadScene("mianScene")
	}
}