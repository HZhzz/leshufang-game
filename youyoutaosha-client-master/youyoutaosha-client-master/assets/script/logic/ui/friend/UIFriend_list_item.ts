import auto_friend_list_item from "../../../data/autoui/friend/auto_friend_list_item";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIFriend_list_item")
export default class UIFriend_list_item extends VirtualItem {
	ui: auto_friend_list_item = null;

	protected static prefabUrl = "friend/friend_list_item";
	protected static className = "UIfriend_list_item";
	vo: any;

	@property(cc.SpriteFrame)
	faceP: cc.SpriteFrame = null;

	onUILoad() {
		this.ui = this.node.addComponent(auto_friend_list_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		console.log(this.ui)
		
		UIHelp.SetLabel(this.ui.lab_name, Utils.cutString(vo.nickname, 24));
		UIHelp.SetLabel(this.ui.lab_time, '2023/' + vo.createtime);
		// UIHelp.SetLabel(this.ui.lab_level, "LV." + vo.lv)
		if (vo.avatar) {
			UIHelp.SetSpriteFrame(this.ui.sp_face, vo.avatar)
		}
		else{
			this.ui.sp_face.getComponent(cc.Sprite).spriteFrame = this.faceP
			//UIHelp.SetSpriteFrame(this.ui.sp_face, this.faceP)
		}
		// if (vo.lv == "联创") {
		// 	this.ui.img_super.active = true
		// 	 this.ui.img_vip.active = false
		// }
		// else if (vo.lv == "会员") {
		// 	this.ui.img_vip.active = true
		// 	this.ui.img_super.active = false
		// }
		// else{
		// 	this.ui.img_vip.active = false
		// 	this.ui.img_super.active = false
		// }
	}

	onClose() {
		UIHelp.CloseUI(UIFriend_list_item);
	}
}