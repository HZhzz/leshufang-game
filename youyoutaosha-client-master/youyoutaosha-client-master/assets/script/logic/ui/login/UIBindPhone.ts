import GameDataCenter from "../../../data/GameDataCenter";
import auto_bindPhone from "../../../data/autoui/login/auto_bindPhone";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIPhoneLogin from "./UIPhoneLogin";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/login/UIBindPhone")
export default class UIBindPhone extends UIBase {
	ui: auto_bindPhone = null;

	protected static prefabUrl = "login/bindPhone";
	protected static className = "UIBindPhone";

	onUILoad() {
		this.ui = this.node.addComponent(auto_bindPhone);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_getCode, this.onBtnGetCode);
		this.onRegisterEvent(this.ui.btn_bind, this.onBtnBind);
		this.onRegisterEvent(this.ui.btnBack, this.onClose);
		this.onRegisterEvent(this.ui.btnPhoneLogin, this.onPhoneLogin);
	}

	onBtnBind() {
		const phone = this.ui.text_phone.getComponent(cc.EditBox).string;
		const code = this.ui.text_code.getComponent(cc.EditBox).string;

		if (phone == '') {
			UIHelp.ShowTips('请输入手机号');
			return;
		}

		if (code == '') {
			UIHelp.ShowTips('请输入验证码');
			return;
		}

		GameDataCenter.account.bindPhone(phone, code);
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
		GameDataCenter.account.sendCode(phone, 'register');

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

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UIBindPhone);
	}

	onPhoneLogin() {
		UIHelp.CloseUI(UIBindPhone);
		UIHelp.ShowUI(UIPhoneLogin);
	}
}