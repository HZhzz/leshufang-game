const {ccclass} = cc._decorator;

@ccclass
export default class auto_vip_node extends cc.Component {
	vip_node: cc.Node;
	btn_back: cc.Node;
	btn_close: cc.Node;
	bg: cc.Node;
	btn_open: cc.Node;
	lineBottom: cc.Node;
	label1: cc.Node;
	cost_doudou: cc.Node;
	label2: cc.Node;
	bg2: cc.Node;
	img_vip: cc.Node;
	layout: cc.Node;
	troggle_month: cc.Node;
	bg_month: cc.Node;
	label: cc.Node;
	line_0: cc.Node;
	label_0: cc.Node;
	price_month: cc.Node;
	mark_month: cc.Node;
	label_0_0: cc.Node;
	line_0: cc.Node;
	label_0_1: cc.Node;
	price_month_1: cc.Node;
	troggle_year: cc.Node;
	bg_year: cc.Node;
	label_1_2: cc.Node;
	line_1: cc.Node;
	label_1_3: cc.Node;
	price_year_1: cc.Node;
	mark_year: cc.Node;
	label_1_1: cc.Node;
	line_1: cc.Node;
	label_1: cc.Node;
	price_year: cc.Node;
	troggle_forever: cc.Node;
	bg_forever: cc.Node;
	label_2: cc.Node;
	line_2: cc.Node;
	label_2: cc.Node;
	price_forever: cc.Node;
	mark_forever: cc.Node;
	label_2_0: cc.Node;
	line_2: cc.Node;
	label_2_2: cc.Node;
	price_forever_1: cc.Node;
	btn_openNow: cc.Node;
	huiyuandate: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/vip_node.prefab"

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
		this.bg2 = this.vip_node.getChildByName("bg2");
		this.img_vip = this.bg2.getChildByName("img_vip");
		this.layout = this.bg2.getChildByName("layout");
		this.troggle_month = this.layout.getChildByName("troggle_month");
		this.bg_month = this.troggle_month.getChildByName("bg_month");
		this.label = this.troggle_month.getChildByName("label");
		this.line_0 = this.troggle_month.getChildByName("line_0__0");
		this.label_0 = this.line_0.getChildByName("label_0");
		this.price_month = this.line_0.getChildByName("price_month");
		this.mark_month = this.troggle_month.getChildByName("mark_month");
		this.label_0_0 = this.mark_month.getChildByName("label_0_0");
		this.line_0 = this.mark_month.getChildByName("line_0");
		this.label_0_1 = this.line_0.getChildByName("label_0_1");
		this.price_month_1 = this.line_0.getChildByName("price_month_1");
		this.troggle_year = this.layout.getChildByName("troggle_year");
		this.bg_year = this.troggle_year.getChildByName("bg_year");
		this.label_1_2 = this.troggle_year.getChildByName("label_1_2");
		this.line_1 = this.troggle_year.getChildByName("line_1");
		this.label_1_3 = this.line_1.getChildByName("label_1_3");
		this.price_year_1 = this.line_1.getChildByName("price_year_1");
		this.mark_year = this.troggle_year.getChildByName("mark_year");
		this.label_1_1 = this.mark_year.getChildByName("label_1_1");
		this.line_1 = this.mark_year.getChildByName("line_1__1");
		this.label_1 = this.line_1.getChildByName("label_1");
		this.price_year = this.line_1.getChildByName("price_year");
		this.troggle_forever = this.layout.getChildByName("troggle_forever");
		this.bg_forever = this.troggle_forever.getChildByName("bg_forever");
		this.label_2 = this.troggle_forever.getChildByName("label_2__1");
		this.line_2 = this.troggle_forever.getChildByName("line_2");
		this.label_2 = this.line_2.getChildByName("label_2");
		this.price_forever = this.line_2.getChildByName("price_forever");
		this.mark_forever = this.troggle_forever.getChildByName("mark_forever");
		this.label_2_0 = this.mark_forever.getChildByName("label_2_0");
		this.line_2 = this.mark_forever.getChildByName("line_2__2");
		this.label_2_2 = this.line_2.getChildByName("label_2_2");
		this.price_forever_1 = this.line_2.getChildByName("price_forever_1");
		this.btn_openNow = this.bg2.getChildByName("btn_openNow");
		this.huiyuandate = this.bg2.getChildByName("huiyuandate");

    }
}
