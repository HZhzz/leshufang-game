import auto_consignment_item from "../../../data/autoui/consignment/auto_consignment_item";
import { GameEvent } from "../../../data/const/EventConst";
import EventMng from "../../../manager/EventMng";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIConsignment_item")
export default class UIConsignment_item extends VirtualItem {
	ui: auto_consignment_item = null;

	protected static prefabUrl = "consignment/consignment_item";
	protected static className = "UIConsignment_item";
	vo: any;
	type: number = 1
	onUILoad() {
		this.ui = this.node.addComponent(auto_consignment_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_buy, this.onShowBuy);


	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo, type) {
		this.vo = vo
		// console.log(type);

		// //未拥有
		// if (vo.status == 0) {
		// 	this.ui.btn_buy.getComponent(cc.Button).interactable = false
		// }
		// //可领取
		// else if (vo.status == 1) {
		// 	this.ui.btn_buy.getComponent(cc.Button).interactable = true
		// }
		// //已领取
		// else if (vo.receive == 2) {

		// }
		UIHelp.SetLabel(this.ui.lab_name, vo.name)

		// ${vo.num}/${vo.totalnum}
		if (type == 1) {
			UIHelp.SetLabel(this.ui.lab_number, `出售数量：${vo.num}个`)
			UIHelp.SetLabel(this.ui.lab_buy, "购买")
		} else {
			UIHelp.SetLabel(this.ui.lab_number, `求购数量：${vo.num}个`)
			UIHelp.SetLabel(this.ui.lab_buy, "出售")
		}
		UIHelp.SetLabel(this.ui.lab_doudou, `${vo.price}/个`)
		this.ui.car.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.car, vo.url).then(() => {
			MyTools.scaleToSize(this.ui.car, this.ui.car_size);
			this.ui.car.opacity = 255;
		});
	}

	onShowBuy() {
		EventMng.emit(GameEvent.OPEN_BUY_CAR, this.vo);
	}

	onClose() {
		UIHelp.CloseUI(UIConsignment_item);
	}
}