const {ccclass} = cc._decorator;

@ccclass
export default class auto_sui_pian_record extends cc.Component {
	sui_pian_record: cc.Node;
	bg: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/sui_pian_record.prefab"

    onLoad () {
		this.sui_pian_record = this.node
		this.bg = this.sui_pian_record.getChildByName("bg");
		this.btn_close = this.sui_pian_record.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.ScrollView = this.sui_pian_record.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");

    }
}
