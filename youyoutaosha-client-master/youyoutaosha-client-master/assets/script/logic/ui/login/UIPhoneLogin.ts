import auto_phoneLogin from "../../../data/autoui/login/auto_phoneLogin";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIMng from "../../../manager/UIMng";
import GameDataCenter from "../../../data/GameDataCenter";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/login/UIPhoneLogin")
export default class UIPhoneLogin extends UIBase {
	ui: auto_phoneLogin = null;

	protected static prefabUrl = "login/phoneLogin";
	protected static className = "UIPhoneLogin";

	onUILoad() {
		this.ui = this.node.addComponent(auto_phoneLogin);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_pass, this.onBtnPass);
		this.onRegisterEvent(this.ui.btn_getCode, this.onBtnGetCode);
		this.onRegisterEvent(this.ui.btn_code, this.onBtnCode);
		this.onRegisterEvent(this.ui.btn_login, this.onBtnLogin);
		this.onRegisterEvent(this.ui.btnBack, this.onBtnBack);
	}

	onBtnBack() {
		this.onClose();
	}

	onBtnGetCode() {
		const phone = this.ui.text_phone.getComponent(cc.EditBox).string;
		if (phone == '') {
			UIHelp.ShowTips('请输入手机号');
			return;
		}
		if (phone.length != 11) {
			UIHelp.ShowTips('请输入正确的手机号');
			return;
		}
		if (!phone.match(/^1[3456789]\d{9}$/)) {
			UIHelp.ShowTips('请输入正确的手机号');
			return;
		}
		GameDataCenter.account.sendCode(phone, 'login');

		this.ui.btn_getCode.getComponent(cc.Button).interactable = false;
		let count = 30;
		cc.tween(this.ui.btn_getCode)
			.call(() => {
				count--;
				this.ui.labelGetCode.getComponent(cc.Label).string = count + "s";
				this.ui.btn_getCode.color = cc.color(220 - count * 3, 220 - count * 3, 220 - count * 3);
			})
			.delay(1)
			.union()
			.repeat(30)
			.call(() => {
				this.ui.btn_getCode.color = cc.color(255, 255, 255);
				this.ui.btn_getCode.getComponent(cc.Button).interactable = true;
				this.ui.labelGetCode.getComponent(cc.Label).string = "获取验证码";
			})
			.start();
	}

	_type = 'code'
	onBtnPass() {
		this.ui.img_code.active = false;
		this.ui.img_pass.active = true;
		this._type = 'pass'
	}

	onBtnCode() {
		this.ui.img_code.active = true;
		this.ui.img_pass.active = false;
		this._type = 'code'
	}

	onBtnLogin() {
		const phone = this.ui.text_phone.getComponent(cc.EditBox).string;
		const code = this.ui.text_code.getComponent(cc.EditBox).string;
		const pass = this.ui.text_pass.getComponent(cc.EditBox).string;

		if (phone == '') {
			UIHelp.ShowTips('请输入手机号');
			return;
		}

		if (this._type == 'code') {
			if (code == '') {
				UIHelp.ShowTips('请输入验证码');
				return;
			}
			GameDataCenter.account.phoneLogin(phone, null, code);
		} else {
			if (pass == '') {
				UIHelp.ShowTips('请输入密码');
				return;
			}
			GameDataCenter.account.phoneLogin(phone, pass, null);
		}
	}

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UIPhoneLogin);
	}
}