import GameDataCenter from "../../../data/GameDataCenter";
import auto_sui_pian_item from "../../../data/autoui/ticket/auto_sui_pian_item";
import { MyTools } from "../../../utils/MyTools";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIText_input_pop from "./UIText_input_pop";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UISui_pian_item")
export default class UISui_pian_item extends VirtualItem {
	ui: auto_sui_pian_item = null;

	protected static prefabUrl = "ticket/sui_pian_item";
	protected static className = "UISui_pian_item";

	onUILoad() {
		this.ui = this.node.addComponent(auto_sui_pian_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_change, this.onChange);
	}

	async onChange() {
		const realName = await this.waitInput("输入真实姓名");
		const phone = await this.waitInput("输入手机号码", this.checkPhone);
		const address = await this.waitInput("输入收货地址");
		GameDataCenter.player.exchangefragment(this.vo.code, realName, phone, address);
	}

	checkPhone(str) {
		if (str == '') {
			UIHelp.ShowTips('请输入手机号');
			return;
		}
		if (str.length != 11) {
			UIHelp.ShowTips('请输入正确的手机号');
			return;
		}
		if (!str.match(/^1[3456789]\d{9}$/)) {
			UIHelp.ShowTips('请输入正确的手机号');
			return;
		}
		return true;
	}

	waitInput(title: string, check = null) {
		return new Promise((resolve, reject) => {
			UIHelp.ShowUI(UIText_input_pop, null, {
				title: title,
				callback: (str) => {
					resolve(str);
				},
				onCancel: () => {
					reject();
				},
				check: check
			});
		});
	}

	onHide() {

	}

	vo = null;
	public onInitItem(data): void {
		this.vo = data;
		console.log("data", data);
		this.ui.img_icon.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.img_icon, data.url).then(() => {
			MyTools.scaleToSize(this.ui.img_icon, this.ui.img_size);
			this.ui.img_icon.opacity = 255;
		});
		UIHelp.SetLabel(this.ui.label_name, data.name);
		UIHelp.SetLabel(this.ui.label_number, `拥有碎片 ${Utils.convertShow(data.myfragment)}/${data.fragment}`);
		if (data.myfragment >= data.fragment) {
			this.ui.btn_change.getComponent(cc.Button).interactable = true;
		} else {
			this.ui.btn_change.getComponent(cc.Button).interactable = false;
		}
	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UISui_pian_item);
	}
}