const {ccclass} = cc._decorator;

@ccclass
export default class auto_property_node extends cc.Component {
	property_node: cc.Node;
	top: cc.Node;
	lab_top: cc.Node;
	lab_num: cc.Node;
	rare_node: cc.Node;
	icon_yyd: cc.Node;
	rare_title: cc.Node;
	rare_back: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	proper_item: cc.Node;
	sp_car: cc.Node;
	lab_carname: cc.Node;
	common_node: cc.Node;
	common_title: cc.Node;
	btn_sell: cc.Node;
	btn_sell_lab: cc.Node;
	common_back: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;
	sale_node: cc.Node;
	sale_close: cc.Node;
	sale_back: cc.Node;
	sale_num: cc.Node;
	sale_list_back: cc.Node;
	ScrollView2: cc.Node;
	view2: cc.Node;
	content2: cc.Node;
	sale_money_back: cc.Node;
	sale_lab_money: cc.Node;
	btn_sale: cc.Node;
	btn_sale_lab: cc.Node;

	public static URL:string = "db://assets/resources/prefab/property/property_node.prefab"

    onLoad () {
		this.property_node = this.node
		this.top = this.property_node.getChildByName("top");
		this.lab_top = this.top.getChildByName("lab_top");
		this.lab_num = this.top.getChildByName("lab_num");
		this.rare_node = this.property_node.getChildByName("rare_node");
		this.icon_yyd = this.rare_node.getChildByName("icon_yyd");
		this.rare_title = this.rare_node.getChildByName("rare_title");
		this.rare_back = this.rare_node.getChildByName("rare_back");
		this.ScrollView = this.rare_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");

		this.common_node = this.property_node.getChildByName("common_node");
		this.common_title = this.common_node.getChildByName("common_title");
		this.btn_sell = this.common_node.getChildByName("btn_sell");
		this.btn_sell_lab = this.btn_sell.getChildByName("btn_sell_lab");
		this.common_back = this.common_node.getChildByName("common_back");
		this.ScrollView1 = this.common_node.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");
		this.sale_node = this.property_node.getChildByName("sale_node");
		this.sale_close = this.sale_node.getChildByName("sale_close");
		this.sale_back = this.sale_node.getChildByName("sale_back");
		this.sale_num = this.sale_back.getChildByName("sale_num");
		this.sale_list_back = this.sale_back.getChildByName("sale_list_back");
		this.ScrollView2 = this.sale_back.getChildByName("ScrollView2");
		this.view2 = this.ScrollView2.getChildByName("view2");
		this.content2 = this.view2.getChildByName("content2");
		this.sale_money_back = this.sale_back.getChildByName("sale_money_back");
		this.sale_lab_money = this.sale_money_back.getChildByName("sale_lab_money");
		this.btn_sale = this.sale_back.getChildByName("btn_sale");
		this.btn_sale_lab = this.btn_sale.getChildByName("btn_sale_lab");

    }
}
