const {ccclass} = cc._decorator;

@ccclass
export default class auto_sui_pian_node extends cc.Component {
	sui_pian_node: cc.Node;
	bg: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	btn_record: cc.Node;
	label_recored: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/sui_pian_node.prefab"

    onLoad () {
		this.sui_pian_node = this.node
		this.bg = this.sui_pian_node.getChildByName("bg");
		this.btn_close = this.sui_pian_node.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.btn_record = this.sui_pian_node.getChildByName("btn_record");
		this.label_recored = this.btn_record.getChildByName("label_recored");
		this.ScrollView = this.sui_pian_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");

    }
}
