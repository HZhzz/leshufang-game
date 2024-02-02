const {ccclass} = cc._decorator;

@ccclass
export default class auto_friend_detailed_item extends cc.Component {
	friend_detailed_item: cc.Node;
	bg: cc.Node;
	invite_time: cc.Node;
	icon_d: cc.Node;
	invite_doudou: cc.Node;
	icon_sp: cc.Node;
	invite_fragment: cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/friend_detailed_item.prefab"

    onLoad () {
		this.friend_detailed_item = this.node
		this.bg = this.friend_detailed_item.getChildByName("bg");
		this.invite_time = this.friend_detailed_item.getChildByName("invite_time");
		this.icon_d = this.friend_detailed_item.getChildByName("icon_d");
		this.invite_doudou = this.friend_detailed_item.getChildByName("invite_doudou");
		this.icon_sp = this.friend_detailed_item.getChildByName("icon_sp");
		this.invite_fragment = this.friend_detailed_item.getChildByName("invite_fragment");

    }
}
