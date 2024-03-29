const {ccclass} = cc._decorator;

@ccclass
export default class auto_ticket_node extends cc.Component {
	ticket_node: cc.Node;
	ticket: cc.Node;
	ticket_node_face: cc.Node;
	ticket_node_title: cc.Node;
	labelLayout_3: cc.Node;
	danwei: cc.Node;
	ticket_node_num: cc.Node;
	ticket_node_gold: cc.Node;
	icon_yd: cc.Node;
	userinfo_node_money: cc.Node;
	labelLayout_1: cc.Node;
	danwei2: cc.Node;
	ticket_node_doudou: cc.Node;
	btn_check_duihuan: cc.Node;
	img_ct02: cc.Node;
	img_ct01: cc.Node;
	btn_prizet_node: cc.Node;
	prizet_node: cc.Node;
	prizet_node_icon: cc.Node;
	labelLayout_2: cc.Node;
	danwei3: cc.Node;
	prizet_node_num: cc.Node;
	prizet_node_tile: cc.Node;
	btn_lingqu: cc.Node;
	btn_lingqu_lab: cc.Node;
	redpack_node: cc.Node;
	redpack_node_icon: cc.Node;
	redpack_node_num: cc.Node;
	redpack_node_tile: cc.Node;
	btn_chek_red: cc.Node;
	lab_check_red: cc.Node;
	btn_list_node: cc.Node;
	btn_vip: cc.Node;
	lab_btn_yqm: cc.Node;
	btn_power: cc.Node;
	lab_btn_smrz: cc.Node;
	btn_turn: cc.Node;
	lab_help: cc.Node;
	btn_check_dd: cc.Node;
	lab_check_updata: cc.Node;
	btn_check_cj: cc.Node;
	lab_check_updata22: cc.Node;
	btn_check_js: cc.Node;
	lab_check_updata3: cc.Node;
	ad_node: cc.Node;
	img_app01: cc.Node;
	img_app02: cc.Node;
	ticket_toggle: cc.Node;
	ticket_toggle1: cc.Node;
	Background1: cc.Node;
	ticket_toggle1_label: cc.Node;
	checkmark1: cc.Node;
	ticket_toggle2: cc.Node;
	Background2: cc.Node;
	ticket_toggle2_label: cc.Node;
	checkmark2: cc.Node;
	vip_node_ticket: cc.Node;
	img_wenan: cc.Node;
	ticket_bg: cc.Node;
	waitingNode: cc.Node;
	vip_nodetitle_ticket: cc.Node;
	vip_node_time: cc.Node;
	labelLayout_: cc.Node;
	danwei4: cc.Node;
	vip_node_renshu_ticket: cc.Node;
	vip_nodetitle: cc.Node;
	btn_canyu: cc.Node;
	btn_lab_ticket: cc.Node;
	btn_quchu: cc.Node;
	btn_lab_ticket2: cc.Node;
	loadingNode: cc.Node;
	label_loading: cc.Node;
	resultNode: cc.Node;
	label_result: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/ticket_node.prefab"

