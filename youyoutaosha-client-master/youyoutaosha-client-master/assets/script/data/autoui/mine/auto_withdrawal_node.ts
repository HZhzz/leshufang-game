const {ccclass} = cc._decorator;

@ccclass
export default class auto_withdrawal_node extends cc.Component {
	withdrawal_node: cc.Node;
	withdrawal: cc.Node;
	withdrawal_node_gold: cc.Node;
	icon_yd: cc.Node;
	withdrawal_node_money: cc.Node;
	withdrawal_node_doudou: cc.Node;
	btn_close: cc.Node;
	btn_close_title: cc.Node;
	btn_recrod: cc.Node;
	withdrawal_list: cc.Node;
	withdrawal_list_title: cc.Node;
	ToggleContainer: cc.Node;
	toggle1: cc.Node;
	Background: cc.Node;
	lab_select_w: cc.Node;
	checkmark: cc.Node;
	lab_select_y: cc.Node;
	toggle2: cc.Node;
	toggle3: cc.Node;
	toggle4: cc.Node;
	toggle5: cc.Node;
	toggle6: cc.Node;
	withdrawal_list_type: cc.Node;
	lab_deoc: cc.Node;
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
	btn_sure: cc.Node;
	btn_sure_lab: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/withdrawal_node.prefab"

    onLoad () {
		this.withdrawal_node = this.node
		this.withdrawal = this.withdrawal_node.getChildByName("withdrawal");
		this.withdrawal_node_gold = this.withdrawal.getChildByName("withdrawal_node_gold");
		this.icon_yd = this.withdrawal_node_gold.getChildByName("icon_yd");
		this.withdrawal_node_money = this.withdrawal_node_gold.getChildByName("withdrawal_node_money");
		this.withdrawal_node_doudou = this.withdrawal_node_gold.getChildByName("withdrawal_node_doudou");
		this.btn_close = this.withdrawal.getChildByName("btn_close");
		this.btn_close_title = this.btn_close.getChildByName("btn_close_title");
		this.btn_recrod = this.btn_close.getChildByName("btn_recrod");
		this.withdrawal_list = this.withdrawal_node.getChildByName("withdrawal_list");
		this.withdrawal_list_title = this.withdrawal_list.getChildByName("withdrawal_list_title");
		this.ToggleContainer = this.withdrawal_list.getChildByName("ToggleContainer");
		this.toggle1 = this.ToggleContainer.getChildByName("toggle1");
		this.Background = this.toggle1.getChildByName("Background");
		this.lab_select_w = this.toggle1.getChildByName("lab_select_w");
		this.checkmark = this.toggle1.getChildByName("checkmark");
		this.lab_select_y = this.checkmark.getChildByName("lab_select_y");
		this.toggle2 = this.ToggleContainer.getChildByName("toggle2");
		this.toggle3 = this.ToggleContainer.getChildByName("toggle3");
		this.toggle4 = this.ToggleContainer.getChildByName("toggle4");
		this.toggle5 = this.ToggleContainer.getChildByName("toggle5");
		this.toggle6 = this.ToggleContainer.getChildByName("toggle6");
		this.withdrawal_list_type = this.withdrawal_list.getChildByName("withdrawal_list_type");
		this.lab_deoc = this.withdrawal_list.getChildByName("lab_deoc");
		this.paytype = this.withdrawal_list.getChildByName("paytype");
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
		this.btn_sure = this.withdrawal_node.getChildByName("btn_sure");
		this.btn_sure_lab = this.btn_sure.getChildByName("btn_sure_lab");

    }
}
