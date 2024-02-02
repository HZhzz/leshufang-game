import auto_ali from "../../../data/autoui/mine/auto_ali";
import { GameEvent } from "../../../data/const/EventConst";
import { DeviceModule } from "../../../data/model/DeviceModule";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIAli")
export default class UIAli extends UIBase {
	ui: auto_ali = null;

	protected static prefabUrl = "mine/ali";
	protected static className = "UIAli";

	onUILoad() {
		this.ui = this.node.addComponent(auto_ali);
	}

	onShow() {
		this.initEvent(GameEvent.ALIREALNAME, this.onClose);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_real, this.onRealZFB);
	}

	onHide() {

	}

	onStart() {

	}
	//实名认证
	onRealZFB(){
		DeviceModule.getInstance().goToAliRealName()
		this.onClose()
	}
	onClose() {
		UIHelp.CloseUI(UIAli);
	}
}