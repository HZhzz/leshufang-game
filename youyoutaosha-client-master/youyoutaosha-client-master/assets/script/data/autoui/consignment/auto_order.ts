const {ccclass} = cc._decorator;

@ccclass
export default class auto_order extends cc.Component {
	order: cc.Node;
	bg: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	oder_title: cc.Node;
	bg_1: cc.Node;
	biaoti: cc.Node;
	biaoti1: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;
	down: cc.Node;
	btn_my_shou: cc.Node;

	public static URL:string = "db://assets/resources/prefab/consignment/order.prefab"

    onLoad () {
		this.order = this.node
		this.bg = this.order.getChildByName("bg");
		this.btn_close = this.bg.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.oder_title = this.btn_close.getChildByName("oder_title");
		this.bg_1 = this.order.getChildByName("bg_1");
		this.biaoti = this.bg_1.getChildByName("biaoti");
		this.biaoti1 = this.bg_1.getChildByName("biaoti1");
		this.ScrollView1 = this.order.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");
		this.down = this.order.getChildByName("down");
		this.btn_my_shou = this.down.getChildByName("btn_my_shou");

    }
}
