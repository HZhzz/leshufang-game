import GameDataCenter from "../../../data/GameDataCenter";
import auto_vipRules_node from "../../../data/autoui/frist/auto_vipRules_node";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIVip_node from "./UIVip_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIVipRules_node")
export default class UIVipRules_node extends UIBase {
	ui: auto_vipRules_node = null;

	protected static prefabUrl = "frist/vipRules_node";
	protected static className = "UIVipRules_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_vipRules_node);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_open, this.onOpen);

		this.initEvent(GameEvent.GET_VIP_PRICE, this.onGetPrice);
	}

	onGetPrice(data) {
		UIHelp.SetLabel(this.ui.cost_doudou, data.vip.yearprice);
	}

	onOpen() {
		UIHelp.ShowUI(UIVip_node);
	}

	onHide() {

	}

	onStart() {
		GameDataCenter.player.getprice();
	}

	onClose() {
		UIHelp.CloseUI(UIVipRules_node);
	}
}