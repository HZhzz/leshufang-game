import auto_confirmDialogWithCancel from "../../../data/autoui/tips/auto_confirmDialogWithCancel";
import { Log } from "../../../utils/Log";
import UIBase from "../UIBase";
import UIHelp, { DialogParams } from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/tips/UIConfirmDialogWithCancel")
export default class UIConfirmDialogWithCancel extends UIBase {
	ui: auto_confirmDialogWithCancel = null;

	protected static prefabUrl = "tips/confirmDialogWithCancel";
	protected static className = "UIConfirmDialogWithCancel";

	onUILoad() {
		this.ui = this.node.addComponent(auto_confirmDialogWithCancel);
	}

	private _title: string;
	private _content: string;
	private _certainCb: Function;
	private _cancelCb: Function;

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
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_quxiao, this.onCancel);
		this.onRegisterEvent(this.ui.btn_certain, this.onCertain);
		this.onRegisterEvent(this.ui.btn_cancel, this.onCancel);
	}

	onHide() {
	}

	onStart() {
		UIHelp.SetLabel(this.ui.lbl_title, this._title);
		UIHelp.SetLabel(this.ui.lbl_content, this._content);
	}

	onClose() {
		UIHelp.CloseUI(UIConfirmDialogWithCancel);
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