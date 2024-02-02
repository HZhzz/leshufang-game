import auto_proper_item from "../../../data/autoui/property/auto_proper_item";
import { MyTools } from "../../../utils/MyTools";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/property/UIProper_item")
export default class UIProper_item extends VirtualItem {
	ui: auto_proper_item = null;

	protected static prefabUrl = "property/proper_item";
	protected static className = "UIProper_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_proper_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		console.log(vo);
		this.vo = vo
		UIHelp.SetLabel(this.ui.lab_carname, vo.name)
		UIHelp.SetLabel(this.ui.lab_number, vo.num);

		this.ui.sp_car.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.sp_car, vo.url).then(() => {
			MyTools.scaleToSize(this.ui.sp_car, this.ui.sp_car_size);
			this.ui.sp_car.opacity = 255;
		});
	}
	onClose() {
		UIHelp.CloseUI(UIProper_item);
	}
}