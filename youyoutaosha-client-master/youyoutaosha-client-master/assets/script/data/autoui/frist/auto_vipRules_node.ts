const {ccclass} = cc._decorator;

@ccclass
export default class auto_vipRules_node extends cc.Component {
	vip_node: cc.Node;
	btn_back: cc.Node;
	btn_close: cc.Node;
	bg: cc.Node;
	btn_open: cc.Node;
	lineBottom: cc.Node;
	label1: cc.Node;
	cost_doudou: cc.Node;
	label2: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/vipRules_node.prefab"

    onLoad () {
		this.vip_node = this.node
		this.btn_back = this.vip_node.getChildByName("btn_back");
		this.btn_close = this.vip_node.getChildByName("btn_close");
		this.bg = this.vip_node.getChildByName("bg");
		this.btn_open = this.bg.getChildByName("btn_open");
		this.lineBottom = this.vip_node.getChildByName("lineBottom");
		this.label1 = this.lineBottom.getChildByName("label1");
		this.cost_doudou = this.lineBottom.getChildByName("cost_doudou");
		this.label2 = this.lineBottom.getChildByName("label2");

    }
}
