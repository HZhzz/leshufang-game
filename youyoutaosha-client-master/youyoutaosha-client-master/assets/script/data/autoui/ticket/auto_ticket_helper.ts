const {ccclass} = cc._decorator;

@ccclass
export default class auto_ticket_helper extends cc.Component {
	ticket_helper: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	bg: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/ticket_helper.prefab"

    onLoad () {
		this.ticket_helper = this.node
		this.ScrollView = this.ticket_helper.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.bg = this.content.getChildByName("bg");
		this.btn_close = this.bg.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");

    }
}
