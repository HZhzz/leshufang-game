import auto_consignment_all_item from "../../../data/autoui/consignment/auto_consignment_all_item";
import { GameEvent } from "../../../data/const/EventConst";
import EventMng from "../../../manager/EventMng";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIConsignment_all_item")
export default class UIConsignment_all_item extends VirtualItem {
	ui: auto_consignment_all_item = null;

	protected static prefabUrl = "consignment/consignment_all_item";
	protected static className = "UIConsignment_all_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_consignment_all_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.consignment_all_item, this.onSeleteCar);
	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo, type) {
		this.vo = vo

		if (vo.selected) {
			this.select();
		} else {
			this.unselect();
		}

		UIHelp.SetLabel(this.ui.lab_name, vo.name)

		this.ui.car.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.car, vo.url).then(() => {
			MyTools.scaleToSize(this.ui.car, this.ui.car_size);
			this.ui.car.opacity = 255;
		});
	}
	//
	onSeleteCar() {
		EventMng.emit(GameEvent.ORDER_SELETECAR, this.vo);
	}
	onClose() {
		UIHelp.CloseUI(UIConsignment_all_item);
	}

	select() {
		this.ui.selected.active = true;
	}
	unselect() {
		this.ui.selected.active = false;
	}
}