import auto_loading from "../../../data/autoui/loading/auto_loading";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import { ViewZorder } from "../../../data/const/ViewZOrder";
import { GameEvent } from "../../../data/const/EventConst";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/loading/UILoading")
export default class UILoading extends UIBase {
	ui: auto_loading = null;

	protected static prefabUrl = "loading/loading";
	protected static className = "UILoading";

	onUILoad() {
		this.ui = this.node.addComponent(auto_loading);
		cc.game.addPersistRootNode(this.node);
		this.node.active = false;
	}

	onShow() {
	}

	onHide() {
	}

	onStart() {
	}

	onClose() {
		UIHelp.CloseUI(UILoading);
	}

	onUpdate(dt) {
		if(this.node.active){
			this.ui.load.angle -= 5;
		}
	}
	
	showLoding(){
		let uiRoot = cc.director.getScene();
		this.node.parent = uiRoot
		this.node.active = true;
		this.node.zIndex = ViewZorder.Loading;
	}

	hideLoding(){
		this.node.active = false;
	}
}