    onLoad () {
		this.ticket_node = this.node
		this.ticket = this.ticket_node.getChildByName("ticket");
		this.ticket_node_face = this.ticket.getChildByName("ticket_node_face");
		this.ticket_node_title = this.ticket.getChildByName("ticket_node_title");
		this.labelLayout_3 = this.ticket.getChildByName("labelLayout_3");
		this.danwei = this.labelLayout_3.getChildByName("danwei");
		this.ticket_node_num = this.labelLayout_3.getChildByName("ticket_node_num");
		this.ticket_node_gold = this.ticket.getChildByName("ticket_node_gold");
		this.icon_yd = this.ticket_node_gold.getChildByName("icon_yd");
		this.userinfo_node_money = this.ticket_node_gold.getChildByName("userinfo_node_money");
		this.labelLayout_1 = this.ticket_node_gold.getChildByName("labelLayout_1");
		this.danwei2 = this.labelLayout_1.getChildByName("danwei2");
		this.ticket_node_doudou = this.labelLayout_1.getChildByName("ticket_node_doudou");
		this.btn_check_duihuan = this.ticket_node_gold.getChildByName("btn_check_duihuan");
		this.img_ct02 = this.ticket_node_gold.getChildByName("img_ct02");
		this.img_ct01 = this.ticket_node_gold.getChildByName("img_ct01");
		this.btn_prizet_node = this.ticket_node.getChildByName("btn_prizet_node");
		this.prizet_node = this.btn_prizet_node.getChildByName("prizet_node");
		this.prizet_node_icon = this.prizet_node.getChildByName("prizet_node_icon");
		this.labelLayout_2 = this.prizet_node.getChildByName("labelLayout_2");
		this.danwei3 = this.labelLayout_2.getChildByName("danwei3");
		this.prizet_node_num = this.labelLayout_2.getChildByName("prizet_node_num");
		this.prizet_node_tile = this.prizet_node.getChildByName("prizet_node_tile");
		this.btn_lingqu = this.prizet_node.getChildByName("btn_lingqu");
		this.btn_lingqu_lab = this.btn_lingqu.getChildByName("btn_lingqu_lab");
		this.redpack_node = this.btn_prizet_node.getChildByName("redpack_node");
		this.redpack_node_icon = this.redpack_node.getChildByName("redpack_node_icon");
		this.redpack_node_num = this.redpack_node.getChildByName("redpack_node_num");
		this.redpack_node_tile = this.redpack_node.getChildByName("redpack_node_tile");
		this.btn_chek_red = this.redpack_node.getChildByName("btn_chek_red");
		this.lab_check_red = this.btn_chek_red.getChildByName("lab_check_red");
		this.btn_list_node = this.ticket_node.getChildByName("btn_list_node");
		this.btn_vip = this.btn_list_node.getChildByName("btn_vip");
		this.lab_btn_yqm = this.btn_vip.getChildByName("lab_btn_yqm");
		this.btn_power = this.btn_list_node.getChildByName("btn_power");
		this.lab_btn_smrz = this.btn_power.getChildByName("lab_btn_smrz");
		this.btn_turn = this.btn_list_node.getChildByName("btn_turn");
		this.lab_help = this.btn_turn.getChildByName("lab_help");
		this.btn_check_dd = this.btn_list_node.getChildByName("btn_check_dd");
		this.lab_check_updata = this.btn_check_dd.getChildByName("lab_check_updata");
		this.btn_check_cj = this.btn_list_node.getChildByName("btn_check_cj");
		this.lab_check_updata22 = this.btn_check_cj.getChildByName("lab_check_updata22");
		this.btn_check_js = this.btn_list_node.getChildByName("btn_check_js");
		this.lab_check_updata3 = this.btn_check_js.getChildByName("lab_check_updata3");
		this.ad_node = this.ticket_node.getChildByName("ad_node");
		this.img_app01 = this.ad_node.getChildByName("img_app01");
		this.img_app02 = this.ad_node.getChildByName("img_app02");
		this.ticket_toggle = this.ticket_node.getChildByName("ticket_toggle");
		this.ticket_toggle1 = this.ticket_toggle.getChildByName("ticket_toggle1");
		this.Background1 = this.ticket_toggle1.getChildByName("Background1");
		this.ticket_toggle1_label = this.ticket_toggle1.getChildByName("ticket_toggle1_label");
		this.checkmark1 = this.ticket_toggle1.getChildByName("checkmark1");
		this.ticket_toggle2 = this.ticket_toggle.getChildByName("ticket_toggle2");
		this.Background2 = this.ticket_toggle2.getChildByName("Background2");
		this.ticket_toggle2_label = this.ticket_toggle2.getChildByName("ticket_toggle2_label");
		this.checkmark2 = this.ticket_toggle2.getChildByName("checkmark2");
		this.vip_node_ticket = this.ticket_node.getChildByName("vip_node_ticket");
		this.img_wenan = this.vip_node_ticket.getChildByName("img_wenan");
		this.ticket_bg = this.vip_node_ticket.getChildByName("ticket_bg");
		this.waitingNode = this.vip_node_ticket.getChildByName("waitingNode");
		this.vip_nodetitle_ticket = this.waitingNode.getChildByName("vip_nodetitle_ticket");
		this.vip_node_time = this.waitingNode.getChildByName("vip_node_time");
		this.labelLayout_ = this.waitingNode.getChildByName("labelLayout_");
		this.danwei4 = this.labelLayout_.getChildByName("danwei4");
		this.vip_node_renshu_ticket = this.labelLayout_.getChildByName("vip_node_renshu_ticket");
		this.vip_nodetitle = this.waitingNode.getChildByName("vip_nodetitle");
		this.btn_canyu = this.waitingNode.getChildByName("btn_canyu");
		this.btn_lab_ticket = this.btn_canyu.getChildByName("btn_lab_ticket");
		this.btn_quchu = this.waitingNode.getChildByName("btn_quchu");
		this.btn_lab_ticket2 = this.btn_quchu.getChildByName("btn_lab_ticket2");
		this.loadingNode = this.vip_node_ticket.getChildByName("loadingNode");
		this.label_loading = this.loadingNode.getChildByName("label_loading");
		this.resultNode = this.vip_node_ticket.getChildByName("resultNode");
		this.label_result = this.resultNode.getChildByName("label_result");
		this.ScrollView1 = this.ticket_node.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");

    }
}
