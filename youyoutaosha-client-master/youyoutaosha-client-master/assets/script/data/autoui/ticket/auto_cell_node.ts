const {ccclass} = cc._decorator;

@ccclass
export default class auto_cell_node extends cc.Component {
	cell_node: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	bg: cc.Node;
	img_wenzi: cc.Node;
	cell_img: cc.Node;
	cell_op_power_node: cc.Node;
	icon_yd: cc.Node;
	label2: cc.Node;
	cell_op_power_lab: cc.Node;
	label12: cc.Node;
	bg_2: cc.Node;
	cell_op_power: cc.Node;
	btn_cell_doudou: cc.Node;
	btn_cell_doudou_lab: cc.Node;
	btn_cell_adv: cc.Node;
	btn_cell_adv_lab: cc.Node;
	cell_info_node: cc.Node;
	cell_info_power_title: cc.Node;
	l1abel2: cc.Node;
	cell_info_power_lab: cc.Node;
	label22: cc.Node;
	cell_info_price_title: cc.Node;
	label3: cc.Node;
	cell_info_price_lab: cc.Node;
	label33: cc.Node;
	cell_record_node: cc.Node;
	cell_record_tile: cc.Node;
	cell_record_tile_lab: cc.Node;
	cell_record_node_img: cc.Node;
	cell_record_user_title: cc.Node;
	cell_record_user_price: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;
	cell_item: cc.Node;
	cell_name: cc.Node;
	cell_cost: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	buy_power_node: cc.Node;
	btn_buy_power_close: cc.Node;
	buy_power_back: cc.Node;
	buy_power_title: cc.Node;
	img_zhixian1: cc.Node;
	lab_today_buysell: cc.Node;
	buy_power_info_title: cc.Node;
	buy_power_info_1: cc.Node;
	buy_power_info_need_doudou_bg: cc.Node;
	img_doudou: cc.Node;
	labelLayout_: cc.Node;
	danwei: cc.Node;
	buy_power_info_need_doudou: cc.Node;
	buy_power_info_have_dou_bg: cc.Node;
	img_doudou2: cc.Node;
	labelLayout_1: cc.Node;
	danwei1: cc.Node;
	buy_power_info_have_dou: cc.Node;
	buy_power_info: cc.Node;
	buy_power_info_add: cc.Node;
	bg_8: cc.Node;
	buy_power_info_jian: cc.Node;
	buy_power_info_jia: cc.Node;
	lab_buy_power_info_num: cc.Node;
	btn_buy_power_info_all: cc.Node;
	buy_power_info_zuida: cc.Node;
	btn_buy: cc.Node;
	outlineLabel: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/cell_node.prefab"

