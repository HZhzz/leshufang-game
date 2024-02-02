const {ccclass} = cc._decorator;

@ccclass
export default class auto_superVip_node extends cc.Component {
	superVip_node: cc.Node;
	btn_back: cc.Node;
	bg: cc.Node;
	btn_open: cc.Node;
	btn_close: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/superVip_node.prefab"

    onLoad () {
		this.superVip_node = this.node
		this.btn_back = this.superVip_node.getChildByName("btn_back");
		this.bg = this.superVip_node.getChildByName("bg");
		this.btn_open = this.bg.getChildByName("btn_open");
		this.btn_close = this.bg.getChildByName("btn_close");

    }
}
