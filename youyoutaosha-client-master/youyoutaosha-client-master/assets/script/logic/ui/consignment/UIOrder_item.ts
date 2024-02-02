import GameDataCenter from "../../../data/GameDataCenter";
import auto_order_item from "../../../data/autoui/consignment/auto_order_item";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIOrder_item")
export default class UIOrder_item extends VirtualItem {
	ui: auto_order_item = null;

	protected static prefabUrl = "consignment/order_item";
	protected static className = "UIOrder_item";
	type = 0
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_order_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_buy, this.onCancelOrder);
	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo, type) {
		this.vo = vo
		this.ui.lab_status.active = false;
		this.ui.btn_buy.active = true;
		this.ui.btn_buy.getComponent(cc.Button).interactable = false;
		//挂售中
		if (vo.status == 0) {
			this.ui.btn_buy.getComponent(cc.Button).interactable = true;
			this.ui.btn_buy.active = true;
		}
		//已完成
		else if (vo.status == 1) {
			UIHelp.SetLabel(this.ui.lab_buy, "已完成");
		}
		//已取消
		else if (vo.status == 2) {
			UIHelp.SetLabel(this.ui.lab_buy, "已取消");
		}
		console.log(this.vo);

		UIHelp.SetLabel(this.ui.lab_name, vo.name)

		if (type == 1) {
			UIHelp.SetLabel(this.ui.lab_yet_num, `已购入：${vo.totalnum - vo.num}/${vo.totalnum}个`)
			if (vo.status == 0) {
				UIHelp.SetLabel(this.ui.lab_buy, "取消求购")
			}
		} else {
			UIHelp.SetLabel(this.ui.lab_yet_num, `已出售：${vo.totalnum - vo.num}/${vo.totalnum}个`)
			if (vo.status == 0) {
				UIHelp.SetLabel(this.ui.lab_buy, "取消出售")
			}
		}
		UIHelp.SetLabel(this.ui.lab_doudou, `${vo.price}/个`)
		this.ui.car.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.car, vo.url).then(() => {
			MyTools.scaleToSize(this.ui.car, this.ui.car_size);
			this.ui.car.opacity = 255;
		});
	}
	//取消订单
	onCancelOrder() {
		GameDataCenter.consignment.getcancelorder(this.vo.id)
	}
	onClose() {
		UIHelp.CloseUI(UIOrder_item);
	}
}