import auto_friend_item from "../../../data/autoui/friend/auto_friend_item";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIFriend_item")
export default class UIFriend_item extends VirtualItem {
	ui: auto_friend_item = null;

	protected static prefabUrl = "friend/friend_item";
	protected static className = "UIFriend_item";
	@property(cc.SpriteFrame)
	faceP: cc.SpriteFrame = null;
	onUILoad() {
		this.ui = this.node.addComponent(auto_friend_item);
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		if (vo.avatar) {
			UIHelp.SetSpriteFrame(this.ui.img_face, vo.avatar)
		}
		else{
			this.ui.img_face.getComponent(cc.Sprite).spriteFrame = this.faceP
		}
	}
	onClose() {
		UIHelp.CloseUI(UIFriend_item);
	}
}