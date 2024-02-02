const {ccclass} = cc._decorator;

@ccclass
export default class auto_shop_node extends cc.Component {
	shop_node: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	top1: cc.Node;
	bg_yl: cc.Node;
	icon_zc: cc.Node;
	lab_gold: cc.Node;
	zonge: cc.Node;
	cheku_node: cc.Node;
	lab_cheku: cc.Node;
	xiaofang: cc.Node;
	btn_incheku: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	btn_close_lbl: cc.Node;
	shop: cc.Node;
	img_lihe: cc.Node;
	lab_open_box: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;
	buy_car_node: cc.Node;
	btn_buy_car_close: cc.Node;
	buy_car_back: cc.Node;
	buy_car_title: cc.Node;
	lab_have_zhenzhu: cc.Node;
	buy_car_info: cc.Node;
	icon_car: cc.Node;
	icon_size: cc.Node;
	buy_power_info: cc.Node;
	buy_power_info_have_dou: cc.Node;
	buy_power_info_add: cc.Node;
	buy_power_info_d: cc.Node;
	buy_power_info_jian: cc.Node;
	buy_power_info_jia: cc.Node;
	lab_buy_power_info_num: cc.Node;
	btn_buy_power_info_all: cc.Node;
	buy_power_info_zuida: cc.Node;
	btn_buy: cc.Node;
	btn_pow_lab: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/shop_node.prefab"

    onLoad () {
		this.shop_node = this.node
		this.ScrollView = this.shop_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.top1 = this.content.getChildByName("top1");
		this.bg_yl = this.top1.getChildByName("bg_yl");
		this.icon_zc = this.bg_yl.getChildByName("icon_zc");
		this.lab_gold = this.bg_yl.getChildByName("lab_gold");
		this.zonge = this.bg_yl.getChildByName("zonge");
		this.cheku_node = this.top1.getChildByName("cheku_node");
		this.lab_cheku = this.cheku_node.getChildByName("lab_cheku");
		this.xiaofang = this.cheku_node.getChildByName("xiaofang");
		this.btn_incheku = this.top1.getChildByName("btn_incheku");
		this.btn_close = this.top1.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.btn_close_lbl = this.btn_close.getChildByName("btn_close_lbl");
		this.shop = this.content.getChildByName("shop");
		this.img_lihe = this.shop.getChildByName("img_lihe");
		this.lab_open_box = this.img_lihe.getChildByName("lab_open_box");
		this.ScrollView1 = this.shop.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");
		this.buy_car_node = this.content.getChildByName("buy_car_node");
		this.btn_buy_car_close = this.buy_car_node.getChildByName("btn_buy_car_close");
		this.buy_car_back = this.buy_car_node.getChildByName("buy_car_back");
		this.buy_car_title = this.buy_car_back.getChildByName("buy_car_title");
		this.lab_have_zhenzhu = this.buy_car_back.getChildByName("lab_have_zhenzhu");
		this.buy_car_info = this.buy_car_back.getChildByName("buy_car_info");
		this.icon_car = this.buy_car_info.getChildByName("icon_car");
		this.icon_size = this.buy_car_info.getChildByName("icon_size");
		this.buy_power_info = this.buy_car_info.getChildByName("buy_power_info");
		this.buy_power_info_have_dou = this.buy_car_info.getChildByName("buy_power_info_have_dou");
		this.buy_power_info_add = this.buy_car_back.getChildByName("buy_power_info_add");
		this.buy_power_info_d = this.buy_power_info_add.getChildByName("buy_power_info_d");
		this.buy_power_info_jian = this.buy_power_info_d.getChildByName("buy_power_info_jian");
		this.buy_power_info_jia = this.buy_power_info_d.getChildByName("buy_power_info_jia");
		this.lab_buy_power_info_num = this.buy_power_info_d.getChildByName("lab_buy_power_info_num");
		this.btn_buy_power_info_all = this.buy_power_info_add.getChildByName("btn_buy_power_info_all");
		this.buy_power_info_zuida = this.btn_buy_power_info_all.getChildByName("buy_power_info_zuida");
		this.btn_buy = this.buy_car_back.getChildByName("btn_buy");
		this.btn_pow_lab = this.btn_buy.getChildByName("btn_pow_lab");

    }
}
