const {ccclass} = cc._decorator;

@ccclass
export default class auto_mianScene extends cc.Component {
	Canvas: cc.Node;
	bg3: cc.Node;
	img_tingwei2: cc.Node;
	bg2: cc.Node;
	car1: cc.Node;
	car2: cc.Node;
	car3: cc.Node;
	car4: cc.Node;
	car5: cc.Node;
	car6: cc.Node;
	top_left: cc.Node;
	top_left_gold_node: cc.Node;
	left_icon_gold: cc.Node;
	lab_top_myScore: cc.Node;
	left_num_node: cc.Node;
	lab_gold_num: cc.Node;
	lab_left_ge: cc.Node;
	top_left_time2: cc.Node;
	lab_left_time_time2: cc.Node;
	lab_left_time_number2: cc.Node;
	top_left_ticket_node: cc.Node;
	left_icon_ticket: cc.Node;
	lab_top_myticket: cc.Node;
	left_ticket_node: cc.Node;
	lab_ticket_num: cc.Node;
	lab_left_zhang: cc.Node;
	icon_ck_mine_ticket: cc.Node;
	top_left_time: cc.Node;
	lab_left_time_time: cc.Node;
	lab_left_time_number: cc.Node;
	top_right: cc.Node;
	top_right_money: cc.Node;
	top_right_content: cc.Node;
	button_red: cc.Node;
	label: cc.Node;
	left: cc.Node;
	jingpai: cc.Node;
	icon_zp: cc.Node;
	lab_zp: cc.Node;
	icon_tj: cc.Node;
	lab_tujian: cc.Node;
	icon_jnc: cc.Node;
	lab_jnc: cc.Node;
	icon_shop: cc.Node;
	lab_shop: cc.Node;
	icon_garage: cc.Node;
	lab_garage: cc.Node;
	right: cc.Node;
	shangcheng: cc.Node;
	icon_tds: cc.Node;
	lab_tds: cc.Node;
	icon_qd: cc.Node;
	lab_qd: cc.Node;
	icon_js: cc.Node;
	lab_js: cc.Node;
	icon_play: cc.Node;
	lab_play: cc.Node;
	icon_vip: cc.Node;
	lab_vip: cc.Node;
	pop: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	down_node: cc.Node;
	ToggleContainer: cc.Node;
	toggle1: cc.Node;
	Background1: cc.Node;
	checkmark1: cc.Node;
	toggle2: cc.Node;
	Background2: cc.Node;
	checkmark2: cc.Node;
	toggle3: cc.Node;
	Background3: cc.Node;
	checkmark3: cc.Node;
	toggle4: cc.Node;
	Background4: cc.Node;
	checkmark4: cc.Node;
	toggle5: cc.Node;
	Background5: cc.Node;
	checkmark5: cc.Node;
	web_view: cc.Node;
	title_view: cc.Node;
	close: cc.Node;
	guanbi: cc.Node;
	webview: cc.Node;

	public static URL:string = "db://assets/scene/mianScene.fire"

