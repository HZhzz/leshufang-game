const {ccclass} = cc._decorator;

@ccclass
export default class auto_friend_detailed_dou extends cc.Component {
	friend_detailed_dou: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	friend_invite_top: cc.Node;
	top_img: cc.Node;
	todey_title: cc.Node;
	accumulative_title: cc.Node;
	img_doudou_: cc.Node;
	labelLayout_: cc.Node;
	danwei: cc.Node;
	todey_lab: cc.Node;
	img_suipian: cc.Node;
	img_y: cc.Node;
	lab_info: cc.Node;
	labelLayout_1: cc.Node;
	danwei2: cc.Node;
	accumulative_lab: cc.Node;
	top_title: cc.Node;
	top_doce: cc.Node;
	img_doudou: cc.Node;
	invite_record_node: cc.Node;
	invite_record_tile: cc.Node;
	invite_record_tile_lab: cc.Node;
	invite_time: cc.Node;
	invite_two_level: cc.Node;
	invite_altogether: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/friend_detailed_dou.prefab"

    onLoad () {
		this.friend_detailed_dou = this.node
		this.ScrollView = this.friend_detailed_dou.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.friend_invite_top = this.content.getChildByName("friend_invite_top");
		this.top_img = this.friend_invite_top.getChildByName("top_img");
		this.todey_title = this.top_img.getChildByName("todey_title");
		this.accumulative_title = this.top_img.getChildByName("accumulative_title");
		this.img_doudou_ = this.top_img.getChildByName("img_doudou_");
		this.labelLayout_ = this.top_img.getChildByName("labelLayout_");
		this.danwei = this.labelLayout_.getChildByName("danwei");
		this.todey_lab = this.labelLayout_.getChildByName("todey_lab");
		this.img_suipian = this.top_img.getChildByName("img_suipian");
		this.img_y = this.top_img.getChildByName("img_y");
		this.lab_info = this.img_y.getChildByName("lab_info");
		this.labelLayout_1 = this.top_img.getChildByName("labelLayout_1");
		this.danwei2 = this.labelLayout_1.getChildByName("danwei2");
		this.accumulative_lab = this.labelLayout_1.getChildByName("accumulative_lab");
		this.top_title = this.friend_invite_top.getChildByName("top_title");
		this.top_doce = this.friend_invite_top.getChildByName("top_doce");
		this.img_doudou = this.friend_invite_top.getChildByName("img_doudou");
		this.invite_record_node = this.content.getChildByName("invite_record_node");
		this.invite_record_tile = this.invite_record_node.getChildByName("invite_record_tile");
		this.invite_record_tile_lab = this.invite_record_tile.getChildByName("invite_record_tile_lab");
		this.invite_time = this.invite_record_node.getChildByName("invite_time");
		this.invite_two_level = this.invite_record_node.getChildByName("invite_two_level");
		this.invite_altogether = this.invite_record_node.getChildByName("invite_altogether");
		this.ScrollView1 = this.invite_record_node.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");
		this.btn_close = this.content.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");

    }
}
