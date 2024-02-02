const {ccclass} = cc._decorator;

@ccclass
export default class auto_confirmDialog extends cc.Component {
	confirmDialog: cc.Node;
	model: cc.Node;
	background: cc.Node;
	lbl_title: cc.Node;
	btn_close: cc.Node;
	img_cg: cc.Node;
	lbl_content: cc.Node;
	btn_certain: cc.Node;
	lba: cc.Node;
	btn_quxiao: cc.Node;

	public static URL:string = "db://assets/resources/prefab/tips/confirmDialog.prefab"

    onLoad () {
		this.confirmDialog = this.node
		this.model = this.confirmDialog.getChildByName("model");
		this.background = this.confirmDialog.getChildByName("background");
		this.lbl_title = this.background.getChildByName("lbl_title");
		this.btn_close = this.background.getChildByName("btn_close");
		this.img_cg = this.background.getChildByName("img_cg");
		this.lbl_content = this.background.getChildByName("lbl_content");
		this.btn_certain = this.background.getChildByName("btn_certain");
		this.lba = this.btn_certain.getChildByName("lba");
		this.btn_quxiao = this.background.getChildByName("btn_quxiao");

    }
}
