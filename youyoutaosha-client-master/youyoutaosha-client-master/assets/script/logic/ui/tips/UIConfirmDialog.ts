
import UIBase from "../UIBase";
import UIHelp, { DialogParams } from "../UIHelp";
import { Log } from "../../../utils/Log";
import auto_confirmDialog from "../../../data/autoui/tips/auto_confirmDialog";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/tips/UIConfirmDialog")
export default class UIConfirmDialog extends UIBase {
	ui: auto_confirmDialog = null;

	protected static prefabUrl = "tips/confirmDialog";
	protected static className = "UIConfirmDialog";

	private _title: string;
	private _content: string;
	private _certainCb: Function;
	private _cancelCb: Function;
	private _okLabel: string;

	onInit(params) {
		if (params == undefined) {
			Log.error(`UIConfirmDialog:没有传入参数！！！`);
			return;
		}
		let data = params[0] as DialogParams;
		this._title = data.title;
		this._content = data.content;
		this._certainCb = data.certainCb;
		this._cancelCb = data.cancelCb;

		this._okLabel = data.okLabel;
	}

	onUILoad() {
		this.ui = this.node.addComponent(auto_confirmDialog);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_quxiao, this.onCancel);
		this.onRegisterEvent(this.ui.btn_certain, this.onCertain);
	}

	onHide() {
	}

	onStart() {
		if (this._okLabel) {
			UIHelp.SetLabel(this.ui.lba, this._okLabel);
		}
		UIHelp.SetLabel(this.ui.lbl_title, this._title);
		UIHelp.SetLabel(this.ui.lbl_content, this._content);
	}

	onClose() {
		UIHelp.CloseUI(UIConfirmDialog);
	}

	onCancel() {
		this.onClose();
		this._cancelCb && this._cancelCb();
	}

	onCertain() {
		this.onClose();
		this._certainCb && this._certainCb();
	}
}