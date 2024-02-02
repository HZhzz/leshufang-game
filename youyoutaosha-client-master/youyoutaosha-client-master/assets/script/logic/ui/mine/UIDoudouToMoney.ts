import GameDataCenter from "../../../data/GameDataCenter";
import auto_doudouToMoney from "../../../data/autoui/mine/auto_doudouToMoney";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIDoudouToMoneyRecord from "./UIDoudouToMoneyRecord";
import UIWithdrawal_record from "./UIWithdrawal_record";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIDoudouToMoney")
export default class UIDoudouToMoney extends UIBase {
	ui: auto_doudouToMoney = null;

	protected static prefabUrl = "mine/doudouToMoney";
	protected static className = "UIDoudouToMoney";
	coin: any;
	type: number = 1
	onUILoad() {
		this.ui = this.node.addComponent(auto_doudouToMoney);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_record, this.onRecord);
		this.onRegisterEvent(this.ui.btn_pay, this.onTixian);
		this.onRegisterEvent(this.ui.btn_all, this.onAll);

		this.onRegisterEvent(this.ui.wx, this.onWx);
		this.onRegisterEvent(this.ui.zfb, this.onAli);
	}

	onAll() {
		let num = GameDataCenter.player.doudou;
		this.ui.EditBox.getComponent(cc.EditBox).string = num.toString()
		this.onChangeYuPay()
	}

	onHide() {

	}

	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);

		let editBox = this.ui.EditBox.getComponent(cc.EditBox);

		// 监听EditBox的输入事件
		editBox.node.on('text-changed', (event) => {
			let self = this
			// 处理输入内容变化的逻辑
			self.onChangeYuPay()
		}, this);

		this.initUI()
	}
	onChangeYuPay() {
		let num = this.ui.EditBox.getComponent(cc.EditBox).string
		this.coin = Number(num) * GameDataCenter.player.doudouInfo.fentomoneylibi

		UIHelp.SetLabel(this.ui.lab_money, this.coin.toFixed(2))
	}
	initUI() {
		if (GameDataCenter.player.withdraw == 1) {
			this.ui.wx.active = true
			this.ui.zfb.active = false
			this.type = 1
		}
		if (GameDataCenter.player.withdraw == 2) {
			this.ui.wx.active = false
			this.ui.zfb.active = true
			this.type = 2
		}
		if (GameDataCenter.player.withdraw == 3) {
			this.ui.wx.active = true
			this.ui.zfb.active = true
			this.type = 1
		}
		UIHelp.SetLabel(this.ui.lab_doudouNum, Utils.convertShow(GameDataCenter.player.doudou));
	}

	//乐豆兑换记录
	onRecord() {
		UIHelp.ShowUI(UIDoudouToMoneyRecord);
	}
	//微信
	onWx() {
		this.type = 1
	}
	//支付宝
	onAli() {
		this.type = 2
	}
	//体现
	onTixian() {
		let num = this.ui.EditBox.getComponent(cc.EditBox).string
		if (num) {
			GameDataCenter.player.onTixian(num, 2, this.type)
		}
		else {
			UIHelp.ShowTips("请输入正确的金额")
		}

	}
	onClose() {
		UIHelp.CloseUI(UIDoudouToMoney);
	}
}