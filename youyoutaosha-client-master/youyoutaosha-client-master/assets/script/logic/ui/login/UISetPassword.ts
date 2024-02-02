import GameDataCenter from "../../../data/GameDataCenter";
import auto_setPassword from "../../../data/autoui/login/auto_setPassword";
import { GameEvent } from "../../../data/const/EventConst";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/login/UISetPassword")
export default class UISetPassword extends UIBase {
	ui: auto_setPassword = null;

	protected static prefabUrl = "login/setPassword";
	protected static className = "UISetPassword";

	onUILoad() {
		this.ui = this.node.addComponent(auto_setPassword);
	}

	onShow() {
		this.initEvent(GameEvent.REGISTER_SUCCESS, this.onRegisterSuccess);
		this.initEvent(GameEvent.RESET_SUCCESS, this.onClose);

		this.onRegisterEvent(this.ui.btn_getCode, this.onBtnGetCode);
		this.onRegisterEvent(this.ui.btn_register, this.onBtnRegister);
		this.onRegisterEvent(this.ui.btnBack, this.onBtnBack);
	}

	onBtnBack() {
		this.onClose();
	}

	onRegisterSuccess() {
		this.onClose();
	}

	onBtnGetCode() {
		// const phone = this.ui.text_phone.getComponent(cc.EditBox).string;
		const phone = GameDataCenter.player.phone;

		if (!this.checkPhone(phone)) {
			return;
		}

		GameDataCenter.account.sendCode(phone, 'resetpwd');

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

	onBtnRegister() {
		// const phone = this.ui.text_phone.getComponent(cc.EditBox).string;
		const phone = GameDataCenter.player.phone;
		const code = this.ui.text_code.getComponent(cc.EditBox).string;
		const password = this.ui.text_pass.getComponent(cc.EditBox).string;
		const password2 = this.ui.text_pass2.getComponent(cc.EditBox).string;

		if (!this.checkPhone(phone)) {
			return;
		}

		if (code == '') {
			UIHelp.ShowTips('请输入验证码');
			return;
		}

		if (password == '') {
			UIHelp.ShowTips('请输入密码');
			return;
		}

		if (password2 == '') {
			UIHelp.ShowTips('请再次输入密码');
			return;
		}

		if (password != password2) {
			UIHelp.ShowTips('两次密码输入不一致');
			return;
		}

		GameDataCenter.account.resetPwd(phone, password, code);
	}

	checkPhone(phone: string) {
		return true;
		if (phone == '') {
			UIHelp.ShowTips('请输入手机号');
			return false;
		}
		if (phone.length != 11) {
			UIHelp.ShowTips('请输入正确的手机号');
			return false;
		}
		if (!phone.match(/^1[3456789]\d{9}$/)) {
			UIHelp.ShowTips('请输入正确的手机号');
			return false;
		}
		return true;
	}

	onHide() {

	}

	onStart() {
		const phone = GameDataCenter.player.phone.split('').map((v, i) => {
			if (i >= 3 && i <= 6) {
				v = '*';
			}
			return v;
		}).join('');
		UIHelp.SetLabel(this.ui.label_phone, phone);
	}

	onClose() {
		UIHelp.CloseUI(UISetPassword);
	}
}