    onLoad () {
		this.cell_node = this.node
		this.ScrollView = this.cell_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.bg = this.content.getChildByName("bg");
		this.img_wenzi = this.bg.getChildByName("img_wenzi");
		this.cell_img = this.bg.getChildByName("cell_img");
		this.cell_op_power_node = this.content.getChildByName("cell_op_power_node");
		this.icon_yd = this.cell_op_power_node.getChildByName("icon_yd");
		this.label2 = this.cell_op_power_node.getChildByName("label2");
		this.cell_op_power_lab = this.label2.getChildByName("cell_op_power_lab");
		this.label12 = this.label2.getChildByName("label12");
		this.bg_2 = this.content.getChildByName("bg_2");
		this.cell_op_power = this.content.getChildByName("cell_op_power");
		this.btn_cell_doudou = this.cell_op_power.getChildByName("btn_cell_doudou");
		this.btn_cell_doudou_lab = this.btn_cell_doudou.getChildByName("btn_cell_doudou_lab");
		this.btn_cell_adv = this.cell_op_power.getChildByName("btn_cell_adv");
		this.btn_cell_adv_lab = this.btn_cell_adv.getChildByName("btn_cell_adv_lab");
		this.cell_info_node = this.content.getChildByName("cell_info_node");
		this.cell_info_power_title = this.cell_info_node.getChildByName("cell_info_power_title");
		this.l1abel2 = this.cell_info_node.getChildByName("l1abel2");
		this.cell_info_power_lab = this.l1abel2.getChildByName("cell_info_power_lab");
		this.label22 = this.l1abel2.getChildByName("label22");
		this.cell_info_price_title = this.cell_info_node.getChildByName("cell_info_price_title");
		this.label3 = this.cell_info_node.getChildByName("label3");
		this.cell_info_price_lab = this.label3.getChildByName("cell_info_price_lab");
		this.label33 = this.label3.getChildByName("label33");
		this.cell_record_node = this.content.getChildByName("cell_record_node");
		this.cell_record_tile = this.cell_record_node.getChildByName("cell_record_tile");
		this.cell_record_tile_lab = this.cell_record_tile.getChildByName("cell_record_tile_lab");
		this.cell_record_node_img = this.cell_record_node.getChildByName("cell_record_node_img");
		this.cell_record_user_title = this.cell_record_node_img.getChildByName("cell_record_user_title");
		this.cell_record_user_price = this.cell_record_node_img.getChildByName("cell_record_user_price");
		this.ScrollView1 = this.cell_record_node.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");
		this.cell_item = this.content1.getChildByName("cell_item");
		this.cell_name = this.cell_item.getChildByName("cell_name");
		this.cell_cost = this.cell_item.getChildByName("cell_cost");
		this.btn_close = this.content.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.buy_power_node = this.cell_node.getChildByName("buy_power_node");
		this.btn_buy_power_close = this.buy_power_node.getChildByName("btn_buy_power_close");
		this.buy_power_back = this.buy_power_node.getChildByName("buy_power_back");
		this.buy_power_title = this.buy_power_back.getChildByName("buy_power_title");
		this.img_zhixian1 = this.buy_power_back.getChildByName("img_zhixian1");
		this.lab_today_buysell = this.buy_power_back.getChildByName("lab_today_buysell");
		this.buy_power_info_title = this.buy_power_back.getChildByName("buy_power_info_title");
		this.buy_power_info_1 = this.buy_power_back.getChildByName("buy_power_info_1");
		this.buy_power_info_need_doudou_bg = this.buy_power_back.getChildByName("buy_power_info_need_doudou_bg");
		this.img_doudou = this.buy_power_info_need_doudou_bg.getChildByName("img_doudou");
		this.labelLayout_ = this.buy_power_info_need_doudou_bg.getChildByName("labelLayout_");
		this.danwei = this.labelLayout_.getChildByName("danwei");
		this.buy_power_info_need_doudou = this.labelLayout_.getChildByName("buy_power_info_need_doudou");
		this.buy_power_info_have_dou_bg = this.buy_power_back.getChildByName("buy_power_info_have_dou_bg");
		this.img_doudou2 = this.buy_power_info_have_dou_bg.getChildByName("img_doudou2");
		this.labelLayout_1 = this.buy_power_info_have_dou_bg.getChildByName("labelLayout_1");
		this.danwei1 = this.labelLayout_1.getChildByName("danwei1");
		this.buy_power_info_have_dou = this.labelLayout_1.getChildByName("buy_power_info_have_dou");
		this.buy_power_info = this.buy_power_back.getChildByName("buy_power_info");
		this.buy_power_info_add = this.buy_power_back.getChildByName("buy_power_info_add");
		this.bg_8 = this.buy_power_info_add.getChildByName("bg_8");
		this.buy_power_info_jian = this.buy_power_info_add.getChildByName("buy_power_info_jian");
		this.buy_power_info_jia = this.buy_power_info_add.getChildByName("buy_power_info_jia");
		this.lab_buy_power_info_num = this.buy_power_info_add.getChildByName("lab_buy_power_info_num");
		this.btn_buy_power_info_all = this.buy_power_info_add.getChildByName("btn_buy_power_info_all");
		this.buy_power_info_zuida = this.btn_buy_power_info_all.getChildByName("buy_power_info_zuida");
		this.btn_buy = this.buy_power_back.getChildByName("btn_buy");
		this.outlineLabel = this.btn_buy.getChildByName("outlineLabel");

    }
}