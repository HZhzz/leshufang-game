const {ccclass} = cc._decorator;

@ccclass
export default class auto_friend_invite_record extends cc.Component {
	friend_invite_record: cc.Node;
	bg: cc.Node;
	friend_invite_top: cc.Node;
	top_img: cc.Node;
	todey_title: cc.Node;
	layoutLeft: cc.Node;
	todey_lab: cc.Node;
	todey_lab2: cc.Node;
	img_2: cc.Node;
	accumulative_title: cc.Node;
	layoutRight: cc.Node;
	accumulative_lab: cc.Node;
	accumulative_lab2: cc.Node;
	img_qianbao: cc.Node;
	line: cc.Node;
	img_22: cc.Node;
	top_title: cc.Node;
	top_doce: cc.Node;
	invite_record_node: cc.Node;
	invite_record_tile: cc.Node;
	invite_record_tile_lab: cc.Node;
	invite_time: cc.Node;
	invite_one_level: cc.Node;
	invite_two_level: cc.Node;
	invite_altogether: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/friend_invite_record.prefab"

    onLoad () {
		this.friend_invite_record = this.node
		this.bg = this.friend_invite_record.getChildByName("bg");
		this.friend_invite_top = this.friend_invite_record.getChildByName("friend_invite_top");
		this.top_img = this.friend_invite_top.getChildByName("top_img");
		this.todey_title = this.top_img.getChildByName("todey_title");
		this.layoutLeft = this.top_img.getChildByName("layoutLeft");
		this.todey_lab = this.layoutLeft.getChildByName("todey_lab");
		this.todey_lab2 = this.layoutLeft.getChildByName("todey_lab2");
		this.img_2 = this.top_img.getChildByName("img_2");
		this.accumulative_title = this.top_img.getChildByName("accumulative_title");
		this.layoutRight = this.top_img.getChildByName("layoutRight");
		this.accumulative_lab = this.layoutRight.getChildByName("accumulative_lab");
		this.accumulative_lab2 = this.layoutRight.getChildByName("accumulative_lab2");
		this.img_qianbao = this.top_img.getChildByName("img_qianbao");
		this.line = this.top_img.getChildByName("line");
		this.img_22 = this.top_img.getChildByName("img_22");
		this.top_title = this.friend_invite_top.getChildByName("top_title");
		this.top_doce = this.friend_invite_top.getChildByName("top_doce");
		this.invite_record_node = this.friend_invite_record.getChildByName("invite_record_node");
		this.invite_record_tile = this.invite_record_node.getChildByName("invite_record_tile");
		this.invite_record_tile_lab = this.invite_record_tile.getChildByName("invite_record_tile_lab");
		this.invite_time = this.invite_record_node.getChildByName("invite_time");
		this.invite_one_level = this.invite_record_node.getChildByName("invite_one_level");
		this.invite_two_level = this.invite_record_node.getChildByName("invite_two_level");
		this.invite_altogether = this.invite_record_node.getChildByName("invite_altogether");
		this.ScrollView = this.invite_record_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.btn_close = this.friend_invite_record.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");

    }
}
