import GameDataCenter from "../../../data/GameDataCenter";
import auto_share_node from "../../../data/autoui/friend/auto_share_node";
import { ConfigModule } from "../../../data/model/ConfigModule";
import { DeviceModule } from "../../../data/model/DeviceModule";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/friend/UIShare_node")
export default class UIShare_node extends UIBase {
	ui: auto_share_node = null;

	protected static prefabUrl = "friend/share_node";
	protected static className = "UIShare_node";

	private url: string;
	onUILoad() {
		this.ui = this.node.addComponent(auto_share_node);

		//this.url = `${ConfigModule.SHARE_URL}?shangjiid=${GameDataCenter.player.id}`;
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose)
		this.onRegisterEvent(this.ui.btn_wx, this.onBtnShareImage)
		this.onRegisterEvent(this.ui.btn_pyq, this.onBtnShareImage1)
		this.onRegisterEvent(this.ui.btn_bd, this.onButBaocun)
	}

	onHide() {

	}

	onStart() {
		this.url = `${GameDataCenter.account.shareUrl}?shangjiid=${GameDataCenter.player.id}`;
		console.log(this.url);

		UIHelp.SetSpriteFrame(this.ui.img_face, GameDataCenter.player.avatar)
		UIHelp.SetLabel(this.ui.lab_name, '我是' + GameDataCenter.player.name)
		UIHelp.drawErweima(this.ui.ewm_node, this.url)
		UIHelp.SetSpriteFrame(this.ui.img_face1, GameDataCenter.player.avatar)
		UIHelp.SetLabel(this.ui.lab_name1, 'Hi,我是' + GameDataCenter.player.name)
		UIHelp.drawErweima(this.ui.ewm_node1, this.url)
	}
	onBtnShareImage() {
		var fullPath = DeviceModule.getInstance().captureScreen()
		var info = {
			isfriend: true,  //true为好友  false 为朋友圈
			imagepath: fullPath,
		}
		var str = JSON.stringify(info)
		DeviceModule.getInstance().shareImage(str)
	}
	onBtnShareImage1() {
		var fullPath = DeviceModule.getInstance().captureScreen()
		var info = {
			isfriend: false,  //true为好友  false 为朋友圈
			imagepath: fullPath,
		}
		var str = JSON.stringify(info)
		DeviceModule.getInstance().shareImage(str)
	}
	onButBaocun() {
		var fullPath = DeviceModule.getInstance().captureScreen()
		DeviceModule.getInstance().saveFileToPhoto(fullPath)
		
		UIHelp.ShowTips("保存成功")
	}
	onClose() {
		UIHelp.CloseUI(UIShare_node);
	}

	// showSharepic() {
	// 	let index = this.ui.pageView.getComponent(cc.PageView).getCurrentPageIndex();
	// 	this.ui.bg_fenxiang_tu1.getComponent(cc.Sprite).spriteFrame = this.ui[`page_${index + 1}`].getComponent(cc.Sprite).spriteFrame;
	// }
}