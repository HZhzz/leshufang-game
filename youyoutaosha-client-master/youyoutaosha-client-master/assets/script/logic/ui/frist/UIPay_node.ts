import GameDataCenter from "../../../data/GameDataCenter";
import auto_pay_node from "../../../data/autoui/frist/auto_pay_node";
import { GameEvent } from "../../../data/const/EventConst";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIPay_node")
export default class UIPay_node extends UIBase {
	ui: auto_pay_node = null;

	protected static prefabUrl = "frist/pay_node";
	protected static className = "UIPay_node";
	vo: any;
	selse: number = 1
	onUILoad() {
		this.ui = this.node.addComponent(auto_pay_node);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.onClose);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_anniu, this.onPay);

		this.onRegisterEvent(this.ui.wx, this.onWx);
		this.onRegisterEvent(this.ui.zfb, this.onAli);
	}

	onHide() {

	}
	//选中微信
	onWx() {
		this.selse = 1
	}
	//选中zfb
	onAli() {
		this.selse = 2
	}
	onInit(params: any) {
		this.vo = params[0]
	}
	onStart() {
		//微信
		if (GameDataCenter.player.recharge == 1) {
			this.ui.wx.active = true
			this.ui.zfb.active = false
			this.selse = 1
		}
		//支付宝
		else if (GameDataCenter.player.recharge == 2) {
			this.ui.wx.active = false
			this.ui.zfb.active = true
			this.selse = 2
		}
		//都有
		if (GameDataCenter.player.recharge == 3) {
			this.ui.wx.active = true
			this.ui.zfb.active = true
			this.selse = 1
		}
	}
	//去支付
	onPay() {
		if (this.vo == "vip") {
			GameDataCenter.player.onBuyvip(this.selse)
		}
		else if (this.vo == "founder") {
			GameDataCenter.player.onBuySupervip(this.selse)
		}
	}
	onClose() {
		UIHelp.CloseUI(UIPay_node);
	}
}