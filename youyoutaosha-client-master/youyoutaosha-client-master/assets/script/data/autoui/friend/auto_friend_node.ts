const {ccclass} = cc._decorator;

@ccclass
export default class auto_friend_node extends cc.Component {
	friend_node: cc.Node;
	bg2: cc.Node;
	bg: cc.Node;
	top1: cc.Node;
	label_1: cc.Node;
	label_2: cc.Node;
	top2: cc.Node;
	top_parze_friend: cc.Node;
	redpack_node: cc.Node;
	hongbao_icon: cc.Node;
	hongbao_title: cc.Node;
	hongbao_num: cc.Node;
	material_node: cc.Node;
	material_icon: cc.Node;
	layout: cc.Node;
	material_title: cc.Node;
	material_num: cc.Node;
	material_title2: cc.Node;
	doudou_node: cc.Node;
	doudou_icon: cc.Node;
	layout2: cc.Node;
	doudou_title: cc.Node;
	doudou_num: cc.Node;
	doudou_num2: cc.Node;
	top_pzrze_title: cc.Node;
	lab_top_pzrze_title: cc.Node;
	myFriend_node: cc.Node;
	lab_myfriend_title: cc.Node;
	lab_myfriend_num: cc.Node;
	btn_invent_friend: cc.Node;
	btn_invent_friend_lab: cc.Node;
	btn_invent_friend_icon: cc.Node;
	friestScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	// top3: cc.Node;
	// Reward_Benefits: cc.Node;
	// Reward_Benefits_node: cc.Node;
	// Reward_Benefits_icon: cc.Node;
	// Reward_Benefits_title: cc.Node;
	// Reward_Benefits_nowtitle: cc.Node;
	// Reward_Benefits_lieji: cc.Node;
	// Reward_Benefits_lab_num: cc.Node;
	// Reward_Benefits_lab_all: cc.Node;
	// btn_Reward_Benefits: cc.Node;
	// Reward_Benefits_my: cc.Node;
	// Reward_Benefits_my_back: cc.Node;
	// Reward_Benefits_my_icon: cc.Node;
	// Reward_Benefits_my_title: cc.Node;
	// Reward_Benefits_my_num: cc.Node;
	// btn_Reward_Benefits_tixian: cc.Node;
	// Reward_Benefits_tixian_leb: cc.Node;
	// Reward_Benefits_big_tile: cc.Node;
	// Reward_Benefits_big_tile_leb: cc.Node;

	// 团队直推
	top4:cc.Node;
	fansdata:cc.Node;
	data_layout:cc.Node;
	zhitui_layout:cc.Node;
	zhitui_num:cc.Node;
	zhitui_title:cc.Node;
	tuandui_layout:cc.Node;
	tuandui_num:cc.Node;
	tuandui_title:cc.Node;
	benyue_layout:cc.Node;
	benyue_num:cc.Node;
	benyue_title:cc.Node;
	shangyue_layout:cc.Node;
	shangyue_num:cc.Node;
	shangyue_title:cc.Node;
	bg_dj:cc.Node;
	leave_layout:cc.Node;
	tu:cc.Node;
	tu_num:cc.Node;
	img_tu:cc.Node;
	jin:cc.Node;
	jin_num:cc.Node;
	img_jin:cc.Node;
	shui:cc.Node;
	shui_num:cc.Node;
	img_shui:cc.Node;
	mu:cc.Node;
	mu_num:cc.Node;
	img_mu:cc.Node;
	huo:cc.Node;
	huo_num:cc.Node;
	img_huo:cc.Node;
	top_title:cc.Node;
	user_scrollView:cc.Node;
	user_view:cc.Node;
	conten:cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/friend_node.prefab"

