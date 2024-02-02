const {ccclass} = cc._decorator;

@ccclass
export default class auto_doudouGive extends cc.Component {
	doudouGive: cc.Node;
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
	lab_doudou: cc.Node;
	RICHTEXT_CHILD: cc.PrivateNode;
	order_sell: cc.Node;
	EditBox: cc.Node;
	BACKGROUND_SPRITE: cc.Node;
	TEXT_LABEL: cc.Node;
	PLACEHOLDER_LABEL: cc.Node;
	lab_pay_name: cc.Node;
	pay_name: cc.Node;
	EditBox1: cc.Node;
	BACKGROUND_SPRITE1: cc.Node;
	TEXT_LABEL1: cc.Node;
	PLACEHOLDER_LABEL1: cc.Node;
	lab_content: cc.Node;
	lab_aixin: cc.Node;
	lab_aixinc: cc.Node;
	btn_give: cc.Node;
	btn_pay_lab: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/doudouGive.prefab"

    onLoad () {
		this.doudouGive = this.node
		this.ScrollView = this.doudouGive.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.bg = this.content.getChildByName("bg");
		this.btn_close = this.bg.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.lab_close_title = this.btn_close.getChildByName("lab_close_title");
		this.btn_record = this.bg.getChildByName("btn_record");
		this.bg_1 = this.bg.getChildByName("bg_1");
		this.order_type_name = this.bg_1.getChildByName("order_type_name");
		this.lab_doudou = this.bg_1.getChildByName("lab_doudou");
		this.RICHTEXT_CHILD = this.lab_doudou.getChildByName("RICHTEXT_CHILD");
		this.order_sell = this.bg_1.getChildByName("order_sell");
		this.EditBox = this.order_sell.getChildByName("EditBox");
		this.BACKGROUND_SPRITE = this.EditBox.getChildByName("BACKGROUND_SPRITE");
		this.TEXT_LABEL = this.EditBox.getChildByName("TEXT_LABEL");
		this.PLACEHOLDER_LABEL = this.EditBox.getChildByName("PLACEHOLDER_LABEL");
		this.lab_pay_name = this.bg_1.getChildByName("lab_pay_name");
		this.pay_name = this.bg_1.getChildByName("pay_name");
		this.EditBox1 = this.pay_name.getChildByName("EditBox1");
		this.BACKGROUND_SPRITE1 = this.EditBox1.getChildByName("BACKGROUND_SPRITE1");
		this.TEXT_LABEL1 = this.EditBox1.getChildByName("TEXT_LABEL1");
		this.PLACEHOLDER_LABEL1 = this.EditBox1.getChildByName("PLACEHOLDER_LABEL1");
		this.lab_content = this.bg_1.getChildByName("lab_content");
		this.lab_aixin = this.bg_1.getChildByName("lab_aixin");
		this.lab_aixinc = this.bg_1.getChildByName("lab_aixinc");
		this.btn_give = this.bg.getChildByName("btn_give");
		this.btn_pay_lab = this.btn_give.getChildByName("btn_pay_lab");

    }
}
