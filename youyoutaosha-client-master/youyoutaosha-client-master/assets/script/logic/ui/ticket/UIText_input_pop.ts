import auto_text_input_pop from "../../../data/autoui/ticket/auto_text_input_pop";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UIText_input_pop")
export default class UIText_input_pop extends UIBase {
	ui: auto_text_input_pop = null;

	protected static prefabUrl = "ticket/text_input_pop";
	protected static className = "UIText_input_pop";

	onUILoad() {
		this.ui = this.node.addComponent(auto_text_input_pop);
	}

	vo = null;
	onInit(params: any): void {
		this.vo = params[0];
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_ok, this.onOk);
		this.onRegisterEvent(this.ui.bg, this.onCancel);
	}

	onOk() {
		const str = this.ui.EditBox.getComponent(cc.EditBox).string;
		if (this.vo.check && !this.vo.check(str)) {
			return;
		}
		if (str.length == 0) {
			UIHelp.ShowTips("输入不能为空");
			return;
		}
		this.onClose();
		this.vo.callback(this.ui.EditBox.getComponent(cc.EditBox).string);
	}

	onCancel() {
		this.vo.onCancel && this.vo.onCancel();
		this.onClose();
	}

	onHide() {

	}

	onStart() {
		UIHelp.SetLabel(this.ui.title, this.vo.title);
		const editBox = this.ui.EditBox.getComponent(cc.EditBox);
		editBox.string = '';
		editBox.placeholder = '';
	}

	onClose() {
		UIHelp.CloseUI(UIText_input_pop);
	}
}