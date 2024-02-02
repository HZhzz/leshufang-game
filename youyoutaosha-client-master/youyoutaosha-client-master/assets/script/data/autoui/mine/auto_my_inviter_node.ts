const {ccclass} = cc._decorator;

@ccclass
export default class auto_my_inviter_node extends cc.Component {
	my_inviter_node: cc.Node;
	mask_close_my_inviter: cc.Node;
	bg7: cc.Node;
	btn_close_my_inviter: cc.Node;
	label_title: cc.Node;
	mask_head: cc.Node;
	bg8: cc.Node;
	mask_head2: cc.Node;
	head_img: cc.Node;
	inviter_name: cc.Node;
	node_friend_list: cc.Node;
	label_inviter_friend_num: cc.Node;
	label11: cc.Node;
	node_second_friend_list: cc.Node;
	label_inviter_second_friend_num: cc.Node;
	label12: cc.Node;
	bg10: cc.Node;
	icon_wx: cc.Node;
	label_inviter_wx: cc.Node;
	btn_copy_wx: cc.Node;
	bg11: cc.Node;
	icon_qq: cc.Node;
	label_inviter_qq: cc.Node;
	btn_copy_qq: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/my_inviter_node.prefab"

    onLoad () {
		this.my_inviter_node = this.node
		this.mask_close_my_inviter = this.my_inviter_node.getChildByName("mask_close_my_inviter");
		this.bg7 = this.my_inviter_node.getChildByName("bg7");
		this.btn_close_my_inviter = this.my_inviter_node.getChildByName("btn_close_my_inviter");
		this.label_title = this.my_inviter_node.getChildByName("label_title");
		this.mask_head = this.my_inviter_node.getChildByName("mask_head");
		this.bg8 = this.mask_head.getChildByName("bg8");
		this.mask_head2 = this.mask_head.getChildByName("mask_head2");
		this.head_img = this.mask_head2.getChildByName("head_img");
		this.inviter_name = this.my_inviter_node.getChildByName("inviter_name");
		this.node_friend_list = this.my_inviter_node.getChildByName("node_friend_list");
		this.label_inviter_friend_num = this.node_friend_list.getChildByName("label_inviter_friend_num");
		this.label11 = this.node_friend_list.getChildByName("label11");
		this.node_second_friend_list = this.my_inviter_node.getChildByName("node_second_friend_list");
		this.label_inviter_second_friend_num = this.node_second_friend_list.getChildByName("label_inviter_second_friend_num");
		this.label12 = this.node_second_friend_list.getChildByName("label12");
		this.bg10 = this.my_inviter_node.getChildByName("bg10");
		this.icon_wx = this.bg10.getChildByName("icon_wx");
		this.label_inviter_wx = this.bg10.getChildByName("label_inviter_wx");
		this.btn_copy_wx = this.bg10.getChildByName("btn_copy_wx");
		this.bg11 = this.my_inviter_node.getChildByName("bg11");
		this.icon_qq = this.bg11.getChildByName("icon_qq");
		this.label_inviter_qq = this.bg11.getChildByName("label_inviter_qq");
		this.btn_copy_qq = this.bg11.getChildByName("btn_copy_qq");

    }
}
