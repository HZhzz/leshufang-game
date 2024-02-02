import GameDataCenter from "../../../data/GameDataCenter";
import auto_withdrawal_node from "../../../data/autoui/mine/auto_withdrawal_node";
import { GameEvent } from "../../../data/const/EventConst";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIWithdrawal_record from "./UIWithdrawal_record";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIWithdrawal_node")
export default class UIWithdrawal_node extends UIBase {
	ui: auto_withdrawal_node = null;

	protected static prefabUrl = "mine/withdrawal_node";
	protected static className = "UIWithdrawal_node";

	coin: number = 20;
	type: number = 1
	onUILoad() {
		this.ui = this.node.addComponent(auto_withdrawal_node);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_recrod, this.onRecord);
		this.onRegisterEvent(this.ui.btn_sure, this.onGetMoney);

		this.onRegisterEvent(this.ui.toggle2, this.onSetCoin20);
		this.onRegisterEvent(this.ui.toggle3, this.onSetCoin50);
		this.onRegisterEvent(this.ui.toggle4, this.onSetCoin100);
		this.onRegisterEvent(this.ui.toggle5, this.onSetCoin200);
		this.onRegisterEvent(this.ui.toggle6, this.onSetCoin600);

		this.onRegisterEvent(this.ui.wx, this.onWx);
		this.onRegisterEvent(this.ui.zfb, this.onAli);


	}

	onHide() {

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
		UIHelp.SetLabel(this.ui.withdrawal_node_doudou, GameDataCenter.player.cash + "个")
	}
	onStart() {
		this.initUI()
	}
	onWx() {
		this.type = 1
	}
	onAli() {
		this.type = 2
	}
	onSetCoin20() {
		this.coin = 20;
	}
	onSetCoin50() {
		this.coin = 50;
	}
	onSetCoin100() {
		this.coin = 100;
	}
	onSetCoin200() {
		this.coin = 200;
	}
	onSetCoin600() {
		this.coin = 600;
	}
	//提现
	onGetMoney() {
		GameDataCenter.player.onTixian(this.coin, 1, this.type)
	}
	//现金记录
	onRecord() {
		UIHelp.ShowUI(UIWithdrawal_record, null, "money")
	}

	onClose() {
		UIHelp.CloseUI(UIWithdrawal_node);
	}
}