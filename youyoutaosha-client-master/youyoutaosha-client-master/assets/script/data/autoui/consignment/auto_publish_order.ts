const {ccclass} = cc._decorator;

@ccclass
export default class auto_publish_order extends cc.Component {
	publish_order: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	bg: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	lab_close_title: cc.Node;
	btn_record: cc.Node;
	layout: cc.Node;
	bg_1: cc.Node;
	order_type: cc.Node;
	order_type_name: cc.Node;
	btn_order_type: cc.Node;
	lab_payment: cc.Node;
	order_danjia: cc.Node;
	order_num: cc.Node;
	order_sell: cc.Node;
	icon_d: cc.Node;
	order_sell_number: cc.Node;
	BACKGROUND_SPRITE1: cc.Node;
	TEXT_LABEL1: cc.Node;
	lab_ge: cc.Node;
	PLACEHOLDER_LABEL1: cc.Node;
	order_sell_payment: cc.Node;
	EditBox: cc.Node;
	BACKGROUND_SPRITE: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	mine: cc.Node;
	icon_yyd: cc.Node;
	lab_main_title: cc.Node;
	labelLayout_: cc.Node;
	danwei: cc.Node;
	lab_main_doudou: cc.Node;
	lab_content: cc.Node;
	btn_pay: cc.Node;
	btn_pay_lab: cc.Node;
	img_fabuchushou: cc.Node;
	img_fabuqiugou: cc.Node;
	all_car_node: cc.Node;
	bg_black: cc.Node;
	bg2: cc.Node;
	ScrollView2: cc.Node;
	view2: cc.Node;
	content2: cc.Node;

	public static URL:string = "db://assets/resources/prefab/consignment/publish_order.prefab"

    onLoad () {
		this.publish_order = this.node
		this.ScrollView = this.publish_order.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.bg = this.content.getChildByName("bg");
		this.btn_close = this.bg.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.lab_close_title = this.btn_close.getChildByName("lab_close_title");
		this.btn_record = this.bg.getChildByName("btn_record");
		this.layout = this.bg.getChildByName("layout");
		this.bg_1 = this.layout.getChildByName("bg_1");
		this.order_type = this.bg_1.getChildByName("order_type");
		this.order_type_name = this.order_type.getChildByName("order_type_name");
		this.btn_order_type = this.order_type.getChildByName("btn_order_type");
		this.lab_payment = this.bg_1.getChildByName("lab_payment");
		this.order_danjia = this.bg_1.getChildByName("order_danjia");
		this.order_num = this.bg_1.getChildByName("order_num");
		this.order_sell = this.bg_1.getChildByName("order_sell");
		this.icon_d = this.order_sell.getChildByName("icon_d");
		this.order_sell_number = this.order_sell.getChildByName("order_sell_number");
		this.BACKGROUND_SPRITE1 = this.order_sell_number.getChildByName("BACKGROUND_SPRITE1");
		this.TEXT_LABEL1 = this.order_sell_number.getChildByName("TEXT_LABEL1");
		this.lab_ge = this.TEXT_LABEL1.getChildByName("lab_ge");
		this.PLACEHOLDER_LABEL1 = this.order_sell_number.getChildByName("PLACEHOLDER_LABEL1");
		this.order_sell_payment = this.bg_1.getChildByName("order_sell_payment");
		this.EditBox = this.order_sell_payment.getChildByName("EditBox");
		this.BACKGROUND_SPRITE = this.EditBox.getChildByName("BACKGROUND_SPRITE");
		this.TEXT_LABEL = this.EditBox.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.EditBox.getChildByName("PLACEHOLDER_LABEL");
		this.mine = this.layout.getChildByName("mine");
		this.icon_yyd = this.mine.getChildByName("icon_yyd");
		this.lab_main_title = this.mine.getChildByName("lab_main_title");
		this.labelLayout_ = this.mine.getChildByName("labelLayout_");
		this.danwei = this.labelLayout_.getChildByName("danwei");
		this.lab_main_doudou = this.labelLayout_.getChildByName("lab_main_doudou");
		this.lab_content = this.layout.getChildByName("lab_content");
		this.btn_pay = this.bg.getChildByName("btn_pay");
		this.btn_pay_lab = this.btn_pay.getChildByName("btn_pay_lab");
		this.img_fabuchushou = this.btn_pay.getChildByName("img_fabuchushou");
		this.img_fabuqiugou = this.btn_pay.getChildByName("img_fabuqiugou");
		this.all_car_node = this.bg.getChildByName("all_car_node");
		this.bg_black = this.all_car_node.getChildByName("bg_black");
		this.bg2 = this.all_car_node.getChildByName("bg2");
		this.ScrollView2 = this.bg2.getChildByName("ScrollView2");
		this.view2 = this.ScrollView2.getChildByName("view2");
		this.content2 = this.view2.getChildByName("content2");

    }
}