    onLoad () {
		let parent = this.node.getParent();
		this.Canvas = parent.getChildByName("Canvas");
		this.bg3 = this.Canvas.getChildByName("bg3");
		this.img_tingwei2 = this.bg3.getChildByName("img_tingwei2");
		this.bg2 = this.Canvas.getChildByName("bg2");
		this.car1 = this.bg2.getChildByName("car1");
		this.car2 = this.bg2.getChildByName("car2");
		this.car3 = this.bg2.getChildByName("car3");
		this.car4 = this.bg2.getChildByName("car4");
		this.car5 = this.bg2.getChildByName("car5");
		this.car6 = this.bg2.getChildByName("car6");
		this.top_left = this.Canvas.getChildByName("top_left");
		this.top_left_gold_node = this.top_left.getChildByName("top_left_gold_node");
		this.left_icon_gold = this.top_left_gold_node.getChildByName("left_icon_gold");
		this.lab_top_myScore = this.top_left_gold_node.getChildByName("lab_top_myScore");
		this.left_num_node = this.top_left_gold_node.getChildByName("left_num_node");
		this.lab_gold_num = this.left_num_node.getChildByName("lab_gold_num");
		this.lab_left_ge = this.left_num_node.getChildByName("lab_left_ge");
		this.top_left_time2 = this.top_left_gold_node.getChildByName("top_left_time2");
		this.lab_left_time_time2 = this.top_left_time2.getChildByName("lab_left_time_time2");
		this.lab_left_time_number2 = this.top_left_time2.getChildByName("lab_left_time_number2");
		this.top_left_ticket_node = this.top_left.getChildByName("top_left_ticket_node");
		this.left_icon_ticket = this.top_left_ticket_node.getChildByName("left_icon_ticket");
		this.lab_top_myticket = this.top_left_ticket_node.getChildByName("lab_top_myticket");
		this.left_ticket_node = this.top_left_ticket_node.getChildByName("left_ticket_node");
		this.lab_ticket_num = this.left_ticket_node.getChildByName("lab_ticket_num");
		this.lab_left_zhang = this.left_ticket_node.getChildByName("lab_left_zhang");
		this.icon_ck_mine_ticket = this.top_left_ticket_node.getChildByName("icon_ck_mine_ticket");
		this.top_left_time = this.top_left.getChildByName("top_left_time");
		this.lab_left_time_time = this.top_left_time.getChildByName("lab_left_time_time");
		this.lab_left_time_number = this.top_left_time.getChildByName("lab_left_time_number");
		this.top_right = this.Canvas.getChildByName("top_right");
		this.top_right_money = this.top_right.getChildByName("top_right_money");
		this.top_right_content = this.top_right.getChildByName("top_right_content");
		this.button_red = this.top_right.getChildByName("button_red");
		this.label = this.button_red.getChildByName("label");
		this.left = this.Canvas.getChildByName("left");
		this.jingpai = this.left.getChildByName("jingpai");
		this.icon_zp = this.left.getChildByName("icon_zp");
		this.lab_zp = this.icon_zp.getChildByName("lab_zp");
		this.icon_tj = this.left.getChildByName("icon_tj");
		this.lab_tujian = this.icon_tj.getChildByName("lab_tujian");
		this.icon_jnc = this.left.getChildByName("icon_jnc");
		this.lab_jnc = this.icon_jnc.getChildByName("lab_jnc");
		this.icon_shop = this.left.getChildByName("icon_shop");
		this.lab_shop = this.icon_shop.getChildByName("lab_shop");
		this.icon_garage = this.left.getChildByName("icon_garage");
		this.lab_garage = this.icon_garage.getChildByName("lab_garage");
		this.right = this.Canvas.getChildByName("right");
		this.shangcheng = this.right.getChildByName("shangcheng");
		this.icon_tds = this.right.getChildByName("icon_tds");
		this.lab_tds = this.icon_tds.getChildByName("lab_tds");
		this.icon_qd = this.right.getChildByName("icon_qd");
		this.lab_qd = this.icon_qd.getChildByName("lab_qd");
		this.icon_js = this.right.getChildByName("icon_js");
		this.lab_js = this.icon_js.getChildByName("lab_js");
		this.icon_play = this.right.getChildByName("icon_play");
		this.lab_play = this.icon_play.getChildByName("lab_play");
		this.icon_vip = this.right.getChildByName("icon_vip");
		this.lab_vip = this.icon_vip.getChildByName("lab_vip");
		this.pop = this.Canvas.getChildByName("pop");
		this.ScrollView = this.pop.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.down_node = this.Canvas.getChildByName("down_node");
		this.ToggleContainer = this.down_node.getChildByName("ToggleContainer");
		this.toggle1 = this.ToggleContainer.getChildByName("toggle1");
		this.Background1 = this.toggle1.getChildByName("Background1");
		this.checkmark1 = this.toggle1.getChildByName("checkmark1");
		this.toggle2 = this.ToggleContainer.getChildByName("toggle2");
		this.Background2 = this.toggle2.getChildByName("Background2");
		this.checkmark2 = this.toggle2.getChildByName("checkmark2");
		this.toggle3 = this.ToggleContainer.getChildByName("toggle3");
		this.Background3 = this.toggle3.getChildByName("Background3");
		this.checkmark3 = this.toggle3.getChildByName("checkmark3");
		this.toggle4 = this.ToggleContainer.getChildByName("toggle4");
		this.Background4 = this.toggle4.getChildByName("Background4");
		this.checkmark4 = this.toggle4.getChildByName("checkmark4");
		this.toggle5 = this.ToggleContainer.getChildByName("toggle5");
		this.Background5 = this.toggle5.getChildByName("Background5");
		this.checkmark5 = this.toggle5.getChildByName("checkmark5");
		this.web_view = this.Canvas.getChildByName("web_view");
		this.title_view = this.web_view.getChildByName("title_view");
		this.close = this.title_view.getChildByName("close");
		this.guanbi = this.close.getChildByName("guanbi");
		this.webview = this.web_view.getChildByName("webview");

    }
}
