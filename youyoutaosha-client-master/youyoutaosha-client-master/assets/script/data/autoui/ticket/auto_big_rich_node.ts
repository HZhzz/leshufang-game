const {ccclass} = cc._decorator;

@ccclass
export default class auto_big_rich_node extends cc.Component {
	big_rich_node: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	big_rich: cc.Node;
	big_rich_info: cc.Node;
	headImg: cc.Node;
	maskbg1: cc.Node;
	mask2: cc.Node;
	maskbg2: cc.Node;
	big_rich_img: cc.Node;
	big_rich_name: cc.Node;
	icon_vip: cc.Node;
	btn_level_cancel: cc.Node;
	label_down: cc.Node;
	btn_level: cc.Node;
	up_icon: cc.Node;
	up_lab: cc.Node;
	big_rich_list: cc.Node;
	big_rich_list_title: cc.Node;
	big_rich_list_lab: cc.Node;
	big_rich_list_doc: cc.Node;
	big_rich_list_node: cc.Node;
	big_rich_list_tile_name: cc.Node;
	big_rich_list_tile_doudou: cc.Node;
	big_rich_list_tile_btn: cc.Node;
	rish_ScrollView: cc.Node;
	view_rish: cc.Node;
	content_rish: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	big_rich_pop: cc.Node;
	big_rich_pop_backgunrd: cc.Node;
	big_rich_pop_info: cc.Node;
	big_rich_pop_kuang2: cc.Node;
	bg_2: cc.Node;
	big_rich_pop_kuang: cc.Node;
	bg_3: cc.Node;
	big_rich_pop_img: cc.Node;
	big_rich_pop_name: cc.Node;
	big_rich_pop_doudou2: cc.Node;
	big_rich_pop_doudou: cc.Node;
	big_rich_pop_wx: cc.Node;
	icon_wx: cc.Node;
	lab_wx: cc.Node;
	btn_copywx: cc.Node;
	btn_copywx_lab: cc.Node;
	big_rich_pop_qq: cc.Node;
	icon_qq: cc.Node;
	lab_qq: cc.Node;
	btn_copyqq: cc.Node;
	lab_copyqq: cc.Node;
	btn_close_pop: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/big_rich_node.prefab"

    onLoad () {
		this.big_rich_node = this.node
		this.ScrollView = this.big_rich_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.big_rich = this.content.getChildByName("big_rich");
		this.big_rich_info = this.big_rich.getChildByName("big_rich_info");
		this.headImg = this.big_rich_info.getChildByName("headImg");
		this.maskbg1 = this.headImg.getChildByName("maskbg1");
		this.mask2 = this.headImg.getChildByName("mask2");
		this.maskbg2 = this.mask2.getChildByName("maskbg2");
		this.big_rich_img = this.mask2.getChildByName("big_rich_img");
		this.big_rich_name = this.big_rich_info.getChildByName("big_rich_name");
		this.icon_vip = this.big_rich_name.getChildByName("icon_vip");
		this.btn_level_cancel = this.big_rich_info.getChildByName("btn_level_cancel");
		this.label_down = this.btn_level_cancel.getChildByName("label_down");
		this.btn_level = this.big_rich_info.getChildByName("btn_level");
		this.up_icon = this.btn_level.getChildByName("up_icon");
		this.up_lab = this.btn_level.getChildByName("up_lab");
		this.big_rich_list = this.big_rich.getChildByName("big_rich_list");
		this.big_rich_list_title = this.big_rich_list.getChildByName("big_rich_list_title");
		this.big_rich_list_lab = this.big_rich_list_title.getChildByName("big_rich_list_lab");
		this.big_rich_list_doc = this.big_rich_list.getChildByName("big_rich_list_doc");
		this.big_rich_list_node = this.big_rich_list.getChildByName("big_rich_list_node");
		this.big_rich_list_tile_name = this.big_rich_list_node.getChildByName("big_rich_list_tile_name");
		this.big_rich_list_tile_doudou = this.big_rich_list_node.getChildByName("big_rich_list_tile_doudou");
		this.big_rich_list_tile_btn = this.big_rich_list_node.getChildByName("big_rich_list_tile_btn");
		this.rish_ScrollView = this.big_rich_list_node.getChildByName("rish_ScrollView");
		this.view_rish = this.rish_ScrollView.getChildByName("view_rish");
		this.content_rish = this.view_rish.getChildByName("content_rish");
		this.btn_close = this.big_rich.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.big_rich_pop = this.big_rich_node.getChildByName("big_rich_pop");
		this.big_rich_pop_backgunrd = this.big_rich_pop.getChildByName("big_rich_pop_backgunrd");
		this.big_rich_pop_info = this.big_rich_pop.getChildByName("big_rich_pop_info");
		this.big_rich_pop_kuang2 = this.big_rich_pop_info.getChildByName("big_rich_pop_kuang2");
		this.bg_2 = this.big_rich_pop_kuang2.getChildByName("bg_2");
		this.big_rich_pop_kuang = this.big_rich_pop_info.getChildByName("big_rich_pop_kuang");
		this.bg_3 = this.big_rich_pop_kuang.getChildByName("bg_3");
		this.big_rich_pop_img = this.big_rich_pop_kuang.getChildByName("big_rich_pop_img");
		this.big_rich_pop_name = this.big_rich_pop_info.getChildByName("big_rich_pop_name");
		this.big_rich_pop_doudou2 = this.big_rich_pop_info.getChildByName("big_rich_pop_doudou2");
		this.big_rich_pop_doudou = this.big_rich_pop_info.getChildByName("big_rich_pop_doudou");
		this.big_rich_pop_wx = this.big_rich_pop_info.getChildByName("big_rich_pop_wx");
		this.icon_wx = this.big_rich_pop_wx.getChildByName("icon_wx");
		this.lab_wx = this.big_rich_pop_wx.getChildByName("lab_wx");
		this.btn_copywx = this.big_rich_pop_wx.getChildByName("btn_copywx");
		this.btn_copywx_lab = this.btn_copywx.getChildByName("btn_copywx_lab");
		this.big_rich_pop_qq = this.big_rich_pop_info.getChildByName("big_rich_pop_qq");
		this.icon_qq = this.big_rich_pop_qq.getChildByName("icon_qq");
		this.lab_qq = this.big_rich_pop_qq.getChildByName("lab_qq");
		this.btn_copyqq = this.big_rich_pop_qq.getChildByName("btn_copyqq");
		this.lab_copyqq = this.btn_copyqq.getChildByName("lab_copyqq");
		this.btn_close_pop = this.big_rich_pop_info.getChildByName("btn_close_pop");

    }
}
