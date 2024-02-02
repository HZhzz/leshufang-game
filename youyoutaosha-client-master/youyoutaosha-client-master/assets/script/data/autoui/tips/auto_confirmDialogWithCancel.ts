const {ccclass} = cc._decorator;

@ccclass
export default class auto_confirmDialogWithCancel extends cc.Component {
	confirmDialogWithCancel: cc.Node;
	model: cc.Node;
	background: cc.Node;
	lbl_title: cc.Node;
	btn_close: cc.Node;
	img_cg: cc.Node;
	lbl_content: cc.Node;
	btn_certain: cc.Node;
	lba: cc.Node;
	btn_quxiao: cc.Node;
	btn_cancel: cc.Node;
	l2ba: cc.Node;

	public static URL:string = "db://assets/resources/prefab/tips/confirmDialogWithCancel.prefab"

    onLoad () {
		this.confirmDialogWithCancel = this.node
		this.model = this.confirmDialogWithCancel.getChildByName("model");
		this.background = this.confirmDialogWithCancel.getChildByName("background");
		this.lbl_title = this.background.getChildByName("lbl_title");
		this.btn_close = this.background.getChildByName("btn_close");
		this.img_cg = this.background.getChildByName("img_cg");
		this.lbl_content = this.background.getChildByName("lbl_content");
		this.btn_certain = this.background.getChildByName("btn_certain");
		this.lba = this.btn_certain.getChildByName("lba");
		this.btn_quxiao = this.background.getChildByName("btn_quxiao");
		this.btn_cancel = this.background.getChildByName("btn_cancel");
		this.l2ba = this.btn_cancel.getChildByName("l2ba");

    }
}
