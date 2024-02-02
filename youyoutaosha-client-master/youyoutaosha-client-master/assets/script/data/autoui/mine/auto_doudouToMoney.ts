const {ccclass} = cc._decorator;

@ccclass
export default class auto_doudouToMoney extends cc.Component {
	doudouToMoney: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	bg: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	lab_close_title: cc.Node;
	btn_record: cc.Node;
	bg_1: cc.Node;
	order_type_name: cc.Node;
	order_type: cc.Node;
	order_payment: cc.Node;
	lab_doudouNum0: cc.Node;
	lab_doudouNum: cc.Node;
	lab_doudouNum2: cc.Node;
	order_sell: cc.Node;
	EditBox: cc.Node;
	BACKGROUND_SPRITE: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	btn_all: cc.Node;
	lab_all: cc.Node;
	lab_pay_name: cc.Node;
	pay_name: cc.Node;
	lab_money: cc.Node;
	lab_type: cc.Node;
	mine: cc.Node;
	icon_yyd: cc.Node;
	lab_main_title: cc.Node;
	lab_shiming: cc.Node;
	paytype: cc.Node;
	wx: cc.Node;
	Background1: cc.Node;
	checkmark1: cc.Node;
	icon_wx: cc.Node;
	wx_title: cc.Node;
	zfb: cc.Node;
	Background2: cc.Node;
	checkmark2: cc.Node;
	icon_zfb: cc.Node;
	zfb_title: cc.Node;
	btn_pay: cc.Node;
	btn_pay_lab: cc.Node;
	lab_content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/doudouToMoney.prefab"

    onLoad () {
		this.doudouToMoney = this.node
		this.ScrollView = this.doudouToMoney.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.bg = this.content.getChildByName("bg");
		this.btn_close = this.bg.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.lab_close_title = this.btn_close.getChildByName("lab_close_title");
		this.btn_record = this.bg.getChildByName("btn_record");
		this.bg_1 = this.bg.getChildByName("bg_1");
		this.order_type_name = this.bg_1.getChildByName("order_type_name");
		this.order_type = this.bg_1.getChildByName("order_type");
		this.order_payment = this.bg_1.getChildByName("order_payment");
		this.lab_doudouNum0 = this.order_payment.getChildByName("lab_doudouNum0");
		this.lab_doudouNum = this.order_payment.getChildByName("lab_doudouNum");
		this.lab_doudouNum2 = this.order_payment.getChildByName("lab_doudouNum2");
		this.order_sell = this.bg_1.getChildByName("order_sell");
		this.EditBox = this.order_sell.getChildByName("EditBox");
		this.BACKGROUND_SPRITE = this.EditBox.getChildByName("BACKGROUND_SPRITE");
		this.TEXT_LABEL = this.EditBox.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.EditBox.getChildByName("PLACEHOLDER_LABEL");
		this.btn_all = this.order_sell.getChildByName("btn_all");
		this.lab_all = this.btn_all.getChildByName("lab_all");
		this.lab_pay_name = this.bg_1.getChildByName("lab_pay_name");
		this.pay_name = this.bg_1.getChildByName("pay_name");
		this.lab_money = this.pay_name.getChildByName("lab_money");
		this.lab_type = this.pay_name.getChildByName("lab_type");
		this.mine = this.bg_1.getChildByName("mine");
		this.icon_yyd = this.mine.getChildByName("icon_yyd");
		this.lab_main_title = this.mine.getChildByName("lab_main_title");
		this.lab_shiming = this.mine.getChildByName("lab_shiming");
		this.paytype = this.bg.getChildByName("paytype");
		this.wx = this.paytype.getChildByName("wx");
		this.Background1 = this.wx.getChildByName("Background1");
		this.checkmark1 = this.wx.getChildByName("checkmark1");
		this.icon_wx = this.wx.getChildByName("icon_wx");
		this.wx_title = this.icon_wx.getChildByName("wx_title");
		this.zfb = this.paytype.getChildByName("zfb");
		this.Background2 = this.zfb.getChildByName("Background2");
		this.checkmark2 = this.zfb.getChildByName("checkmark2");
		this.icon_zfb = this.zfb.getChildByName("icon_zfb");
		this.zfb_title = this.icon_zfb.getChildByName("zfb_title");
		this.btn_pay = this.bg.getChildByName("btn_pay");
		this.btn_pay_lab = this.btn_pay.getChildByName("btn_pay_lab");
		this.lab_content = this.btn_pay.getChildByName("lab_content");

    }
}
