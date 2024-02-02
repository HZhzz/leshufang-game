import auto_consignment_record_item from "../../../data/autoui/consignment/auto_consignment_record_item";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIConsignment_record_item")
export default class UIConsignment_record_item extends VirtualItem {
	ui: auto_consignment_record_item = null;

	protected static prefabUrl = "consignment/consignment_record_item";
	protected static className = "UIConsignment_record_item";

	onUILoad() {
		this.ui = this.node.addComponent(auto_consignment_record_item);
	}

	public onInitItem(data): void {
		UIHelp.SetLabel(this.ui.lab_num, data.num);
		// UIHelp.SetLabel(this.ui.lab_date, data.createtime);

		const flg = data.t == '1' ? '+' : '-';
		UIHelp.SetLabel(this.ui.lab_dou, flg + data.balance);

		UIHelp.SetLabel(this.ui.lab_name, data.name);

		// this.ui.img.opacity = 0;
		// UIHelp.SetSpriteFrame(this.ui.img, data.url).then(() => {
		// 	MyTools.scaleToSize(this.ui.img, this.ui.img_size);
		// 	this.ui.img.opacity = 255;
		// });
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UIConsignment_record_item);
	}
}