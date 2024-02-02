import auto_yearbook_node_item_item from "../../../data/autoui/frist/auto_yearbook_node_item_item";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIYearbook_node_item_item")
export default class UIYearbook_node_item_item extends VirtualItem {
	ui: auto_yearbook_node_item_item = null;

	protected static prefabUrl = "frist/yearbook_node_item_item";
	protected static className = "UIYearbook_node_item_item";

	onUILoad() {
		this.ui = this.node.addComponent(auto_yearbook_node_item_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	async onInitItem(params: any) {
		this.ui.sp_img.getComponent(cc.Button).interactable = params.ishave;
		this.ui.sp_bg.getComponent(cc.Button).interactable = params.ishave;
		if (params.ishave) {
			this.ui.label_name.color = cc.color(198, 106, 41);
		} else {
			this.ui.label_name.color = cc.color(96, 97, 99);
		}
		UIHelp.SetLabel(this.ui.label_name, params.carname);
		this.ui.sp_img.opacity = 0;
		if (!params.url) return;
		UIHelp.SetSpriteFrame(this.ui.sp_img, params.url).then(() => {
			MyTools.scaleToSize(this.ui.sp_img, this.ui.sp_img_size);
			this.ui.sp_img.opacity = 255;
		});
	}

	onClose() {
		UIHelp.CloseUI(UIYearbook_node_item_item);
	}
}