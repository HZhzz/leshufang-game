import GameDataCenter from "../../../data/GameDataCenter";
import auto_vip_node from "../../../data/autoui/frist/auto_vip_node";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIPay_node from "./UIPay_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIVip_node")
export default class UIVip_node extends UIBase {
	ui: auto_vip_node = null;

	protected static prefabUrl = "frist/vip_node";
	protected static className = "UIVip_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_vip_node);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.onClose);
		this.initEvent(GameEvent.GET_VIP_PRICE, this.onGetPrice);

		this.onRegisterEvent(this.ui.btn_open, this.onVip);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_back, this.onClose);

		this.onRegisterEvent(this.ui.troggle_year, this.onTroggleYear);
		this.onRegisterEvent(this.ui.troggle_month, this.onTroggleMonth);
		this.onRegisterEvent(this.ui.troggle_forever, this.onTroggleForever);

		this.onRegisterEvent(this.ui.btn_openNow, this.onVip);

		let huiyuanendtime: number = GameDataCenter.player.huiyuanendtime;
		if (huiyuanendtime == 0) {
			this.ui.huiyuandate.getComponent(cc.Label).string = "未开通";
		} else {
			let date: Date = new Date();
			if (date.getTime() >= huiyuanendtime * 1000) {
				this.ui.huiyuandate.getComponent(cc.Label).string = "已过期";
			} else {
		
				let str = Utils.timestampToDateString(huiyuanendtime);
		
				this.ui.huiyuandate.getComponent(cc.Label).string = str + "到期";
			}

		}

	}

	_type: string = "yearprice";
	onTroggleForever() {
		this._type = "foreverprice";
	}
	onTroggleMonth() {
		this._type = "monthprice";
	}
	onTroggleYear() {
		this._type = "yearprice";
	}

	onHide() {

	}

	onGetPrice(data) {
		console.log("data", data);
		// UIHelp.SetLabel(this.ui.cost_doudou, data.vip);

		UIHelp.SetLabel(this.ui.price_month, data.vip.monthprice);
		UIHelp.SetLabel(this.ui.price_month_1, data.vip.monthprice);

		UIHelp.SetLabel(this.ui.price_year, data.vip.yearprice);
		UIHelp.SetLabel(this.ui.price_year_1, data.vip.yearprice);

		UIHelp.SetLabel(this.ui.price_forever, data.vip.foreverprice);
		UIHelp.SetLabel(this.ui.price_forever_1, data.vip.foreverprice);
	}

	onStart() {
		GameDataCenter.player.getprice();

		if (GameDataCenter.player.isVip()) {
			this.ui.btn_open.getComponent(cc.Button).interactable = false;
			this.ui.btn_openNow.getComponent(cc.Button).interactable = false;
		}
	}
	onVip() {
		// UIHelp.ShowUI(UIPay_node, null, "vip")
		GameDataCenter.player.onBuyvip(this._type);
	}
	onClose() {
		UIHelp.CloseUI(UIVip_node);
	}
}