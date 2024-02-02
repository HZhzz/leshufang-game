const {ccclass} = cc._decorator;

@ccclass
export default class auto_invite_info extends cc.Component {
	invite_info: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	btn_close: cc.Node;
	icon_close: cc.Node;
	lab_st: cc.Node;
	btn_my_inviter: cc.Node;
	lab_st2: cc.Node;
	layout: cc.Node;
	bg1: cc.Node;
	label1: cc.Node;
	bg2: cc.Node;
	label_my_invite_code: cc.Node;
	btn_copy_my_invite_code: cc.Node;
	btn_label: cc.Node;
	bg3: cc.Node;
	line: cc.Node;
	btn_friend_list: cc.Node;
	label_friend_num: cc.Node;
	label2: cc.Node;
	btn_second_friend_list: cc.Node;
	label_second_friend_num: cc.Node;
	label3: cc.Node;
	bg4: cc.Node;
	label4: cc.Node;
	label5: cc.Node;
	NewNode: cc.Node;
	btn_yqhy: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/invite_info.prefab"

    onLoad () {
		this.invite_info = this.node
		this.ScrollView = this.invite_info.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.btn_close = this.content.getChildByName("btn_close");
		this.icon_close = this.btn_close.getChildByName("icon_close");
		this.lab_st = this.btn_close.getChildByName("lab_st");
		this.btn_my_inviter = this.content.getChildByName("btn_my_inviter");
		this.lab_st2 = this.btn_my_inviter.getChildByName("lab_st2");
		this.layout = this.content.getChildByName("layout");
		this.bg1 = this.layout.getChildByName("bg1");
		this.label1 = this.bg1.getChildByName("label1");
		this.bg2 = this.bg1.getChildByName("bg2");
		this.label_my_invite_code = this.bg2.getChildByName("label_my_invite_code");
		this.btn_copy_my_invite_code = this.bg1.getChildByName("btn_copy_my_invite_code");
		this.btn_label = this.btn_copy_my_invite_code.getChildByName("btn_label");
		this.bg3 = this.layout.getChildByName("bg3");
		this.line = this.bg3.getChildByName("line");
		this.btn_friend_list = this.bg3.getChildByName("btn_friend_list");
		this.label_friend_num = this.btn_friend_list.getChildByName("label_friend_num");
		this.label2 = this.btn_friend_list.getChildByName("label2");
		this.btn_second_friend_list = this.bg3.getChildByName("btn_second_friend_list");
		this.label_second_friend_num = this.btn_second_friend_list.getChildByName("label_second_friend_num");
		this.label3 = this.btn_second_friend_list.getChildByName("label3");
		this.bg4 = this.layout.getChildByName("bg4");
		this.label4 = this.bg4.getChildByName("label4");
		this.label5 = this.bg4.getChildByName("label5");
		this.NewNode = this.layout.getChildByName("NewNode");
		this.btn_yqhy = this.NewNode.getChildByName("btn_yqhy");

    }
}
