import auto_sui_pian_record_item from "../../../data/autoui/ticket/auto_sui_pian_record_item";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UISui_pian_record_item")
export default class UISui_pian_record_item extends VirtualItem {
	ui: auto_sui_pian_record_item = null;

	protected static prefabUrl = "ticket/sui_pian_record_item";
	protected static className = "UISui_pian_record_item";

	onUILoad() {
		this.ui = this.node.addComponent(auto_sui_pian_record_item);
	}

	vo: any;
	public onInitItem(data): void {
		this.vo = data;
		console.log("UISui_pian_record_item", data);

		this.ui.img_icon.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.img_icon, data.url).then(() => {
			MyTools.scaleToSize(this.ui.img_icon, this.ui.img_size);
			this.ui.img_icon.opacity = 255;
		});
		UIHelp.SetLabel(this.ui.label_name, data.name);
		UIHelp.SetLabel(this.ui.label_date, data.createtime);
		const statusStr = ["未发货", "已发货", "已完成"][data.status];
		UIHelp.SetLabel(this.ui.label_status, statusStr);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UISui_pian_record_item);
	}
}