    onLoad () {
		this.friend_node = this.node
		this.bg2 = this.friend_node.getChildByName("bg2");
		this.bg = this.friend_node.getChildByName("bg");
		this.top1 = this.friend_node.getChildByName("top1");
		this.label_1 = this.friend_node.getChildByName("label_1");
		this.label_2 = this.friend_node.getChildByName("label_2");
		this.top2 = this.friend_node.getChildByName("top2");
		this.top_parze_friend = this.top2.getChildByName("top_parze_friend");
		this.redpack_node = this.top_parze_friend.getChildByName("redpack_node");
		this.hongbao_icon = this.redpack_node.getChildByName("hongbao_icon");
		this.hongbao_title = this.redpack_node.getChildByName("hongbao_title");
		this.hongbao_num = this.redpack_node.getChildByName("hongbao_num");
		this.material_node = this.top_parze_friend.getChildByName("material_node");
		this.material_icon = this.material_node.getChildByName("material_icon");
		this.layout = this.material_node.getChildByName("layout");
		this.material_title = this.layout.getChildByName("material_title");
		this.material_num = this.layout.getChildByName("material_num");
		this.material_title2 = this.layout.getChildByName("material_title2");
		this.doudou_node = this.top_parze_friend.getChildByName("doudou_node");
		this.doudou_icon = this.doudou_node.getChildByName("doudou_icon");
		this.layout2 = this.doudou_node.getChildByName("layout2");
		this.doudou_title = this.layout2.getChildByName("doudou_title");
		this.doudou_num = this.layout2.getChildByName("doudou_num");
		this.doudou_num2 = this.layout2.getChildByName("doudou_num2");
		this.top_pzrze_title = this.top2.getChildByName("top_pzrze_title");
		this.lab_top_pzrze_title = this.top_pzrze_title.getChildByName("lab_top_pzrze_title");
		this.myFriend_node = this.top2.getChildByName("myFriend_node");
		this.lab_myfriend_title = this.myFriend_node.getChildByName("lab_myfriend_title");
		this.lab_myfriend_num = this.myFriend_node.getChildByName("lab_myfriend_num");
		this.btn_invent_friend = this.top2.getChildByName("btn_invent_friend");
		this.btn_invent_friend_lab = this.btn_invent_friend.getChildByName("btn_invent_friend_lab");
		this.btn_invent_friend_icon = this.btn_invent_friend.getChildByName("btn_invent_friend_icon");
		this.friestScrollView = this.top2.getChildByName("friestScrollView");
		this.view = this.friestScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		// this.top3 = this.friend_node.getChildByName("top3");
		// this.Reward_Benefits = this.top3.getChildByName("Reward_Benefits");
		// this.Reward_Benefits_node = this.Reward_Benefits.getChildByName("Reward_Benefits_node");
		// this.Reward_Benefits_icon = this.Reward_Benefits_node.getChildByName("Reward_Benefits_icon");
		// this.Reward_Benefits_title = this.Reward_Benefits_node.getChildByName("Reward_Benefits_title");
		// this.Reward_Benefits_nowtitle = this.Reward_Benefits_node.getChildByName("Reward_Benefits_nowtitle");
		// this.Reward_Benefits_lieji = this.Reward_Benefits_node.getChildByName("Reward_Benefits_lieji");
		// this.Reward_Benefits_lab_num = this.Reward_Benefits_node.getChildByName("Reward_Benefits_lab_num");
		// this.Reward_Benefits_lab_all = this.Reward_Benefits_node.getChildByName("Reward_Benefits_lab_all");
		// this.btn_Reward_Benefits = this.Reward_Benefits_node.getChildByName("btn_Reward_Benefits");
		// this.Reward_Benefits_my = this.Reward_Benefits.getChildByName("Reward_Benefits_my");
		// this.Reward_Benefits_my_back = this.Reward_Benefits_my.getChildByName("Reward_Benefits_my_back");
		// this.Reward_Benefits_my_icon = this.Reward_Benefits_my.getChildByName("Reward_Benefits_my_icon");
		// this.Reward_Benefits_my_title = this.Reward_Benefits_my.getChildByName("Reward_Benefits_my_title");
		// this.Reward_Benefits_my_num = this.Reward_Benefits_my.getChildByName("Reward_Benefits_my_num");
		// this.btn_Reward_Benefits_tixian = this.Reward_Benefits_my.getChildByName("btn_Reward_Benefits_tixian");
		// this.Reward_Benefits_tixian_leb = this.btn_Reward_Benefits_tixian.getChildByName("Reward_Benefits_tixian_leb");
		// this.Reward_Benefits_big_tile = this.top3.getChildByName("Reward_Benefits_big_tile");
		// this.Reward_Benefits_big_tile_leb = this.Reward_Benefits_big_tile.getChildByName("Reward_Benefits_big_tile_leb");
		// 团队
		this.top4 = this.friend_node.getChildByName("top4");
		this.fansdata = this.top4.getChildByName("fansdata");
		// 业绩数据
		this.data_layout = this.fansdata.getChildByName("data_layout");
		this.zhitui_layout = this.data_layout.getChildByName("zhitui_layout")
		this.zhitui_num = this.zhitui_layout.getChildByName("zhitui_num")
		this.zhitui_title = this.zhitui_layout.getChildByName("zhitui_title")
		this.tuandui_layout = this.data_layout.getChildByName("tuandui_layout")
		this.tuandui_num = this.tuandui_layout.getChildByName("tuandui_num")
		this.tuandui_title = this.tuandui_layout.getChildByName("tuandui_title")
		this.benyue_layout = this.data_layout.getChildByName("benyue_layout")
		this.benyue_num = this.benyue_layout.getChildByName("benyue_num")
		this.benyue_title = this.benyue_layout.getChildByName("benyue_title")
		this.shangyue_layout = this.data_layout.getChildByName("shangyue_layout")
		this.shangyue_num = this.shangyue_layout.getChildByName("shangyue_num")
		this.shangyue_title = this.shangyue_layout.getChildByName("shangyue_title")
		// ai人数
		this.bg_dj=this.top4.getChildByName("bg_dj");
		this.leave_layout = this.bg_dj.getChildByName("leave_layout");
		this.tu = this.leave_layout.getChildByName("tu");
		this.tu_num = this.tu.getChildByName("tu_num");
		this.img_tu = this.tu.getChildByName("img_tu");
		this.jin = this.leave_layout.getChildByName("jin");
		this.jin_num = this.jin.getChildByName("jin_num");
		this.img_jin = this.jin.getChildByName("img_jin");
		this.shui = this.leave_layout.getChildByName("shui");
		this.shui_num = this.shui.getChildByName("shui_num");
		this.img_shui = this.shui.getChildByName("img_shui");
		this.shui = this.leave_layout.getChildByName("shui");
		this.shui_num = this.shui.getChildByName("shui_num");
		this.img_shui = this.shui.getChildByName("img_shui");
		this.mu = this.leave_layout.getChildByName("mu");
		this.mu_num = this.mu.getChildByName("mu_num");
		this.img_mu = this.mu.getChildByName("img_mu");
		this.huo = this.leave_layout.getChildByName("huo");
		this.huo_num = this.huo.getChildByName("huo_num");
		this.img_huo = this.huo.getChildByName("img_huo");

		// 列表
		this.user_scrollView = this.top4.getChildByName("user_scrollView");
		this.user_view = this.user_scrollView.getChildByName("user_view");
		this.conten = this.user_view.getChildByName("conten")
    }
}
